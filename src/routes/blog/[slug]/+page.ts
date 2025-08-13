import { error } from '@sveltejs/kit'
import { calculateReadingTime } from '$lib/utils'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const post = await import(`../posts/${params.slug}.md`)
		
		// Calculate reading time
		const rendered = post.default.render()
		const readingTime = rendered && rendered.html ? calculateReadingTime(rendered.html) : undefined
		
		// Fetch current view count (non-blocking)
		const viewCountPromise = fetch(`/api/blog-analytics?slug=${params.slug}`)
			.then(res => res.json())
			.then(data => data.viewCount || 0)
			.catch(() => 0)

		return {
			content: post.default,
			meta: { 
				...post.metadata, 
				slug: params.slug,
				readingTime
			},
			viewCount: viewCountPromise
		}
	} catch (e) {
        console.log("NO POSTS?!?!")
		throw error(404, `Could not find ${params.slug}`)
	}
}
