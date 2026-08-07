import type { ParamMatcher } from '@sveltejs/kit'
import { isPrefixedLocale } from '$lib/i18n/config'

/**
 * Matches only the locales that carry a URL prefix.
 *
 * The default locale (en-GB) is deliberately excluded: it is served at the
 * unprefixed path and is the canonical form, so /en-GB/blog must 404 rather
 * than become a duplicate of /blog.
 */
export const match: ParamMatcher = (param) => isPrefixedLocale(param)
