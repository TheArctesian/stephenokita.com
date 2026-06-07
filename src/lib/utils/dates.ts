/**
 * Date / time formatting helpers for the home page activity feed and
 * the upcoming-events ("Where I'll be") list. Pure, typed functions
 * extracted from the page so the markup stays presentational.
 */

export interface CalendarEvent {
  uid?: string;
  summary: string;
  location?: string;
  start: number;
  end?: number;
  allDay?: boolean;
  tentative?: boolean;
}

/** "Jun 6, 2026" style date from an ISO string / timestamp. */
export function formatDate(dateStr: string | number | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Coarse "x mins/hours/days ago" relative to now. */
export function formatRelative(timestamp: number | null | undefined): string {
  if (!timestamp) return "";
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSec < 60) return "just now";
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/** "Jun 6" or "Jun 6, 3:00 PM" depending on `allDay`. */
export function formatEventDate(
  start: number | null | undefined,
  allDay?: boolean,
): string {
  if (!start) return "";
  const d = new Date(start);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(allDay ? {} : { hour: "numeric", minute: "2-digit" }),
  });
}

/** Renders an event's start (– end) range, collapsing same-day ranges. */
export function formatEventRange(event: CalendarEvent | null | undefined): string {
  if (!event?.start) return "";
  const start = new Date(event.start);
  const startStr = formatEventDate(event.start, event.allDay);
  if (!event.end) return startStr;
  const end = new Date(event.end);
  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();
  if (sameDay && !event.allDay) {
    return `${startStr} – ${end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }
  const endStr = event.allDay
    ? new Date(event.end - 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : formatEventDate(event.end, false);
  return `${startStr} – ${endStr}`;
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

/** Human countdown: "now" / "today" / "tomorrow" / "in N days/weeks/months". */
export function eventCountdown(start: number | null | undefined): string {
  if (!start) return "";
  const diffMs = start - Date.now();
  if (diffMs <= 0) return "now";
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 7) return `in ${days} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `in ${weeks} week${weeks === 1 ? "" : "s"}`;
  }
  const months = Math.round(days / 30);
  return `in ${months} month${months === 1 ? "" : "s"}`;
}
