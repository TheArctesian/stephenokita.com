import type { Post } from '$lib/types'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	// Absolute path: a relative one resolves against the current route, which
	// breaks the moment the page is served under a locale prefix
	// (/zh-Hant/blog would fetch /zh-Hant/api/posts).
	const response = await fetch('/api/posts')
	const posts: Post[] = await response.json()
	return { posts }
}
