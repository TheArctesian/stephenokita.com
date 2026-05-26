import type { PageServerLoad } from './$types';
import worksData from './works.json';

interface RawItem {
  url: string;
  title?: string;
}

interface RawCategory {
  label: string;
  service: string;
  items: RawItem[];
}

export interface ResolvedItem {
  url: string;
  title: string;
  cover: string | null;
}

export interface ResolvedCategory {
  label: string;
  service: string;
  items: ResolvedItem[];
}

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
// IMDB and similar SPAs only emit OG metadata for known crawlers
const CRAWLER_UA = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

function userAgentFor(url: string): string {
  if (/imdb\.com/.test(url)) return CRAWLER_UA;
  return BROWSER_UA;
}

function pickMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) return decodeHtmlEntities(m[1].trim());
  }
  return null;
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function cleanTitle(raw: string | null): string | null {
  if (!raw) return null;
  return raw
    .replace(/\s*[-–|]\s*(Goodreads|Letterboxd|IMDb|Spotify).*$/i, '')
    .replace(/\s*\((?:TV (?:Series|Mini Series|Movie)|Video|Short)[^)]*\).*$/i, '')
    .replace(/\s*\(\d{4}\).*$/, '')
    .replace(/^Watch\s+/i, '')
    .trim();
}

async function fetchSpotifyOembed(
  url: string,
  fetchFn: typeof fetch,
): Promise<{ title: string | null; cover: string | null }> {
  try {
    const res = await fetchFn(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return { title: null, cover: null };
    const data = (await res.json()) as { title?: string; thumbnail_url?: string };
    return { title: data.title ?? null, cover: data.thumbnail_url ?? null };
  } catch {
    return { title: null, cover: null };
  }
}

async function fetchOg(url: string, fetchFn: typeof fetch): Promise<{ title: string | null; cover: string | null }> {
  if (/open\.spotify\.com/.test(url)) {
    return fetchSpotifyOembed(url, fetchFn);
  }
  try {
    const res = await fetchFn(url, {
      headers: {
        'User-Agent': userAgentFor(url),
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return { title: null, cover: null };
    const html = await res.text();
    const cover =
      pickMeta(html, 'og:image:secure_url') ||
      pickMeta(html, 'og:image') ||
      pickMeta(html, 'twitter:image');
    const title =
      cleanTitle(pickMeta(html, 'og:title')) ||
      cleanTitle(pickMeta(html, 'twitter:title'));
    return { title, cover };
  } catch {
    return { title: null, cover: null };
  }
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  const data = worksData as { categories: RawCategory[] };

  const resolved: ResolvedCategory[] = await Promise.all(
    data.categories.map(async (cat) => {
      const items = await Promise.all(
        cat.items.map(async (item): Promise<ResolvedItem> => {
          const og = await fetchOg(item.url, fetch);
          return {
            url: item.url,
            title: item.title || og.title || item.url,
            cover: og.cover,
          };
        }),
      );
      return { label: cat.label, service: cat.service, items };
    }),
  );

  setHeaders({
    'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
  });

  return { works: resolved };
};
