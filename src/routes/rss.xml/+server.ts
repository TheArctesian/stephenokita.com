import type { RequestHandler } from './$types'
import type { Post } from '$lib/types'
import { listPostMeta } from '$lib/posts'
import { generateRSSFeed } from '$lib/utils/rss'
import { SITE_CONFIG } from '$lib/constants'

// The feed is built entirely from markdown frontmatter, so it can be baked at
// build time. It previously fetched /api/posts, which pulled view and comment
// counts from Neon that the feed never used — and which would have forced a
// database connection during the build.
export const prerender = true

export const GET: RequestHandler = async () => {
	const posts: Post[] = listPostMeta().map(({ slug, meta }) => ({ ...meta, slug }))

	const rssXml = generateRSSFeed(posts, {
		title: "Stephen Daniel Okita's Blog",
		description: 'Thoughts on philosophy, technology, and life from Stephen Daniel Okita',
		link: SITE_CONFIG.url,
		webMaster: `${SITE_CONFIG.email} (${SITE_CONFIG.name})`
	})

	return new Response(rssXml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	})
}
