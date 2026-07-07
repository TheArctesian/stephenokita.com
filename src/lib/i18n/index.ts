import { derived } from 'svelte/store';
import { locale, type LocaleCode } from '$lib/stores/locale';
import type { Dict } from './types';
import enGB from './locales/en-GB';
import enUS from './locales/en-US';
import zhHant from './locales/zh-Hant';
import zhHans from './locales/zh-Hans';

// UNIX Philosophy: one small resolver that does one thing — turn (locale, key)
// into a display string, with English fallback and `{param}` interpolation.
const DICTIONARIES: Record<LocaleCode, Dict> = {
  'en-GB': enGB,
  'en-US': enUS,
  'zh-Hant': zhHant,
  'zh-Hans': zhHans
};

export type TranslateParams = Record<string, string | number>;
export type Translate = (key: string, params?: TranslateParams) => string;

// Single responsibility: fill {param} placeholders
function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match
  );
}

// Derived store: `$t('some.key')` reacts to locale changes. Missing keys fall
// back to en-GB, then to the raw key so nothing ever renders blank.
export const t = derived<typeof locale, Translate>(locale, ($locale) => {
  const dict = DICTIONARIES[$locale] ?? enGB;
  return (key: string, params?: TranslateParams) => {
    const template = dict[key] ?? enGB[key] ?? key;
    return interpolate(template, params);
  };
});
