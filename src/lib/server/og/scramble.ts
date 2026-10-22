/**
 * The og:video animation as data: one phrase scrambles into the next.
 *
 * Pure and seeded, so a page renders the same video on every build. The
 * timeline starts and ends on the first phrase, so the clip loops cleanly.
 */

export const FPS = 24

const SCRAMBLE_FRAMES = 18 // 0.75s
const HOLD_FRAMES = 48 // 2s
const BLINK_FRAMES = 12 // cursor on/off every 0.5s
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz'

export interface Frame {
	text: string
	cursor: boolean
}

/** mulberry32: tiny, fast and good enough for picking glyphs. */
function random(seed: string): () => number {
	let state = [...seed].reduce((hash, char) => Math.imul(hash ^ char.charCodeAt(0), 2654435761), 7)
	return () => {
		state = (state + 0x6d2b79f5) | 0
		let t = Math.imul(state ^ (state >>> 15), 1 | state)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

/**
 * Frames that turn `from` into `to`. Each character first breaks into a
 * random glyph, then settles roughly left to right, like a decoder locking on.
 */
function transition(from: string, to: string, rand: () => number): Frame[] {
	const source = [...from]
	const target = [...to]
	const length = Math.max(source.length, target.length)

	const timing = Array.from({ length }, (_, i) => {
		const start = rand() * 0.35
		const settle = 0.35 + 0.6 * (i / Math.max(length, 1)) + rand() * 0.05
		return { start, settle }
	})

	return Array.from({ length: SCRAMBLE_FRAMES }, (_, frame) => {
		const progress = (frame + 1) / SCRAMBLE_FRAMES
		const chars = timing.map(({ start, settle }, i) => {
			if (progress < start) return source[i] ?? ''
			if (progress >= settle) return target[i] ?? ''
			if (target[i] === ' ' || (!target[i] && progress > settle - 0.1)) return target[i] ?? ''
			return GLYPHS[Math.floor(rand() * GLYPHS.length)]
		})
		return { text: chars.join('').trimEnd(), cursor: true }
	})
}

function hold(text: string): Frame[] {
	return Array.from({ length: HOLD_FRAMES }, (_, frame) => ({
		text,
		cursor: Math.floor(frame / BLINK_FRAMES) % 2 === 0
	}))
}

export function scrambleTimeline(phrases: string[], seed: string): Frame[] {
	const rand = random(seed)
	const [first, ...rest] = phrases

	// A single phrase has nothing to cycle to, so it decodes in from blank.
	if (rest.length === 0) return [...transition('', first ?? '', rand), ...hold(first ?? '')]

	const frames = hold(first)
	let current = first
	for (const next of [...rest, first]) {
		frames.push(...transition(current, next, rand))
		if (next !== first) frames.push(...hold(next))
		current = next
	}
	return frames
}
