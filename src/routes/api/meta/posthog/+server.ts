import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { jsonRoute } from '$lib/utils/api';
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
export const GET: RequestHandler = jsonRoute(
  async ({ url }) => {
    if (!isConfigured()) {
      return json({ configured: false, stats: null, recentEvents: [] });
    }

    const distinctId = url.searchParams.get('distinct_id');
    if (!distinctId || !isValidDistinctId(distinctId)) {
      return json({ error: 'A valid distinct_id is required' }, { status: 400 });
    }

    const [stats, recentEvents] = await Promise.all([
      getPersonStats(distinctId),
      getRecentEvents(distinctId),
    ]);
    return { configured: true, stats, recentEvents };
  },
  {
    label: 'Error querying PostHog:',
    onError: () => json({ configured: true, stats: null, recentEvents: [] }),
  }
);
