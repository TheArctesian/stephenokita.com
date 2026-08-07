/**
 * Unix Philosophy: Do one thing well — enumerate the blog corpus.
 *
 * This module is deliberately free of any database dependency so that
 * build-time consumers (sitemap.xml, llms.txt, llms-full.txt, rss.xml) can
 * prerender without a DATABASE_URL. `/api/posts` layers its Neon-backed
 * enrichment (view counts, comment counts, reading times) on top of this.
 */

import type { Post } from '$lib/types'

/** A post's frontmatter — everything in the file except the derived fields. */
export type PostFrontmatter = Omit<
	Post,
	'slug' | 'readingTime' | 'viewCount' | 'commentCount'
>

export interface PostEntry {
	slug: string
	/** Absolute module path, used to pair an entry with its raw loader. */
	path: string
	meta: PostFrontmatter
}

// Compiled post modules. Reading `.metadata` is a plain property access — it
// does NOT render the post — so this stays cheap despite being eager.
const postModules = import.meta.glob('/src/posts/*.md', { eager: true })

// Raw source loaders are lazy: the markdown body is only ever pulled in by the
// consumers that actually need it (llms-full.txt, reading-time computation).
const rawLoaders = import.meta.glob('/src/posts/*.md', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>

let entriesCache: PostEntry[] | null = null

function slugFromPath(path: string): string | undefined {
	return path.split('/').at(-1)?.replace(/\.md$/, '')
}

/**
 * Every post in the corpus, published or not, in filesystem order.
 * Prefer `listPostMeta()` unless you specifically need drafts.
 */
export function listAllPosts(): PostEntry[] {
	if (entriesCache) return entriesCache

	const entries: PostEntry[] = []
	for (const path in postModules) {
		const file = postModules[path]
		const slug = slugFromPath(path)
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			entries.push({ slug, path, meta: file.metadata as PostFrontmatter })
		}
	}

	entriesCache = entries
	return entries
}

/** Published posts only, newest first. The canonical ordering for the site. */
export function listPostMeta(): PostEntry[] {
	return listAllPosts()
		.filter((entry) => entry.meta.published)
		.sort(
			(first, second) =>
				new Date(second.meta.date).getTime() - new Date(first.meta.date).getTime()
		)
}

/** The lazy raw-source loader for a given post path, if one exists. */
export function rawLoaderFor(path: string): (() => Promise<string>) | undefined {
	return rawLoaders[path]
}

/** Strip YAML frontmatter so it doesn't leak into word counts or LLM output. */
export function stripFrontmatter(raw: string): string {
	return raw.replace(/^---[\s\S]*?\n---\s*/, '')
}

/** Published posts with their markdown bodies, newest first. */
export async function listPostRaw(): Promise<Array<PostEntry & { body: string }>> {
	return Promise.all(
		listPostMeta().map(async (entry) => {
			const load = rawLoaderFor(entry.path)
			const raw = load ? await load() : ''
			return { ...entry, body: stripFrontmatter(raw).trim() }
		})
	)
}

/**
 * The date a post was last meaningfully changed. `updated` is optional
 * frontmatter; posts without it fall back to their publication date.
 */
export function lastModified(meta: PostFrontmatter): string {
	return meta.updated ?? meta.date
}
