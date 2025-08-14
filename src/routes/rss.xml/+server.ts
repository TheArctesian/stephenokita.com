import type { RequestHandler } from './$types'
import type { Post } from '$lib/types'
import { generateRSSFeed } from '$lib/utils/rss'

export const GET: RequestHandler = async ({ url, fetch }) => {
	try {
		// Fetch posts from the API endpoint
		const response = await fetch('/api/posts')
		
		if (!response.ok) {
			console.error('Failed to fetch posts for RSS feed:', response.status)
			const emptyFeed = generateRSSFeed([])
			return new Response(emptyFeed, {
				headers: {
					'Content-Type': 'application/rss+xml',
					'Cache-Control': 'no-cache'
				}
			})
		}
		
		const posts: Post[] = await response.json()
		
		// Generate RSS feed with proper XML escaping
		const rssXml = generateRSSFeed(posts, {
			title: "Stephen Daniel Okita's Blog",
			description: "Thoughts on philosophy, technology, and life from Stephen Daniel Okita",
			link: url.origin,
			webMaster: 'stephen@okita.com (Stephen Okita)'
		})
		
		return new Response(rssXml, {
			headers: {
				'Content-Type': 'application/rss+xml',
				'Cache-Control': 'max-age=0, s-maxage=3600'
			}
		})
	} catch (error) {
		console.error('Error generating RSS feed:', error)
		
		// Return empty feed on error
		const emptyFeed = generateRSSFeed([], {
			title: "Stephen Daniel Okita's Blog",
			description: "Thoughts on philosophy, technology, and life from Stephen Daniel Okita",
			link: url.origin
		})
		
		return new Response(emptyFeed, {
			headers: {
				'Content-Type': 'application/rss+xml',
				'Cache-Control': 'no-cache'
			}
		})
	}
}
