import type { PageServerLoad } from './$types';

/**
 * Headers we surface individually because they're the most legible "I see you"
 * signals. Everything else still gets dumped into `allHeaders` for the raw view.
 */
const SPOTLIGHT_HEADERS = [
  'user-agent',
  'accept-language',
  'accept-encoding',
  'accept',
  'sec-ch-ua',
  'sec-ch-ua-platform',
  'sec-ch-ua-mobile',
  'sec-ch-ua-platform-version',
  'dnt',
  'sec-gpc',
  'referer',
  'sec-fetch-site',
  'sec-fetch-mode',
  'sec-fetch-dest',
  'via',
];

// Headers we never want to echo back (auth/cookies, internal infra noise).
const REDACT = new Set([
  'cookie',
  'authorization',
  'x-vercel-id',
  'x-vercel-proxy-signature',
  'x-vercel-proxy-signature-ts',
  'x-vercel-sc-headers',
  'x-vercel-oidc-token',
]);

export const load: PageServerLoad = async ({ request, getClientAddress }) => {
  const h = request.headers;

  const get = (name: string) => h.get(name) ?? null;

  // Vercel injects these at the edge from a GeoIP lookup on the visitor's IP.
  const geo = {
    city: decodeMaybe(get('x-vercel-ip-city')),
    region: get('x-vercel-ip-country-region'),
    country: get('x-vercel-ip-country'),
    latitude: get('x-vercel-ip-latitude'),
    longitude: get('x-vercel-ip-longitude'),
    timezone: get('x-vercel-ip-timezone'),
  };

  let ip: string | null = null;
  try {
    ip = getClientAddress();
  } catch {
    ip = get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  }

  const spotlight = SPOTLIGHT_HEADERS.map((name) => ({
    name,
    value: get(name),
  })).filter((entry) => entry.value !== null);

  const allHeaders: Record<string, string> = {};
  for (const [key, value] of h.entries()) {
    if (REDACT.has(key.toLowerCase())) continue;
    allHeaders[key] = value;
  }

  const hasGeo = Boolean(geo.city || geo.region || geo.country);

  return {
    server: {
      ip,
      geo,
      hasGeo,
      spotlight,
      allHeaders,
      headerCount: Object.keys(allHeaders).length,
      // Stamp the moment of the request so the page can say "as of <time>".
      observedAt: Date.now(),
    },
  };
};

function decodeMaybe(value: string | null): string | null {
  if (!value) return value;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
