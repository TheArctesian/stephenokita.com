import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { incrementViewCount, getViewCount, getAllViewCounts } from '$lib/services/blogAnalytics';

export const GET: RequestHandler = async ({ url }) => {
  const slug = url.searchParams.get('slug');
  
  try {
    if (slug) {
      // Decode the slug in case it's URL encoded
      const decodedSlug = decodeURIComponent(slug);
      // Get view count for a specific post
      const viewCount = await getViewCount(decodedSlug);
      return json({ slug: decodedSlug, viewCount });
    } else {
      // Get all view counts
      const viewCounts = await getAllViewCounts();
      return json(viewCounts);
    }
  } catch (error) {
    console.error('Error fetching view counts:', error);
    // Return 0 view count instead of error to prevent blocking blog loading
    if (slug) {
      const decodedSlug = decodeURIComponent(slug);
      return json({ slug: decodedSlug, viewCount: 0 });
    }
    return json({});
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return json({ error: 'Slug is required' }, { status: 400 });
    }
    
    // Decode the slug in case it's URL encoded
    const decodedSlug = decodeURIComponent(slug);
    const viewCount = await incrementViewCount(decodedSlug);
    
    return json({ slug: decodedSlug, viewCount });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // Return graceful fallback instead of error
    return json({ error: 'Failed to increment view count' }, { status: 500 });
  }
};