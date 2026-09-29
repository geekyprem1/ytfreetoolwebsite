/** Keep the last eight regular intervals. A pause starts a new series. */
export function addTempoTap(taps: number[], now: number): number[] {
  const last = taps.at(-1);
  if (last === undefined || now <= last || now - last > 2000) return [now];
  return [...taps.slice(-8), now];
}

export function bpmFromTaps(taps: number[]): number | null {
  if (taps.length < 2) return null;
  const intervals = taps.slice(1).map((tap, index) => tap - (taps[index] ?? tap));
  const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
  return Math.round(60_000 / average);
}
