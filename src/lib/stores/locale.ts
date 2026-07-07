import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// UNIX Philosophy: Simple, modular locale system — a sibling of the theme
// store. The active locale lives in localStorage only (no URL change) and is
// mirrored onto <html lang> so CSS/font fallbacks and a11y tools pick it up.
export type LocaleCode = 'en-GB' | 'en-US' | 'zh-Hant' | 'zh-Hans';

// Each label is written in the language it names (self-referential native form).
export const AVAILABLE_LOCALES = {
  'en-GB': 'English (Traditional)',
  'en-US': 'English (Simplified)',
  'zh-Hant': '中文繁體',
  'zh-Hans': '中文简体'
} as const;

const DEFAULT_LOCALE: LocaleCode = 'en-GB';
const STORAGE_KEY = 'locale';

// Single responsibility: type guard for a stored value
function isLocale(value: string | null): value is LocaleCode {
  return value !== null && value in AVAILABLE_LOCALES;
}

// Single responsibility: reflect the locale onto the document
function applyLocale(code: LocaleCode) {
  if (!browser) return;
  document.documentElement.setAttribute('lang', code);
}

// Create the locale store following UNIX philosophy: do one thing well
function createLocaleStore() {
  const { subscribe, set } = writable<LocaleCode>(DEFAULT_LOCALE);

  return {
    subscribe,

    // Single responsibility: set locale
    setLocale: (code: LocaleCode) => {
      if (browser) {
        localStorage.setItem(STORAGE_KEY, code);
        applyLocale(code);
        set(code);
      }
    },

    // Single responsibility: initialise locale from storage
    init: () => {
      if (browser) {
        const stored = localStorage.getItem(STORAGE_KEY);
        const code = isLocale(stored) ? stored : DEFAULT_LOCALE;
        applyLocale(code);
        set(code);
      }
    }
  };
}

export const locale = createLocaleStore();
