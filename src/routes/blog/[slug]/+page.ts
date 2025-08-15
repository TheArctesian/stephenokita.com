import { error } from '@sveltejs/kit'
import { calculateReadingTime } from '$lib/utils'
import { loadPost } from '$lib/utils/postLoader'
import { encodeSlugForUrl } from '$lib/utils/slugResolver'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	// Step 1: Use our focused post loader
	const result = await loadPost(params.slug);
	
	// Step 2: Handle failure with clear error
	if (!result.success) {
		console.error('Blog post loading failed:', result);
		throw error(404, `Could not find ${result.slug || params.slug}`);
	}
	
	// Step 3: Calculate reading time (single responsibility)
	let readingTime: number | undefined;
	try {
		const rendered = result.post.render();
		readingTime = rendered?.html ? calculateReadingTime(rendered.html) : undefined;
	} catch (e) {
		console.warn('Could not calculate reading time:', e);
		readingTime = undefined;
	}
	
	// Step 4: Fetch view count (non-blocking, isolated)
	const viewCountPromise = fetch(`/api/blog-analytics?slug=${encodeSlugForUrl(result.slug!)}`)
		.then(res => res.json())
		.then(data => data.viewCount || 0)
		.catch((e) => {
			console.warn('Analytics fetch failed:', e);
			return 0;
		});

	// Step 5: Return clean result
	return {
		content: result.post,
		meta: { 
			...result.metadata, 
			slug: result.slug,
			readingTime
		},
		viewCount: viewCountPromise
	};
}
