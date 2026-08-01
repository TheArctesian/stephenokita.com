import { PROTON_CALENDAR_URL } from '$env/static/private';

export interface CalendarEvent {
  uid: string;
  summary: string;
  location: string | null;
  description: string | null;
  start: number;
  end: number | null;
  allDay: boolean;
  tentative: boolean;
}

interface CacheEntry {
  events: CalendarEvent[];
  fetchedAt: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const UPCOMING_WINDOW_MS = 365 * 24 * 60 * 60 * 1000;
const MAX_EVENTS = 50;

let cache: CacheEntry | null = null;

function unfoldLines(raw: string): string[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  for (const line of lines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && out.length > 0) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

function unescapeText(value: string): string {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

function parseIcsDate(value: string, isDateOnly: boolean): number | null {
  if (isDateOnly) {
    const m = value.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (!m) return null;
    return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!m) return null;
  const [_, y, mo, d, h, mi, s, z] = m;
  if (z === 'Z') {
    return Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s));
  }
  return new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s)).getTime();
}

function parseEvents(ics: string): CalendarEvent[] {
  const lines = unfoldLines(ics);
  const events: CalendarEvent[] = [];
  let current: Partial<CalendarEvent> & { _startIsDate?: boolean } | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = {};
      continue;
    }
    if (line === 'END:VEVENT') {
      if (current && current.start != null && current.summary) {
        const rawSummary = current.summary;
        const tentative = rawSummary.includes('?');
        events.push({
          uid: current.uid ?? '',
          summary: tentative ? rawSummary.replace(/\s*\?+\s*/g, ' ').trim() : rawSummary,
          location: current.location ?? null,
          description: current.description ?? null,
          start: current.start,
          end: current.end ?? null,
          allDay: current._startIsDate ?? false,
          tentative,
        });
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const rawKey = line.slice(0, colon);
    const value = line.slice(colon + 1);
    const [name, ...paramParts] = rawKey.split(';');
    const params = Object.fromEntries(
      paramParts.map((p) => {
        const [k, v] = p.split('=');
        return [k.toUpperCase(), v ?? ''];
      })
    );

    switch (name.toUpperCase()) {
      case 'UID':
        current.uid = value;
        break;
      case 'SUMMARY':
        current.summary = unescapeText(value);
        break;
      case 'LOCATION':
        current.location = unescapeText(value) || null;
        break;
      case 'DESCRIPTION':
        current.description = unescapeText(value) || null;
        break;
      case 'DTSTART': {
        const isDate = params.VALUE === 'DATE';
        const ts = parseIcsDate(value, isDate);
        if (ts != null) {
          current.start = ts;
          current._startIsDate = isDate;
        }
        break;
      }
      case 'DTEND': {
        const isDate = params.VALUE === 'DATE';
        const ts = parseIcsDate(value, isDate);
        if (ts != null) current.end = ts;
        break;
      }
    }
  }

  return events;
}

export class CalendarService {
  static async getUpcomingEvents(): Promise<CalendarEvent[]> {
    return CalendarService.filterUpcoming(await CalendarService.loadEvents());
  }

  static async getPastEvents(): Promise<CalendarEvent[]> {
    return CalendarService.filterPast(await CalendarService.loadEvents());
  }

  /** Fetch (or reuse cached) parsed calendar events; never throws. */
  private static async loadEvents(): Promise<CalendarEvent[]> {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return cache.events;
    }

    if (!PROTON_CALENDAR_URL) return cache?.events ?? [];

    try {
      const response = await fetch(PROTON_CALENDAR_URL);
      if (!response.ok) {
        throw new Error(`Proton calendar responded ${response.status}`);
      }
      const ics = await response.text();
      const events = parseEvents(ics);
      cache = { events, fetchedAt: Date.now() };
      return events;
    } catch (error) {
      console.error('CalendarService error:', error);
      return cache?.events ?? [];
    }
  }

  private static effectiveEnd(event: CalendarEvent): number {
    return event.end ?? event.start + (event.allDay ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000);
  }

  private static filterUpcoming(events: CalendarEvent[]): CalendarEvent[] {
    const now = Date.now();
    const horizon = now + UPCOMING_WINDOW_MS;
    return events
      .filter((event) => CalendarService.effectiveEnd(event) >= now && event.start <= horizon)
      .sort((a, b) => a.start - b.start)
      .slice(0, MAX_EVENTS);
  }

  /** Events already finished, most recent first, bounded to the same window. */
  private static filterPast(events: CalendarEvent[]): CalendarEvent[] {
    const now = Date.now();
    const horizon = now - UPCOMING_WINDOW_MS;
    return events
      .filter((event) => CalendarService.effectiveEnd(event) < now && event.start >= horizon)
      .sort((a, b) => b.start - a.start)
      .slice(0, MAX_EVENTS);
  }
}
