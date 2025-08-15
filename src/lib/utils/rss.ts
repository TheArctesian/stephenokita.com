import type { Post } from '$lib/types'
import { COLORS, SITE_CONFIG } from '$lib/constants'

interface RSSConfig {
	title: string
	description: string
	link: string
	language: string
	copyright: string
	webMaster: string
	category?: string
	ttl?: number
}

const defaultConfig: RSSConfig = {
	title: SITE_CONFIG.title,
	description: 'Philosophy, technology, and thoughts on existence',
	link: SITE_CONFIG.url,
	language: 'en-us',
	copyright: `Copyright ${new Date().getFullYear()} ${SITE_CONFIG.name}`,
	webMaster: `${SITE_CONFIG.email} (${SITE_CONFIG.name})`,
	category: 'Philosophy/Technology',
	ttl: 60
}

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

function generateCategories(categories?: string[]): string {
	if (!categories || categories.length === 0) return ''
	return categories.map(cat => `<category>${escapeXml(cat)}</category>`).join('\n')
}

function generateStyledDescription(post: Post): string {
	// Create styled HTML content that matches the website theme
	const html = `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${COLORS.BACKGROUND}; color: ${COLORS.FOREGROUND}; padding: 20px; border-radius: 8px; border: 1px solid ${COLORS.SELECTION};">
			${post.img ? `
				<img src="${escapeXml(post.img)}" alt="${escapeXml(post.title)}" style="width: 100%; max-width: 600px; height: auto; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; border: 2px solid ${COLORS.SELECTION};" />
			` : ''}
			<h2 style="color: ${COLORS.PRIMARY}; margin: 0 0 10px 0; font-size: 24px;">${escapeXml(post.title)}</h2>
			<p style="color: ${COLORS.FOREGROUND}; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">${escapeXml(post.description)}</p>
			${post.categories && post.categories.length > 0 ? `
				<div style="margin-top: 15px;">
					${post.categories.map(cat => `<span style="background-color: ${COLORS.SELECTION}; color: ${COLORS.INFO}; padding: 4px 8px; border-radius: 4px; margin-right: 8px; font-size: 12px; display: inline-block;">${escapeXml(cat)}</span>`).join('')}
				</div>
			` : ''}
			<div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid ${COLORS.SELECTION};">
				<a href="${SITE_CONFIG.url}/blog/${post.slug}" style="color: ${COLORS.PRIMARY}; text-decoration: none; font-weight: 600;">Read full article →</a>
			</div>
		</div>
	`.replace(/\n\s*/g, '').trim()
	
	return `<![CDATA[${html}]]>`
}

export function generateRSSFeed(posts: Post[], config: Partial<RSSConfig> = {}): string {
	const finalConfig = { ...defaultConfig, ...config }
	const now = new Date().toUTCString()
	
	const items = posts
		.filter(post => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 20) // Include latest 20 posts
		.map(post => {
			const encodedSlug = encodeURIComponent(post.slug)
			const postUrl = `${finalConfig.link}/blog/${encodedSlug}`
			const pubDate = new Date(post.date).toUTCString()
			
			return `<item>
<guid isPermaLink="true">${postUrl}</guid>
<title>${escapeXml(post.title)}</title>
<link>${postUrl}</link>
<description>${generateStyledDescription(post)}</description>
<pubDate>${pubDate}</pubDate>
${post.img ? `<enclosure url="${escapeXml(post.img)}" type="image/jpeg" />
<media:content url="${escapeXml(post.img)}" medium="image" />` : ''}
${generateCategories(post.categories)}
</item>`
		})
		.join('')

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${escapeXml(finalConfig.title)}</title>
<link>${finalConfig.link}</link>
<description>${escapeXml(finalConfig.description)}</description>
<language>${finalConfig.language}</language>
<copyright>${escapeXml(finalConfig.copyright)}</copyright>
<lastBuildDate>${now}</lastBuildDate>
<pubDate>${now}</pubDate>
<ttl>${finalConfig.ttl}</ttl>
<webMaster>${escapeXml(finalConfig.webMaster)}</webMaster>
${finalConfig.category ? `<category>${escapeXml(finalConfig.category)}</category>` : ''}
<atom:link href="${finalConfig.link}/rss.xml" rel="self" type="application/rss+xml" />
${items}</channel>
</rss>`
}