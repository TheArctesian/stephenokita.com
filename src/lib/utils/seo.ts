/**
 * Unix Philosophy: Do one thing well — build the URLs and strings that
 * crawlers and answer engines consume. Pure functions, no side effects.
 */

import { SITE_CONFIG } from '$lib/constants'
import {
	DEFAULT_LOCALE,
	isPrefixedLocale,
	type LocaleCode
} from '$lib/i18n/config'
import { encodeSlugForUrl } from './slugResolver'

/** Turn a site-relative path into an absolute URL against the canonical origin. */
export function absoluteUrl(path: string): string {
	if (/^https?:\/\//.test(path)) return path
	return `${SITE_CONFIG.url}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Split a leading locale prefix off a path.
 * `/zh-Hant/blog` → `{ locale: 'zh-Hant', path: '/blog' }`
 */
export function splitLocaleFromPath(path: string): {
	locale: LocaleCode
	path: string
} {
	const [, first, ...rest] = path.split('/')
	if (isPrefixedLocale(first)) {
		return { locale: first, path: `/${rest.join('/')}` }
	}
	return { locale: DEFAULT_LOCALE, path }
}

/**
 * Rewrite a path for a given locale. The default locale is served unprefixed
 * and is the canonical form; the other three carry a `/<code>` prefix.
 */
export function localizedPath(path: string, locale: LocaleCode): string {
	const { path: bare } = splitLocaleFromPath(path)
	const normalized = bare === '' ? '/' : bare

	if (locale === DEFAULT_LOCALE) return normalized
	return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

/** The canonical path for a post. Slugs contain spaces, apostrophes and CJK. */
export function postPath(slug: string): string {
	return `/blog/${encodeSlugForUrl(slug)}`
}

export interface OgImageOptions {
	title: string
	kind?: 'post' | 'page'
	date?: string
}

/** Absolute URL of the generated social preview card for a page or post. */
export function ogImageUrl({ title, kind = 'page', date }: OgImageOptions): string {
	const params = new URLSearchParams({ title, kind })
	if (date) params.set('date', date)
	return absoluteUrl(`/api/og?${params.toString()}`)
}

/** Trim to a length social platforms and SERPs will actually display. */
export function truncate(text: string, max = 160): string {
	const clean = text.replace(/\s+/g, ' ').trim()
	if (clean.length <= max) return clean

	const cut = clean.slice(0, max - 1)
	const lastSpace = cut.lastIndexOf(' ')
	return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/**
 * Serialise a JSON-LD graph for injection into a <script> tag.
 *
 * `<` is escaped so a post title containing `</script>` can never break out of
 * the element — this string is injected with {@html}, so it is the only thing
 * standing between frontmatter and script injection.
 */
export function safeJsonLd(data: unknown): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026')
}

/** Strip markdown syntax down to plain prose, for descriptions and word counts. */
export function markdownToPlainText(markdown: string): string {
	return markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/^[#>\-*+]+\s*/gm, '')
		.replace(/[*_~]/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}
