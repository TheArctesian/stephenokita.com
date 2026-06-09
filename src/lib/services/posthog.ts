/**
 * Server-side PostHog reader for the /meta page. Queries PostHog's HogQL Query
 * API (read-only) to pull a visitor's own recorded data back at them — "here's
 * what PostHog already has on you". Capture stays client-side; this only reads.
 *
 * Needs a *personal* API key (the `phc_` ingestion key in app.html cannot
 * query). All config is optional: with nothing set, `isConfigured()` is false
 * and callers render an "unconfigured" state instead of erroring.
 */
import { env } from '$env/dynamic/private';

const API_HOST = env.POSTHOG_API_HOST || 'https://us.posthog.com';
// Accept either name; `phx_…` personal key (not the `phc_…` ingestion token).
const PERSONAL_KEY = env.POSTHOG_PERSONAL_API_KEY || env.POSTHOG_API_KEY;
// Project id: an explicit env value wins; otherwise `@current`, which PostHog
// resolves from the personal key itself (no extra scope needed, unlike listing
// projects, which a query-only key can't do).
const PROJECT_ID = env.POSTHOG_PROJECT_ID || '@current';

// PostHog distinct_ids are typically UUIDs/emails; allow a conservative charset
// and cap length. We also bind via HogQL placeholders, so this is hygiene.
const DISTINCT_ID_RE = /^[A-Za-z0-9_\-:.@+]{1,200}$/;

export interface PersonStats {
  totalEvents: number;
  sessionCount: number;
  firstSeen: string | null;
  lastSeen: string | null;
}

export interface RecentEvent {
  event: string;
  timestamp: string;
  url: string | null;
}

export function isConfigured(): boolean {
  return Boolean(PERSONAL_KEY);
}

export function isValidDistinctId(id: string): boolean {
  return DISTINCT_ID_RE.test(id);
}

/** Run one HogQL query, returning the raw `results` rows (array of arrays). */
async function hogql(query: string, values: Record<string, unknown> = {}): Promise<unknown[][]> {
  const response = await fetch(`${API_HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PERSONAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query, values } }),
  });
  if (!response.ok) {
    throw new Error(`PostHog query API responded ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.results) ? data.results : [];
}

export async function getPersonStats(distinctId: string): Promise<PersonStats | null> {
  if (!isConfigured() || !isValidDistinctId(distinctId)) return null;
  try {
    const rows = await hogql(
      `SELECT count() AS total,
              count(distinct $session_id) AS sessions,
              min(timestamp) AS first_seen,
              max(timestamp) AS last_seen
       FROM events
       WHERE distinct_id = {distinct_id}`,
      { distinct_id: distinctId },
    );
    const [total, sessions, firstSeen, lastSeen] = rows[0] ?? [];
    const totalEvents = Number(total) || 0;
    // With no events, min/max(timestamp) collapse to the epoch — treat as null.
    const realDate = (v: unknown) => {
      const s = v ? String(v) : '';
      return totalEvents > 0 && !s.startsWith('1970') ? s : null;
    };
    return {
      totalEvents,
      sessionCount: Number(sessions) || 0,
      firstSeen: realDate(firstSeen),
      lastSeen: realDate(lastSeen),
    };
  } catch (error) {
    console.error('PostHog getPersonStats error:', error);
    return null;
  }
}

export async function getRecentEvents(distinctId: string, limit = 15): Promise<RecentEvent[]> {
  if (!isConfigured() || !isValidDistinctId(distinctId)) return [];
  const safeLimit = Math.min(Math.max(Math.trunc(limit) || 15, 1), 50);
  try {
    const rows = await hogql(
      `SELECT event, timestamp, properties.$current_url AS url
       FROM events
       WHERE distinct_id = {distinct_id}
       ORDER BY timestamp DESC
       LIMIT ${safeLimit}`,
      { distinct_id: distinctId },
    );
    return rows.map((row) => ({
      event: String(row[0] ?? ''),
      timestamp: String(row[1] ?? ''),
      url: row[2] ? String(row[2]) : null,
    }));
  } catch (error) {
    console.error('PostHog getRecentEvents error:', error);
    return [];
  }
}
