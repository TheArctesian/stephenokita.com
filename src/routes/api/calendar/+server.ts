import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CalendarService } from '$lib/services/calendar';

export const GET: RequestHandler = async () => {
  try {
    const events = await CalendarService.getUpcomingEvents();
    return json(events);
  } catch (error) {
    console.error('Calendar API error:', error);
    return json([]);
  }
};
