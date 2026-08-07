import type { Handle } from '@sveltejs/kit'
import { DEFAULT_LOCALE, isPrefixedLocale } from '$lib/i18n/config'

/**
 * UNIX Philosophy: one job — stamp the correct language onto the served HTML.
 *
 * The locale is read straight off the URL rather than from storage, so the
 * markup a crawler receives already carries the right `lang` instead of only
 * getting it after hydration.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const [, firstSegment] = event.url.pathname.split('/')
	const lang = isPrefixedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE

	return resolve(event, {
		// Global replace: a string pattern would only substitute the first
		// occurrence, which is a silent footgun if the placeholder is ever
		// mentioned more than once in app.html.
		transformPageChunk: ({ html }) => html.replace(/%lang%/g, lang)
	})
}
