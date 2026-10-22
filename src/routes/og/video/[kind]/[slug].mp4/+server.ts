import { error } from '@sveltejs/kit'
import type { EntryGenerator, RequestHandler } from './$types'
import { SITE_CONFIG } from '$lib/constants'
import enGB from '$lib/i18n/locales/en-GB'
import { listPostMeta } from '$lib/posts'
import { renderCardVideo, type VideoOptions } from '$lib/server/og/video'
import { truncate } from '$lib/utils/seo'

/**
 * og:video cards, one mp4 per page, rendered once at build time.
 *
 * Encoding is far too slow for a request, so this route only exists as
 * prerendered files: anything `entries()` does not list is a 404.
 */

export const prerender = true

/** What scrambles on the pages that have no tags of their own. */
const ROLES = [
	'CTO & Co-founder, Auracare Health',
	'Co-founder, TF Humanity',
	'Co-founder, SoCo',
	'Philosophy, UC Berkeley'
]

/** Chrome pages with a share card. /meta is noindex, so it has none. */
const PAGES: Record<string, string> = {
	home: 'Stephen Daniel Okita',
	blog: enGB['blog.pageTitle'],
	projects: enGB['projects.pageTitle'],
	skills: enGB['skills.pageTitle'],
	person: enGB['person.pageTitle']
}

const MAX_PHRASES = 4
const MAX_PHRASE_LENGTH = 34
// Three lines at most, so the title never reaches the phrase line.
const MAX_TITLE_LENGTH = 60

function postVideo(slug: string): Omit<VideoOptions, 'seed'> | undefined {
	const post = listPostMeta().find((entry) => entry.slug === slug)
	if (!post) return undefined

	// Posts tagged with the author's own name would just repeat the footer.
	const tags = (post.meta.categories ?? [])
		.map((tag) => tag.trim())
		.filter((tag) => tag && tag !== SITE_CONFIG.name)
		.slice(0, MAX_PHRASES)
		.map((tag) => truncate(tag, MAX_PHRASE_LENGTH))

	return {
		title: truncate(post.meta.title, MAX_TITLE_LENGTH),
		kind: 'post',
		date: post.meta.date,
		phrases: tags.length > 0 ? tags : ROLES
	}
}

function pageVideo(slug: string): Omit<VideoOptions, 'seed'> | undefined {
	const title = PAGES[slug]
	return title ? { title, kind: 'page', phrases: ROLES } : undefined
}

export const entries: EntryGenerator = () => [
	...Object.keys(PAGES).map((slug) => ({ kind: 'page', slug })),
	...listPostMeta().map(({ slug }) => ({ kind: 'post', slug }))
]

export const GET: RequestHandler = async ({ params }) => {
	const options =
		params.kind === 'post' ? postVideo(params.slug) : params.kind === 'page' ? pageVideo(params.slug) : undefined
	if (!options) throw error(404, 'No video for this page')

	const mp4 = await renderCardVideo({ ...options, seed: `${params.kind}/${params.slug}` })

	return new Response(mp4, { headers: { 'Content-Type': 'video/mp4' } })
}
