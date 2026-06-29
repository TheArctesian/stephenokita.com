import { json } from '@sveltejs/kit';
import { PersonalService } from '$lib/services/personal';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  ({ url }) => {
    const favorites = url.searchParams.get('favorites');
    return favorites === 'true'
      ? PersonalService.getFavoriteQuotes()
      : PersonalService.getAllQuotes();
  },
  { label: 'Error fetching quotes:', errorMessage: 'Failed to fetch quotes' }
);

export const POST: RequestHandler = jsonRoute(
  async ({ request }) => json(await PersonalService.createQuote(await request.json()), { status: 201 }),
  { label: 'Error creating quote:', errorMessage: 'Failed to create quote' }
);
