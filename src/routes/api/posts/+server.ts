import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'
import { calculateReadingTime } from '$lib/utils'
import { getAllViewCounts } from '$lib/services/blogAnalytics'
import { CommentsService } from '$lib/services/comments'

async function getPosts() {
	let posts: Post[] = []

	const paths = import.meta.glob('/src/routes/blog/posts/*.md', { eager: true })
	
	// Get all view counts and comment counts in parallel
	const [viewCounts, commentCounts] = await Promise.all([
		getAllViewCounts(),
		CommentsService.getAllCommentCounts()
	])

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			
			// Calculate reading time if content is available
			let readingTime = undefined
			if ('default' in file && typeof file.default === 'object' && 'render' in file.default) {
				const rendered = file.default.render()
				if (rendered && rendered.html) {
					readingTime = calculateReadingTime(rendered.html)
				}
			}
			
			const post = { 
				...metadata, 
				slug,
				readingTime,
				viewCount: viewCounts[slug] || 0,
				commentCount: commentCounts[slug] || 0
			} satisfies Post
			
			post.published && posts.push(post)
		}
	}

	posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
