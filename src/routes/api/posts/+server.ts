import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'
import { calculateReadingTime } from '$lib/utils'
import {
	getAllViewCounts,
	getAllReadingTimes,
	setReadingTimes
} from '$lib/services/blogAnalytics'
import { CommentsService } from '$lib/services/comments'

// Compiled post modules (metadata is a plain export; reading `.metadata` does
// NOT render the post). Raw loaders are lazy so we only read a post's source
// when its reading time is missing and needs to be computed once.
const postModules = import.meta.glob('/src/routes/blog/posts/*.md', { eager: true })
const rawLoaders = import.meta.glob('/src/routes/blog/posts/*.md', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>

// Static post metadata never changes within a deploy — compute the list once
// per serverless instance instead of re-globbing on every request.
type StaticPost = { metadata: Omit<Post, 'slug'>; slug: string; path: string }
let staticPostsCache: StaticPost[] | null = null
// Reading times computed from source, cached so a post's raw text is only ever
// read once per instance even before the DB column is backfilled.
const computedReadingTimes = new Map<string, number>()

function getStaticPosts(): StaticPost[] {
	if (staticPostsCache) return staticPostsCache

	const list: StaticPost[] = []
	for (const path in postModules) {
		const file = postModules[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			list.push({ metadata: file.metadata as Omit<Post, 'slug'>, slug, path })
		}
	}
	staticPostsCache = list
	return list
}

// Strip YAML frontmatter so it doesn't inflate the word count.
function stripFrontmatter(raw: string): string {
	return raw.replace(/^---[\s\S]*?\n---\s*/, '')
}

async function readingTimeFor(
	slug: string,
	path: string,
	dbTimes: Record<string, number>
): Promise<number> {
	if (dbTimes[slug] != null) return dbTimes[slug]
	if (computedReadingTimes.has(slug)) return computedReadingTimes.get(slug) as number

	// Read raw markdown (cheap) instead of rendering the post to HTML.
	const raw = await rawLoaders[path]()
	const readingTime = calculateReadingTime(stripFrontmatter(raw))
	computedReadingTimes.set(slug, readingTime)
	return readingTime
}

async function getPosts() {
	const staticPosts = getStaticPosts()

	const [viewCounts, commentCounts, readingTimes] = await Promise.all([
		getAllViewCounts(),
		CommentsService.getAllCommentCounts(),
		getAllReadingTimes()
	])

	const backfill: { slug: string; readingTime: number }[] = []

	const built = await Promise.all(
		staticPosts.map(async ({ metadata, slug, path }) => {
			const readingTime = await readingTimeFor(slug, path, readingTimes)
			if (readingTimes[slug] == null) backfill.push({ slug, readingTime })

			return {
				...metadata,
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

	const posts = built
		.filter((post) => post.published)
		.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
