import { json } from '@sveltejs/kit';
import { jsonRoute } from '$lib/utils/api';
import { CalendarService } from '$lib/services/calendar';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  () => CalendarService.getUpcomingEvents(),
  { label: 'Calendar API error:', onError: () => json([]) }
);
