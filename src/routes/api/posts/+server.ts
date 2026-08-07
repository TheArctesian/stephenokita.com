import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'
import { calculateReadingTime } from '$lib/utils'
import {
	getAllViewCounts,
	getAllReadingTimes,
	setReadingTimes
} from '$lib/services/blogAnalytics'
import { CommentsService } from '$lib/services/comments'
import { listPostMeta, rawLoaderFor, stripFrontmatter } from '$lib/posts'

// Post enumeration lives in $lib/posts so that build-time consumers (sitemap,
// llms.txt, RSS) can share it without dragging in this module's DB calls.
// Reading times computed from source are cached so a post's raw text is only
// ever read once per instance, even before the DB column is backfilled.
const computedReadingTimes = new Map<string, number>()

async function readingTimeFor(
	slug: string,
	path: string,
	dbTimes: Record<string, number>
): Promise<number> {
	if (dbTimes[slug] != null) return dbTimes[slug]
	if (computedReadingTimes.has(slug)) return computedReadingTimes.get(slug) as number

	// Read raw markdown (cheap) instead of rendering the post to HTML.
	const load = rawLoaderFor(path)
	const raw = load ? await load() : ''
	const readingTime = calculateReadingTime(stripFrontmatter(raw))
	computedReadingTimes.set(slug, readingTime)
	return readingTime
}

async function getPosts() {
	// Already published-only and newest-first.
	const staticPosts = listPostMeta()

	const [viewCounts, commentCounts, readingTimes] = await Promise.all([
		getAllViewCounts(),
		CommentsService.getAllCommentCounts(),
		getAllReadingTimes()
	])

	const backfill: { slug: string; readingTime: number }[] = []

	const posts = await Promise.all(
		staticPosts.map(async ({ meta, slug, path }) => {
			const readingTime = await readingTimeFor(slug, path, readingTimes)
			if (readingTimes[slug] == null) backfill.push({ slug, readingTime })

			return {
				...meta,
				slug,
				readingTime,
				viewCount: viewCounts[slug] || 0,
				commentCount: commentCounts[slug] || 0
			} satisfies Post
		})
	)

	// Persist any freshly-computed reading times so later requests skip the
	// raw read entirely. Awaited once on first run; a no-op afterwards.
	await setReadingTimes(backfill)

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
