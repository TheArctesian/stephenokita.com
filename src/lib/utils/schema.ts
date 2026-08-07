/**
 * Unix Philosophy: Do one thing well — build schema.org JSON-LD graphs.
 *
 * Every node that is referenced from more than one page gets a stable `@id`
 * so search engines merge them into a single entity rather than treating each
 * page's copy as a separate person/site.
 */

import { SITE_CONFIG } from '$lib/constants'
import { absoluteUrl, postPath } from './seo'
import type { PostFrontmatter } from '$lib/posts'

export const PERSON_ID = `${SITE_CONFIG.url}/#person`
export const WEBSITE_ID = `${SITE_CONFIG.url}/#website`

/** Frontmatter `language` values are prose; JSON-LD wants BCP-47. */
export function toBcp47(language?: string[]): string {
	const first = language?.[0]?.toLowerCase() ?? ''
	if (first.includes('chinese') || first.includes('中文')) return 'zh'
	return 'en'
}

export function personSchema(knowsAbout?: string[]) {
	return {
		'@type': 'Person',
		'@id': PERSON_ID,
		name: SITE_CONFIG.title,
		alternateName: SITE_CONFIG.name,
		url: SITE_CONFIG.url,
		email: `mailto:${SITE_CONFIG.email}`,
		description: SITE_CONFIG.description,
		sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin, SITE_CONFIG.instagram],
		...(knowsAbout?.length ? { knowsAbout } : {})
	}
}

export function websiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: SITE_CONFIG.url,
		name: SITE_CONFIG.title,
		description: SITE_CONFIG.description,
		publisher: { '@id': PERSON_ID },
		inLanguage: 'en-GB'
	}
}

/** The site-wide graph, emitted once from the root layout. */
export function siteGraph() {
	return {
		'@context': 'https://schema.org',
		'@graph': [personSchema(), websiteSchema()]
	}
}

export interface BlogPostingInput {
	slug: string
	meta: PostFrontmatter
	/** Computed once from the rendered HTML in the post's load function. */
	wordCount?: number
	image?: string
}

export function blogPostingSchema({ slug, meta, wordCount, image }: BlogPostingInput) {
	const url = absoluteUrl(postPath(slug))

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		headline: meta.title,
		description: meta.description,
		datePublished: meta.date,
		dateModified: meta.updated ?? meta.date,
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID },
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		url,
		inLanguage: toBcp47(meta.language),
		...(meta.categories?.length ? { keywords: meta.categories.join(', ') } : {}),
		...(image ? { image } : {}),
		...(wordCount ? { wordCount } : {}),
		...(meta.location ? { locationCreated: { '@type': 'Place', name: meta.location } } : {})
	}
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: absoluteUrl(crumb.path)
		}))
	}
}

export interface CollectionInput {
	type?: 'CollectionPage' | 'Blog' | 'ProfilePage'
	name: string
	description: string
	path: string
	items?: unknown[]
}

export function collectionPageSchema({
	type = 'CollectionPage',
	name,
	description,
	path,
	items
}: CollectionInput) {
	const url = absoluteUrl(path)
	return {
		'@context': 'https://schema.org',
		'@type': type,
		'@id': `${url}#page`,
		name,
		description,
		url,
		isPartOf: { '@id': WEBSITE_ID },
		...(type === 'Blog' ? { author: { '@id': PERSON_ID } } : {}),
		...(items?.length
			? {
					mainEntity: {
						'@type': 'ItemList',
						numberOfItems: items.length,
						itemListElement: items.map((item, index) => ({
							'@type': 'ListItem',
							position: index + 1,
							item
						}))
					}
			  }
			: {})
	}
}

/** A blog post reduced to a list entry, for the /blog ItemList. */
export function postListItem(slug: string, meta: PostFrontmatter) {
	return {
		'@type': 'BlogPosting',
		'@id': `${absoluteUrl(postPath(slug))}#article`,
		headline: meta.title,
		description: meta.description,
		datePublished: meta.date,
		url: absoluteUrl(postPath(slug)),
		author: { '@id': PERSON_ID }
	}
}

export interface ProjectLike {
	title: string
	description?: string | null
	liveUrl?: string | null
	githubUrl?: string | null
	imageUrl?: string | null
	technologies?: string[] | null
	startDate?: Date | string | null
	category?: { name: string } | null
}

/** A project as SoftwareSourceCode — the closest schema.org fit for code work. */
export function projectListItem(project: ProjectLike) {
	const toIso = (value?: Date | string | null) =>
		value ? new Date(value).toISOString().slice(0, 10) : undefined

	return {
		'@type': 'SoftwareSourceCode',
		name: project.title,
		...(project.description ? { description: project.description } : {}),
		...(project.liveUrl ? { url: project.liveUrl } : {}),
		...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
		...(project.imageUrl ? { image: project.imageUrl } : {}),
		...(project.technologies?.length
			? { programmingLanguage: project.technologies, keywords: project.technologies.join(', ') }
			: {}),
		...(toIso(project.startDate) ? { dateCreated: toIso(project.startDate) } : {}),
		...(project.category?.name ? { applicationCategory: project.category.name } : {}),
		author: { '@id': PERSON_ID }
	}
}

export function profilePageSchema(description: string) {
	const url = absoluteUrl('/person')
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		'@id': `${url}#page`,
		name: `${SITE_CONFIG.name} — Person`,
		description,
		url,
		isPartOf: { '@id': WEBSITE_ID },
		mainEntity: { '@id': PERSON_ID }
	}
}
