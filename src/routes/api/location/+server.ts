import { json } from '@sveltejs/kit';
import { jsonRoute } from '$lib/utils/api';
import { LocationService } from '$lib/services/location';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  () => LocationService.getCurrentLocation(),
  { label: 'Location API error:', onError: () => json(null) }
);
