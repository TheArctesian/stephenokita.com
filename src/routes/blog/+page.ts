import type { Post } from '$lib/types'

export async function load({ fetch }) {
///	console.log("Were getting things")
	const response = await fetch('api/posts')
	const posts: Post[] = await response.json()
    console.log(posts)
	return { posts }
}
