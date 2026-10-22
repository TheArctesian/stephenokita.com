import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import { PHRASE_BOX, renderCardPng, renderPhrasePng, type CardOptions, type Png } from './card'
import { FPS, scrambleTimeline } from './scramble'

/**
 * The og:video: the social card with its phrase line scrambling through
 * `phrases`, encoded as an H.264 mp4 that iMessage, Discord, Telegram and
 * Facebook will play inline.
 *
 * Build-time only: ffmpeg is a devDependency and is not in the serverless
 * bundle.
 */

export interface VideoOptions extends CardOptions {
	phrases: string[]
	/** Seeds the scramble so a page renders identically on every build. */
	seed: string
}

/** Overlays the per-frame phrase strips onto the still card. */
function encode(card: string, strips: Png[], output: string): Promise<void> {
	if (!ffmpegPath) throw new Error('ffmpeg-static has no binary for this platform')

	const ffmpeg = spawn(
		ffmpegPath,
		[
			'-loglevel', 'error',
			'-loop', '1',
			'-framerate', String(FPS),
			'-i', card,
			'-f', 'image2pipe',
			'-framerate', String(FPS),
			'-i', '-',
			'-filter_complex', `[0][1]overlay=${PHRASE_BOX.x}:${PHRASE_BOX.y}:shortest=1,format=yuv420p`,
			'-c:v', 'libx264',
			'-preset', 'veryfast',
			'-crf', '26',
			// Lets a preview start playing before the whole file arrives.
			'-movflags', '+faststart',
			'-y', output
		],
		{ stdio: ['pipe', 'ignore', 'pipe'] }
	)

	let stderr = ''
	ffmpeg.stderr.on('data', (chunk) => (stderr += chunk))

	const done = new Promise<void>((resolve, reject) => {
		ffmpeg.on('error', reject)
		ffmpeg.on('close', (code) =>
			code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}: ${stderr}`))
		)
	})

	for (const strip of strips) ffmpeg.stdin.write(strip)
	ffmpeg.stdin.end()

	return done
}

export async function renderCardVideo({ phrases, seed, ...card }: VideoOptions): Promise<Uint8Array<ArrayBuffer>> {
	const timeline = scrambleTimeline(phrases, seed)

	// Holds repeat the same strip dozens of times; render each state once.
	const rendered = new Map<string, Png>()
	const strips: Png[] = []
	for (const phrase of timeline) {
		const key = `${phrase.cursor ? 1 : 0}${phrase.text}`
		let png = rendered.get(key)
		if (!png) {
			png = await renderPhrasePng(phrase)
			rendered.set(key, png)
		}
		strips.push(png)
	}

	const dir = await mkdtemp(join(tmpdir(), 'og-video-'))
	try {
		const still = join(dir, 'card.png')
		const output = join(dir, 'card.mp4')
		await writeFile(still, await renderCardPng(card))
		await encode(still, strips, output)
		return new Uint8Array(await readFile(output))
	} finally {
		await rm(dir, { recursive: true, force: true })
	}
}
