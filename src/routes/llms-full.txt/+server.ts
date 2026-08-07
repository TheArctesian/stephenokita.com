import type { RequestHandler } from './$types'
import { listPostRaw } from '$lib/posts'
import { SITE_CONFIG } from '$lib/constants'
import { absoluteUrl, postPath } from '$lib/utils/seo'

export const prerender = true

/**
 * llms-full.txt — the entire published corpus as plain markdown in one fetch.
 *
 * Each essay carries a header block with its canonical URL, date and topics so
 * a model that ingests this file can still attribute individual passages back
 * to the right page.
 */
export const GET: RequestHandler = async () => {
	const posts = await listPostRaw()

	const header = [
		`# ${SITE_CONFIG.title} — Complete Essay Corpus`,
		'',
		`> Every published essay from ${SITE_CONFIG.url}, ${posts.length} in total, as plain markdown.`,
		`> Authored by ${SITE_CONFIG.title}. Quotation with attribution to the canonical URL of the individual essay is welcome.`,
		`> Generated from source; the canonical HTML version of each essay is linked in its header.`,
		''
	].join('\n')

	const body = posts
		.map((post) => {
			const meta = post.meta
			const topics = meta.categories?.length ? meta.categories.join(', ') : undefined

			return [
				'',
				'---',
				'',
				`# ${meta.title}`,
				'',
				`- URL: ${absoluteUrl(postPath(post.slug))}`,
				`- Published: ${meta.date.slice(0, 10)}`,
				...(meta.updated ? [`- Updated: ${meta.updated.slice(0, 10)}`] : []),
				...(meta.location ? [`- Written in: ${meta.location}`] : []),
				...(topics ? [`- Topics: ${topics}`] : []),
				...(meta.description ? [`- Summary: ${meta.description}`] : []),
				'',
				post.body,
				''
			].join('\n')
		})
		.join('\n')

	return new Response(`${header}${body}`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	})
}
