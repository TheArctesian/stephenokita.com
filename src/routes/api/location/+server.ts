import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { LocationService } from '$lib/services/location';

export const GET: RequestHandler = async () => {
  try {
    const location = await LocationService.getCurrentLocation();
    return json(location);
  } catch (error) {
    console.error('Location API error:', error);
    return json(null);
  }
};
