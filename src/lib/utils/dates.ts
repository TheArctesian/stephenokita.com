/**
 * Date / time formatting helpers for the home page activity feed and
 * the upcoming-events ("Where I'll be") list. Pure, typed functions
 * extracted from the page so the markup stays presentational.
 *
 * Locale-aware: English locales keep the existing en-US format (unchanged),
 * while zh-* locales render native Chinese dates and relative/countdown words.
 */
import type { LocaleCode } from "$lib/stores/locale";

export interface CalendarEvent {
  uid?: string;
  summary: string;
  location?: string;
  start: number;
  end?: number;
  allDay?: boolean;
  tentative?: boolean;
}

const isZh = (locale: LocaleCode) => locale.startsWith("zh");

// English keeps the established en-US date format; Chinese uses its own locale
// so months/years/times render natively (e.g. 2026年6月6日).
const intlLocale = (locale: LocaleCode): string => (isZh(locale) ? locale : "en-US");

/** "Jun 6, 2026" (en) / "2026年6月6日" (zh) from an ISO string / timestamp. */
export function formatDate(
  dateStr: string | number | null | undefined,
  locale: LocaleCode = "en-GB",
): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(intlLocale(locale), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Coarse "x mins/hours/days ago" (en) / "N 分鐘前" (zh) relative to now. */
export function formatRelative(
  timestamp: number | null | undefined,
  locale: LocaleCode = "en-GB",
): string {
  if (!timestamp) return "";
  const zh = isZh(locale);
  const hant = locale === "zh-Hant";
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSec < 60) return zh ? (hant ? "剛剛" : "刚刚") : "just now";
  const mins = Math.floor(diffSec / 60);
  if (mins < 60)
    return zh
      ? `${mins} ${hant ? "分鐘前" : "分钟前"}`
      : `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24)
    return zh
      ? `${hours} ${hant ? "小時前" : "小时前"}`
      : `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return zh ? `${days} 天前` : `${days} day${days === 1 ? "" : "s"} ago`;
}

/** "Jun 6" or "Jun 6, 3:00 PM" (en) / native (zh) depending on `allDay`. */
export function formatEventDate(
  start: number | null | undefined,
  allDay?: boolean,
  locale: LocaleCode = "en-GB",
): string {
  if (!start) return "";
  const d = new Date(start);
  return d.toLocaleDateString(intlLocale(locale), {
    month: "short",
    day: "numeric",
    // All-day dates are parsed as UTC midnight, so render them in UTC too —
    // otherwise a west-of-UTC viewer sees the previous calendar day.
    ...(allDay ? { timeZone: "UTC" } : { hour: "numeric", minute: "2-digit" }),
  });
}

/** Renders an event's start (– end) range, collapsing same-day ranges. */
export function formatEventRange(
  event: CalendarEvent | null | undefined,
  locale: LocaleCode = "en-GB",
): string {
  if (!event?.start) return "";
  const start = new Date(event.start);
  const startStr = formatEventDate(event.start, event.allDay, locale);
  if (!event.end) return startStr;
  const end = new Date(event.end);
  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();
  if (sameDay && !event.allDay) {
    return `${startStr} – ${end.toLocaleTimeString(intlLocale(locale), {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }
  if (event.allDay) {
    // Google/ICS all-day end dates are exclusive, so the last day is end − 1.
    const lastDay = new Date(event.end - 24 * 60 * 60 * 1000);
    const singleDay =
      start.getUTCFullYear() === lastDay.getUTCFullYear() &&
      start.getUTCMonth() === lastDay.getUTCMonth() &&
      start.getUTCDate() === lastDay.getUTCDate();
    if (singleDay) return startStr;
    const endStr = lastDay.toLocaleDateString(intlLocale(locale), {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return `${startStr} – ${endStr}`;
  }
  return `${startStr} – ${formatEventDate(event.end, false, locale)}`;
}

/** True while an event is currently happening (between start and end). */
export function isCurrent(event: CalendarEvent | null | undefined): boolean {
  if (!event?.start) return false;
  const now = Date.now();
  if (event.start > now) return false;
  const fallback = event.allDay ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
  const end = event.end ?? event.start + fallback;
  return end > now;
}

/** Human countdown: "now"/"today"/"in N days" (en) or "現在"/"今天"/"N 天後" (zh). */
export function eventCountdown(
  start: number | null | undefined,
  locale: LocaleCode = "en-GB",
): string {
  if (!start) return "";
  const zh = isZh(locale);
  const hant = locale === "zh-Hant";
  const diffMs = start - Date.now();
  if (diffMs <= 0) return zh ? (hant ? "現在" : "现在") : "now";
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (days === 0) return zh ? "今天" : "today";
  if (days === 1) return zh ? "明天" : "tomorrow";
  if (days < 7) return zh ? `${days} ${hant ? "天後" : "天后"}` : `in ${days} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return zh
      ? `${weeks} ${hant ? "週後" : "周后"}`
      : `in ${weeks} week${weeks === 1 ? "" : "s"}`;
  }
  const months = Math.round(days / 30);
  return zh
    ? `${months} ${hant ? "個月後" : "个月后"}`
    : `in ${months} month${months === 1 ? "" : "s"}`;
}
