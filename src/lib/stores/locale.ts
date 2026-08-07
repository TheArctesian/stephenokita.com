import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { AVAILABLE_LOCALES, DEFAULT_LOCALE, isLocale, type LocaleCode } from '$lib/i18n/config';

// UNIX Philosophy: Simple, modular locale system. The locale definitions live
// in $lib/i18n/config so server endpoints and build-time generators can share
// them without pulling in any svelte runtime.
export { AVAILABLE_LOCALES, DEFAULT_LOCALE, type LocaleCode };

/**
 * The active locale, derived from the URL.
 *
 * The URL is the single source of truth. This replaced a localStorage-backed
 * store: because that value was only readable after hydration, the server
 * always rendered en-GB and crawlers could never see the other three locales
 * at all. Deriving from the route means the locale is known during SSR, the
 * correct text is in the served HTML, and each locale has a real address.
 */
export const locale = derived<typeof page, LocaleCode>(page, ($page) => {
  const param = $page.params.lang;
  return isLocale(param) ? param : DEFAULT_LOCALE;
});
