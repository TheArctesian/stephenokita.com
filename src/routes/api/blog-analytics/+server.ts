import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { jsonRoute } from '$lib/utils/api';
import { incrementViewCount, getViewCount, getAllViewCounts } from '$lib/services/blogAnalytics';

export const GET: RequestHandler = jsonRoute(
  async ({ url }) => {
    const slug = url.searchParams.get('slug');
    if (slug) {
      // Decode the slug in case it's URL encoded
      const decodedSlug = decodeURIComponent(slug);
      return json({ slug: decodedSlug, viewCount: await getViewCount(decodedSlug) });
    }
    return getAllViewCounts();
  },
  {
    label: 'Error fetching view counts:',
    // Return 0 view count instead of error to prevent blocking blog loading.
    onError: ({ url }) => {
      const slug = url.searchParams.get('slug');
      if (slug) return json({ slug: decodeURIComponent(slug), viewCount: 0 });
      return json({});
    },
  }
);

export const POST: RequestHandler = jsonRoute(
  async ({ request }) => {
    const { slug } = await request.json();

    if (!slug) {
      return json({ error: 'Slug is required' }, { status: 400 });
    }

    // Decode the slug in case it's URL encoded
    const decodedSlug = decodeURIComponent(slug);
    return json({ slug: decodedSlug, viewCount: await incrementViewCount(decodedSlug) });
  },
  { label: 'Error incrementing view count:', errorMessage: 'Failed to increment view count' }
);
