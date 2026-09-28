/** Channel age and rate helpers (pure; UTC-based so results match everywhere). */

export interface ChannelAge {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  /** "3 years, 2 months, 5 days" */
  label: string;
}

const DAY_MS = 86_400_000;

function addMonthsUTC(d: Date, n: number): Date {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const lastDay = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(
    Date.UTC(y, m, Math.min(d.getUTCDate(), lastDay), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()),
  );
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

/** Calendar difference between `publishedAt` and `now` (UTC). Returns null for invalid/future dates. */
export function computeChannelAge(publishedAt: string, now: Date = new Date()): ChannelAge | null {
  const start = new Date(publishedAt);
  if (Number.isNaN(start.getTime()) || start.getTime() > now.getTime()) return null;

  // Whole months elapsed: step forward from `start`, clamping to month end
  // (so 31 Jan + 1 month = 28/29 Feb), until the next step would pass `now`.
  let totalMonths =
    (now.getUTCFullYear() - start.getUTCFullYear()) * 12 + (now.getUTCMonth() - start.getUTCMonth());
  while (totalMonths > 0 && addMonthsUTC(start, totalMonths).getTime() > now.getTime()) totalMonths--;

  const anchor = addMonthsUTC(start, totalMonths);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const days = Math.floor((now.getTime() - anchor.getTime()) / DAY_MS);

  const totalDays = Math.floor((now.getTime() - start.getTime()) / DAY_MS);
  const parts = [
    years ? plural(years, 'year') : '',
    months ? plural(months, 'month') : '',
    days || (!years && !months) ? plural(days, 'day') : '',
  ].filter(Boolean);

  return { years, months, days, totalDays, label: parts.join(', ') };
}

/** Average per year, guarding very young channels (min 1 day). */
export function perYear(total: number, totalDays: number): number {
  return (total / Math.max(1, totalDays)) * 365.25;
}

/** Average per day. */
export function perDay(total: number, totalDays: number): number {
  return total / Math.max(1, totalDays);
}

/** "Monday, 23 April 2005" (UTC). */
export function formatCreationDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
