import type { Post } from '$lib/types'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
///	console.log("Were getting things")
	const response = await fetch('api/posts')
	const posts: Post[] = await response.json()
    console.log(posts)
	return { posts }
}
