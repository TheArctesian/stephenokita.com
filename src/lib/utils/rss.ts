import type { Post } from '$lib/types'

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
	title: 'Stephen Okita',
	description: 'Philosophy, technology, and thoughts on existence',
	link: 'https://stephenokita.com',
	language: 'en-us',
	copyright: `Copyright ${new Date().getFullYear()} Stephen Okita`,
	webMaster: 'stephen@okita.com (Stephen Okita)',
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

export function generateRSSFeed(posts: Post[], config: Partial<RSSConfig> = {}): string {
	const finalConfig = { ...defaultConfig, ...config }
	const now = new Date().toUTCString()
	
	const items = posts
		.filter(post => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 20) // Include latest 20 posts
		.map(post => {
			const postUrl = `${finalConfig.link}/${post.slug}`
			const pubDate = new Date(post.date).toUTCString()
			
			return `<item>
<guid isPermaLink="true">${postUrl}</guid>
<title>${escapeXml(post.title)}</title>
<link>${postUrl}</link>
<description>${escapeXml(post.description)}</description>
<pubDate>${pubDate}</pubDate>
${generateCategories(post.categories)}
</item>`
		})
		.join('')

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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