import type { RequestHandler } from './$types'
import { lastModified, listPostMeta } from '$lib/posts'
import { absoluteUrl, localizedPath, postPath } from '$lib/utils/seo'
import { escapeXml } from '$lib/utils/xml'
import { LOCALE_CODES, DEFAULT_LOCALE } from '$lib/i18n/config'

export const prerender = true

interface SitemapEntry {
	path: string
	lastmod?: string
	changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
	priority: string
	/** Emit reciprocal hreflang alternates for this URL. */
	translated: boolean
}

/**
 * The UI chrome of these pages is genuinely translated, so each gets a real
 * hreflang group. /meta is diagnostics and is deliberately absent — it is
 * marked noindex by the page itself.
 */
const STATIC_ENTRIES: SitemapEntry[] = [
	{ path: '/', changefreq: 'weekly', priority: '1.0', translated: true },
	{ path: '/blog', changefreq: 'daily', priority: '0.9', translated: true },
	{ path: '/projects', changefreq: 'weekly', priority: '0.8', translated: true },
	{ path: '/skills', changefreq: 'monthly', priority: '0.6', translated: true },
	{ path: '/person', changefreq: 'monthly', priority: '0.6', translated: true }
]

function toIsoDate(value: string): string {
	const parsed = new Date(value)
	return Number.isNaN(parsed.getTime())
		? new Date().toISOString().slice(0, 10)
		: parsed.toISOString().slice(0, 10)
}

function renderEntry(entry: SitemapEntry): string {
	const loc = absoluteUrl(localizedPath(entry.path, DEFAULT_LOCALE))

	// Google requires a self-referential alternate inside every group member.
	const alternates = entry.translated
		? [
				...LOCALE_CODES.map(
					(code) =>
						`<xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(
							absoluteUrl(localizedPath(entry.path, code))
						)}" />`
				),
				`<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(loc)}" />`
		  ].join('\n    ')
		: ''

	return `  <url>
    <loc>${escapeXml(loc)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternates ? `\n    ${alternates}` : ''}
  </url>`
}

export const GET: RequestHandler = async () => {
	const posts = listPostMeta()

	const newestPost = posts[0] ? toIsoDate(lastModified(posts[0].meta)) : undefined

	const entries: SitemapEntry[] = [
		...STATIC_ENTRIES.map((entry) =>
			entry.path === '/blog' || entry.path === '/' ? { ...entry, lastmod: newestPost } : entry
		),
		// Post bodies are the same English text under every locale, so each post
		// has exactly one indexable URL and no alternate group.
		...posts.map((post) => ({
			path: postPath(post.slug),
			lastmod: toIsoDate(lastModified(post.meta)),
			changefreq: 'yearly' as const,
			priority: '0.7',
			translated: false
		}))
	]

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(renderEntry).join('\n')}
</urlset>
`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	})
}
