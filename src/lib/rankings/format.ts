/** Pure display helpers for ranking pages (safe for server and client). */

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const full = new Intl.NumberFormat('en-US');

/** 331000000 → "331M", 23600000 → "23.6M", 1240000000 → "1.2B". */
export function formatCompact(n: number): string {
  return compact.format(n);
}

/** 331000000 → "331,000,000". */
export function formatFull(n: number): string {
  return full.format(n);
}

/** For prose: 331,000,000 → "331 million", 23,600,000 → "23.6 million", 1.24e9 → "1.24 billion". */
export function formatCountWords(n: number): string {
  if (n >= 1e9) return `${+(n / 1e9).toFixed(2)} billion`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(n >= 1e8 ? 0 : 1)} million`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(1)} thousand`;
  return full.format(n);
}

/** "28 September 2026" (UTC). Empty input means "now". */
export function formatRankingDate(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Year used in titles, e.g. "(2026)". Derived at render so ISR keeps it current. */
export function rankingYear(iso?: string): number {
  return (iso ? new Date(iso) : new Date()).getUTCFullYear();
}

/** 1.234 → "+1.23%", 0.04 → "+0.04%". */
export function formatPercent(p: number): string {
  return `+${p >= 10 ? p.toFixed(1) : p.toFixed(2)}%`;
}
