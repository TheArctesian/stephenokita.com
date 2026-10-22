import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { COLORS, SITE_CONFIG } from '$lib/constants'
import { firaCodeBold, firaCodeRegular } from '$lib/server/fonts/fira_code'

/**
 * The social preview card, drawn with satori + resvg.
 *
 * Shared by the og:image route and the og:video, so a page's poster image
 * and its video are the same card.
 */

/** PNG bytes, backed by a plain ArrayBuffer so they work as a Response body. */
export type Png = Uint8Array<ArrayBuffer>

export const WIDTH = 1200
export const HEIGHT = 630

export interface CardOptions {
	title: string
	kind: string
	date?: string
}

/**
 * Where the video's animated phrase sits on the card. Fixed rather than
 * flowing under the title so the static card is drawn once and only this
 * strip is redrawn per frame.
 */
export const PHRASE_BOX = { x: 88, y: 400, width: 1040, height: 56 }

/** Satori takes React-element-shaped objects; this builds them without JSX. */
function h(type: string, props: Record<string, unknown> = {}, children?: unknown) {
	return { type, props: { ...props, ...(children === undefined ? {} : { children }) } }
}

/**
 * Glyphs outside the latin subset (the site has posts titled in Chinese) would
 * otherwise render as tofu. Fetch just the needed subset from Google Fonts
 * instead of bundling a ~10 MB CJK face.
 */
async function loadAdditionalAsset(code: string, text: string) {
	if (code !== 'emoji' && !/[^\u0000-\u04FF]/.test(text)) return []

	// CJK punctuation and full-width forms (？，（）) arrive as their own
	// segments and exist only in the CJK face; Noto Sans answers them with a 400.
	const family = /[一-鿿㐀-䶿\u3000-\u303F\uFF00-\uFFEF]/.test(text) ? 'Noto+Sans+SC' : 'Noto+Sans'

	try {
		const cssUrl = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`
		const css = await (
			await fetch(cssUrl, {
				headers: {
					// Ask for TTF rather than WOFF2, which satori cannot parse.
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
				}
			})
		).text()

		const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1]
		if (!fontUrl) return []

		const font = await fetch(fontUrl)
		// An error page handed to satori as a font would throw, not degrade.
		if (!font.ok) return []

		const data = await font.arrayBuffer()
		// Each call fetches a subset cut to `text`; a shared name would let the
		// first subset shadow the glyphs of every later one.
		return [{ name: `fallback-${family}-${text}`, data, weight: 400 as const, style: 'normal' as const }]
	} catch (error) {
		// A missing fallback should degrade to tofu, never to a broken image.
		console.warn('OG fallback font fetch failed:', error)
		return []
	}
}

function card({ title, kind, date }: CardOptions) {
	const isPost = kind === 'post'

	return h(
		'div',
		{
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				backgroundColor: COLORS.BACKGROUND,
				padding: '72px',
				fontFamily: 'Fira Code',
				// A subtle accent bar down the left edge, matching the site's cards.
				borderLeft: `16px solid ${COLORS.PRIMARY}`
			}
		},
		[
			h(
				'div',
				{ style: { display: 'flex', flexDirection: 'column' } },
				[
					h(
						'div',
						{
							style: {
								display: 'flex',
								fontSize: 26,
								color: COLORS.INFO,
								letterSpacing: '0.18em',
								textTransform: 'uppercase',
								marginBottom: '28px'
							}
						},
						isPost ? 'Essay' : SITE_CONFIG.url.replace('https://', '')
					),
					h(
						'div',
						{
							style: {
								display: 'flex',
								fontSize: title.length > 55 ? 58 : 74,
								fontWeight: 700,
								color: COLORS.FOREGROUND,
								lineHeight: 1.18,
								letterSpacing: '-0.02em'
							}
						},
						title
					)
				]
			),
			h(
				'div',
				{
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderTop: `2px solid ${COLORS.SELECTION}`,
						paddingTop: '28px'
					}
				},
				[
					h(
						'div',
						{ style: { display: 'flex', fontSize: 30, color: COLORS.PRIMARY, fontWeight: 700 } },
						SITE_CONFIG.title
					),
					h(
						'div',
						{ style: { display: 'flex', fontSize: 26, color: COLORS.SECONDARY } },
						date ? new Date(date).toISOString().slice(0, 10) : SITE_CONFIG.url.replace('https://', '')
					)
				]
			)
		]
	)
}

function phraseStrip({ text, cursor }: { text: string; cursor: boolean }) {
	return h(
		'div',
		{ style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: 36, fontFamily: 'Fira Code' } },
		[
			h('div', { style: { display: 'flex', color: COLORS.PRIMARY, marginRight: '20px' } }, '›'),
			h('div', { style: { display: 'flex', color: COLORS.INFO, whiteSpace: 'pre' } }, text),
			h('div', {
				style: {
					display: 'flex',
					width: '20px',
					height: '42px',
					marginLeft: '6px',
					backgroundColor: cursor ? COLORS.INFO : 'transparent'
				}
			})
		]
	)
}

async function render(tree: unknown, width: number, height: number): Promise<Png> {
	const svg = await satori(tree as never, {
		width,
		height,
		// A fresh array per render on purpose: satori caches its font loader,
		// including fetched CJK subsets, by this array's identity, and a subset
		// cut for one title lacks the glyphs of the next.
		fonts: [
			{ name: 'Fira Code', data: firaCodeRegular, weight: 400, style: 'normal' },
			{ name: 'Fira Code', data: firaCodeBold, weight: 700, style: 'normal' }
		],
		loadAdditionalAsset: loadAdditionalAsset as never
	})

	// Satori already outlines all text as paths, so resvg needs no fonts; its
	// system-font scan otherwise costs ~150ms per render.
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: false } })
		.render()
		.asPng()
	return new Uint8Array(png)
}

export function renderCardPng(options: CardOptions): Promise<Png> {
	return render(card(options), WIDTH, HEIGHT)
}

/** The phrase line alone on a transparent strip sized to PHRASE_BOX. */
export function renderPhrasePng(phrase: { text: string; cursor: boolean }): Promise<Png> {
	return render(phraseStrip(phrase), PHRASE_BOX.width, PHRASE_BOX.height)
}
