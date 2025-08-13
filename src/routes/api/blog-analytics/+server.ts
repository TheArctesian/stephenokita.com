import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { incrementViewCount, getViewCount, getAllViewCounts } from '$lib/services/blogAnalytics';

export const GET: RequestHandler = async ({ url }) => {
  const slug = url.searchParams.get('slug');
  
  try {
    if (slug) {
      // Get view count for a specific post
      const viewCount = await getViewCount(slug);
      return json({ slug, viewCount });
    } else {
      // Get all view counts
      const viewCounts = await getAllViewCounts();
      return json(viewCounts);
    }
  } catch (error) {
    console.error('Error fetching view counts:', error);
    return json({ error: 'Failed to fetch view counts' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return json({ error: 'Slug is required' }, { status: 400 });
    }
    
    const viewCount = await incrementViewCount(slug);
    
    return json({ slug, viewCount });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return json({ error: 'Failed to increment view count' }, { status: 500 });
  }
};