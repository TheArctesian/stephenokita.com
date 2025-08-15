import { error } from '@sveltejs/kit'
import { calculateReadingTime } from '$lib/utils'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		// Decode the URL-encoded slug to handle spaces and special characters
		const decodedSlug = decodeURIComponent(params.slug)
		
		const post = await import(`../posts/${decodedSlug}.md`)
		
		// Calculate reading time
		const rendered = post.default.render()
		const readingTime = rendered && rendered.html ? calculateReadingTime(rendered.html) : undefined
		
		// Fetch current view count (non-blocking)
		const viewCountPromise = fetch(`/api/blog-analytics?slug=${encodeURIComponent(decodedSlug)}`)
			.then(res => res.json())
			.then(data => data.viewCount || 0)
			.catch(() => 0)

		return {
			content: post.default,
			meta: { 
				...post.metadata, 
				slug: decodedSlug,
				readingTime
			},
			viewCount: viewCountPromise
		}
	} catch (e) {
		throw error(404, `Could not find ${decodeURIComponent(params.slug)}`)
	}
}
