import { describe, expect, it } from 'vitest';
import { addTempoTap, bpmFromTaps } from './tap-tempo';

describe('tap tempo', () => {
  it('estimates a regular beat and resets after a pause', () => {
    let taps: number[] = [];
    for (const time of [0, 500, 1000, 1500]) taps = addTempoTap(taps, time);
    expect(bpmFromTaps(taps)).toBe(120);
    expect(addTempoTap(taps, 4001)).toEqual([4001]);
  });
});
