import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Link Preview API — Wikipedia-style hover cards.
 *
 * Single responsibility: given a URL, fetch the target page server-side and
 * extract its Open Graph / meta information (title, description, image, site
 * name, favicon). Returns a small JSON payload the client renders into a
 * floating preview card. Done server-side to sidestep CORS and so the browser
 * never has to load the remote page directly.
 */

interface LinkPreview {
  url: string;
  title: string;
  description: string;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
}

// Pretend to be a real browser — many sites gate meta tags behind a UA check.
const USER_AGENT =
  'Mozilla/5.0 (compatible; StephenOkitaBot/1.0; +https://stephenokita.com)';

const FETCH_TIMEOUT_MS = 6000;
const MAX_BYTES = 512 * 1024; // only need the <head>; cap the download

/** Decode the handful of HTML entities that show up in meta content. */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

/** Pull `content` from a <meta> tag matching property/name === key. */
function readMeta(html: string, keys: string[]): string | null {
  for (const key of keys) {
    // Handle both `property="og:x" content="y"` and the reversed attribute order.
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)\\s*=\\s*["']${key}["'][^>]*?content\\s*=\\s*["']([^"']*)["']`,
        'i'
      ),
      new RegExp(
        `<meta[^>]+content\\s*=\\s*["']([^"']*)["'][^>]*?(?:property|name)\\s*=\\s*["']${key}["']`,
        'i'
      )
    ];
    for (const re of patterns) {
      const match = html.match(re);
      if (match?.[1]) return decodeEntities(match[1]);
    }
  }
  return null;
}

function readTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? decodeEntities(match[1]) : null;
}

/** Resolve a possibly-relative URL (favicon/image) against the page origin. */
function absolutize(value: string | null, base: URL): string | null {
  if (!value) return null;
  try {
    return new URL(value, base).href;
  } catch {
    return null;
  }
}

/** Block obviously-internal targets to avoid SSRF into the local network. */
function isPublicHttpUrl(target: URL): boolean {
  if (target.protocol !== 'http:' && target.protocol !== 'https:') return false;
  const host = target.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host.endsWith('.local')
  ) {
    return false;
  }
  // Private IPv4 ranges.
  if (
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  ) {
    return false;
  }
  return true;
}

async function fetchHtml(target: URL): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(target.href, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml'
      },
      redirect: 'follow',
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`Upstream responded ${res.status}`);
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html') && !contentType.includes('xml')) {
      throw new Error('Not an HTML document');
    }

    // Stream and cap the body — we only care about <head>.
    const reader = res.body?.getReader();
    if (!reader) return await res.text();

    const decoder = new TextDecoder();
    let html = '';
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.length;
      html += decoder.decode(value, { stream: true });
      // Stop once the head closes or we hit the byte cap.
      if (received >= MAX_BYTES || /<\/head>/i.test(html)) {
        await reader.cancel();
        break;
      }
    }
    return html;
  } finally {
    clearTimeout(timeout);
  }
}

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  const raw = url.searchParams.get('url');
  if (!raw) {
    return json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return json({ error: 'Invalid url' }, { status: 400 });
  }

  // Allow the site to preview its own pages (incl. localhost in dev), but block
  // arbitrary internal/private hosts to avoid SSRF.
  const isSelf = target.origin === url.origin;
  if (!isSelf && !isPublicHttpUrl(target)) {
    return json({ error: 'Unsupported or blocked url' }, { status: 400 });
  }

  try {
    const html = await fetchHtml(target);

    const title =
      readMeta(html, ['og:title', 'twitter:title']) ??
      readTitleTag(html) ??
      target.hostname;

    const description =
      readMeta(html, [
        'og:description',
        'twitter:description',
        'description'
      ]) ?? '';

    const image = absolutize(
      readMeta(html, ['og:image', 'twitter:image', 'twitter:image:src']),
      target
    );

    const siteName =
      readMeta(html, ['og:site_name']) ?? target.hostname.replace(/^www\./, '');

    const favicon =
      absolutize(readMeta(html, ['og:logo']), target) ??
      `https://www.google.com/s2/favicons?domain=${target.hostname}&sz=64`;

    const preview: LinkPreview = {
      url: target.href,
      title,
      description,
      image,
      siteName,
      favicon
    };

    // Cache aggressively — link metadata rarely changes.
    setHeaders({
      'Cache-Control': 'public, max-age=86400, s-maxage=604800'
    });

    return json(preview);
  } catch (error) {
    console.error('Link preview failed for', target.href, error);
    // Soft-fail with a minimal payload so the client can still show something.
    return json(
      {
        url: target.href,
        title: target.hostname.replace(/^www\./, ''),
        description: '',
        image: null,
        siteName: target.hostname.replace(/^www\./, ''),
        favicon: `https://www.google.com/s2/favicons?domain=${target.hostname}&sz=64`,
        error: 'Preview unavailable'
      },
      { status: 200 }
    );
  }
};
