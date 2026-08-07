/**
 * Unix Philosophy: Do one thing well — describe the available locales.
 *
 * Deliberately dependency-free (no svelte, no $app) so that server endpoints,
 * build-time generators and client stores can all share one definition.
 */

export type LocaleCode = 'en-GB' | 'en-US' | 'zh-Hant' | 'zh-Hans'

/** Each label is written in the language it names (self-referential native form). */
export const AVAILABLE_LOCALES = {
	'en-GB': 'English (Traditional)',
	'en-US': 'English (Simplified)',
	'zh-Hant': '中文繁體',
	'zh-Hans': '中文简体'
} as const

export const DEFAULT_LOCALE: LocaleCode = 'en-GB'

export const LOCALE_CODES = Object.keys(AVAILABLE_LOCALES) as LocaleCode[]

/**
 * Locales that carry a URL prefix. The default locale is served unprefixed and
 * is the canonical form, so `/en-GB/*` must never resolve — otherwise every
 * page would exist at two addresses.
 */
export const PREFIXED_LOCALES = LOCALE_CODES.filter((code) => code !== DEFAULT_LOCALE)

export function isLocale(value: string | null | undefined): value is LocaleCode {
	return typeof value === 'string' && value in AVAILABLE_LOCALES
}

export function isPrefixedLocale(value: string | null | undefined): value is LocaleCode {
	return isLocale(value) && value !== DEFAULT_LOCALE
}
