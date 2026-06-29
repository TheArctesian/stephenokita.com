import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { jsonRoute } from '$lib/utils/api';
import {
  isConfigured,
  isValidDistinctId,
  getVisitorVector,
  getPopulationVectors,
} from '$lib/services/posthog';
import { rankNeighbours, computeRarity } from '$lib/utils/similarity';

/**
 * GET /api/meta/similarity?distinct_id=<id>
 * "Who are you most like?" — builds the visitor's coarse trait vector from
 * PostHog, compares it against a sample of other visitors (the population), and
 * returns the nearest neighbours plus a rarity estimate. All traits are coarse
 * geo/device-class signals; no PII about other people is returned.
 */
export const GET: RequestHandler = jsonRoute(
  async ({ url }) => {
    if (!isConfigured()) {
      return json({ configured: false, found: false });
    }

    const distinctId = url.searchParams.get('distinct_id');
    if (!distinctId || !isValidDistinctId(distinctId)) {
      return json({ error: 'A valid distinct_id is required' }, { status: 400 });
    }

    const [visitor, population] = await Promise.all([
      getVisitorVector(distinctId),
      getPopulationVectors(distinctId),
    ]);

    if (!visitor) {
      return json({ configured: true, found: false });
    }

    const neighbours = rankNeighbours(visitor, population, 3);
    const rarity = computeRarity(visitor, population);

    return { configured: true, found: true, visitor, neighbours, rarity };
  },
  {
    label: 'Error computing visitor similarity:',
    onError: () => json({ configured: true, found: false }),
  }
);
