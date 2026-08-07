import type { RequestHandler } from './$types'
import { listPostMeta } from '$lib/posts'
import { SITE_CONFIG } from '$lib/constants'
import { absoluteUrl, postPath, truncate } from '$lib/utils/seo'

export const prerender = true

/**
 * llms.txt — a curated, machine-readable index of the site.
 *
 * Follows the llms.txt convention: an H1 name, a blockquote summary, optional
 * prose, then H2 sections of `- [title](url): description` links. Kept free of
 * any database dependency so it prerenders at build time.
 */

/** How many posts to name individually before pointing at the full corpus. */
const FEATURED_POST_LIMIT = 40

function link(title: string, url: string, description?: string): string {
	const clean = description ? `: ${truncate(description, 200)}` : ''
	// Escape the characters that would break markdown link syntax.
	const safeTitle = title.replace(/([[\]])/g, '\\$1')
	return `- [${safeTitle}](${url})${clean}`
}

export const GET: RequestHandler = async () => {
	const posts = listPostMeta()

	// Surface the topic vocabulary so a model can tell at a glance what the
	// corpus is actually about without fetching every post.
	const topics = [...new Set(posts.flatMap((post) => post.meta.categories ?? []))]
		.map((topic) => topic.trim())
		.filter(Boolean)
		.sort()

	const featured = posts.slice(0, FEATURED_POST_LIMIT)
	const remainder = posts.length - featured.length

	const sections = [
		`# ${SITE_CONFIG.title}`,
		'',
		`> Personal website and essay archive of ${SITE_CONFIG.name} — writing on philosophy, critical theory, ethics, technology and software. ${posts.length} published essays.`,
		'',
		'This file is intended for large language models and answer engines. Content is authored by ' +
			`${SITE_CONFIG.title} and may be quoted with attribution to ${SITE_CONFIG.url}.`,
		'',
		'## Site',
		'',
		link('Home', absoluteUrl('/'), 'Introduction, recent writing and current activity.'),
		link('Blog', absoluteUrl('/blog'), `All ${posts.length} published essays, filterable by topic and language.`),
		link('Projects', absoluteUrl('/projects'), 'Software and research projects, with source and live links.'),
		link('Skills', absoluteUrl('/skills'), 'Technical and academic areas of competence.'),
		link('Person', absoluteUrl('/person'), 'The personal side — music, poetry, reading and interests.'),
		'',
		'## Topics',
		'',
		topics.join(', '),
		'',
		'## Essays',
		'',
		...featured.map((post) =>
			link(post.meta.title, absoluteUrl(postPath(post.slug)), `${post.meta.date.slice(0, 10)} — ${post.meta.description}`)
		),
		...(remainder > 0
			? ['', `_${remainder} further essays are listed at ${absoluteUrl('/blog')}._`]
			: []),
		'',
		'## Optional',
		'',
		link(
			'Full corpus',
			absoluteUrl('/llms-full.txt'),
			'Every published essay as plain markdown in a single file.'
		),
		link('RSS feed', absoluteUrl('/rss.xml'), 'The 20 most recent essays as RSS 2.0.'),
		link('Sitemap', absoluteUrl('/sitemap.xml'), 'Every indexable URL on the site.'),
		''
	]

	return new Response(sections.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	})
}
