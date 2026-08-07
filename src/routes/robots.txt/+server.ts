import type { RequestHandler } from './$types'
import { absoluteUrl } from '$lib/utils/seo'

export const prerender = true

/**
 * Answer-engine and AI crawlers are welcomed explicitly rather than left to
 * the wildcard rule. Naming them documents the intent — this site wants to be
 * readable, quotable and citable by LLMs — and survives a future tightening of
 * the default policy.
 */
const AI_AGENTS = [
	// OpenAI
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	// Anthropic
	'ClaudeBot',
	'Claude-User',
	'Claude-SearchBot',
	'anthropic-ai',
	// Perplexity
	'PerplexityBot',
	'Perplexity-User',
	// Google / Apple / Meta / Amazon
	'Google-Extended',
	'Applebot',
	'Applebot-Extended',
	'meta-externalagent',
	'FacebookBot',
	'Amazonbot',
	// Others
	'CCBot',
	'cohere-ai',
	'Diffbot',
	'YouBot',
	'Timpibot',
	'Bytespider'
]

export const GET: RequestHandler = async () => {
	const blocks = [
		[
			'# Everything here is meant to be read — by people and by machines alike.',
			'User-agent: *',
			'Allow: /',
			// The API surface is data plumbing, not content. /api/og is the
			// exception: it renders the social preview images referenced by
			// og:image, so it must stay crawlable.
			'Disallow: /api/',
			'Allow: /api/og'
		].join('\n'),

		[
			'# AI and answer engines are explicitly welcome.',
			...AI_AGENTS.map((agent) => `User-agent: ${agent}`),
			'Allow: /',
			'Disallow: /api/',
			'Allow: /api/og'
		].join('\n'),

		[
			`Sitemap: ${absoluteUrl('/sitemap.xml')}`,
			`# Curated index for LLMs: ${absoluteUrl('/llms.txt')}`,
			`# Full corpus for LLMs: ${absoluteUrl('/llms-full.txt')}`
		].join('\n')
	]

	return new Response(`${blocks.join('\n\n')}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=86400'
		}
	})
}
