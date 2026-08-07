/**
 * Regenerates src/lib/server/fonts/fira_code.ts from @fontsource/fira-code.
 *
 * Run after bumping that dependency:  node scripts/build-og-fonts.mjs
 *
 * The bytes are inlined into a TS module rather than read from disk at runtime
 * because adapter-vercel 1.x offers no includeFiles option, so a filesystem
 * read is not guaranteed to resolve inside the serverless bundle.
 */
import fs from 'node:fs'

const WEIGHTS = { REGULAR: 400, BOLD: 700 }
const OUT = 'src/lib/server/fonts/fira_code.ts'

const read = (weight) =>
	fs
		.readFileSync(`node_modules/@fontsource/fira-code/files/fira-code-latin-${weight}-normal.woff`)
		.toString('base64')

const source = `/**
 * Fira Code (latin subset) as base64, the same typeface the site renders in.
 *
 * Satori needs raw font bytes and cannot use the Google Fonts stylesheet that
 * app.html loads. The bytes are inlined rather than read from disk because
 * adapter-vercel 1.x has no includeFiles option, so a filesystem read is not
 * guaranteed to resolve inside the serverless bundle.
 *
 * Source: @fontsource/fira-code (SIL Open Font License 1.1).
 * Regenerate with scripts/build-og-fonts.mjs after bumping that dependency.
 */

const REGULAR_B64 =
\t'${read(WEIGHTS.REGULAR)}'

const BOLD_B64 =
\t'${read(WEIGHTS.BOLD)}'

function decode(base64: string): ArrayBuffer {
\tconst binary = atob(base64)
\tconst bytes = new Uint8Array(binary.length)
\tfor (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
\treturn bytes.buffer
}

export const firaCodeRegular = decode(REGULAR_B64)
export const firaCodeBold = decode(BOLD_B64)
`

fs.writeFileSync(OUT, source)
console.log(`Wrote ${OUT} (${(source.length / 1024).toFixed(0)} KB)`)
