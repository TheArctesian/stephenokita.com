import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  isConfigured,
  isValidDistinctId,
  getPersonStats,
  getRecentEvents,
} from '$lib/services/posthog';

/**
 * GET /api/meta/posthog?distinct_id=<id>
 * Returns what PostHog has recorded for this visitor's own distinct_id.
 * When the personal API key isn't set, returns { configured: false } so the
 * page can render an honest "unconfigured" state rather than failing.
 */
export const GET: RequestHandler = async ({ url }) => {
  if (!isConfigured()) {
    return json({ configured: false, stats: null, recentEvents: [] });
  }

  const distinctId = url.searchParams.get('distinct_id');
  if (!distinctId || !isValidDistinctId(distinctId)) {
    return json({ error: 'A valid distinct_id is required' }, { status: 400 });
  }

  try {
    const [stats, recentEvents] = await Promise.all([
      getPersonStats(distinctId),
      getRecentEvents(distinctId),
    ]);
    return json({ configured: true, stats, recentEvents });
  } catch (error) {
    console.error('Error querying PostHog:', error);
    return json({ configured: true, stats: null, recentEvents: [] });
  }
};
