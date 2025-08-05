import { json } from '@sveltejs/kit';
import { PersonalService } from '$lib/services/personal';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const favorites = url.searchParams.get('favorites');
    
    if (favorites === 'true') {
      const quotes = await PersonalService.getFavoriteQuotes();
      return json(quotes);
    }
    
    const quotes = await PersonalService.getAllQuotes();
    return json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const quote = await PersonalService.createQuote(data);
    return json(quote, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return json({ error: 'Failed to create quote' }, { status: 500 });
  }
};