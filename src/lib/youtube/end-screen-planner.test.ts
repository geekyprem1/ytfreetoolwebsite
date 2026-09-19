import { describe, expect, it } from 'vitest';
import {
  MAX_END_SCREEN_SECONDS,
  MIN_END_SCREEN_SECONDS,
  getEndScreenWindow,
  snapToGrid,
} from './end-screen-planner';

describe('getEndScreenWindow', () => {
  it('uses the five-second lower bound and recognizes a 25-second video', () => {
    const window = getEndScreenWindow(25, 1);

    expect(window.videoIsEligible).toBe(true);
    expect(window.endScreenSeconds).toBe(MIN_END_SCREEN_SECONDS);
    expect(window.startsAtSeconds).toBe(20);
    expect(window.endsAtSeconds).toBe(25);
  });

  it('uses the twenty-second upper bound for longer videos', () => {
    const window = getEndScreenWindow(120, 45);

    expect(window.endScreenSeconds).toBe(MAX_END_SCREEN_SECONDS);
    expect(window.startsAtSeconds).toBe(100);
  });

  it('flags videos under 25 seconds as ineligible', () => {
    const window = getEndScreenWindow(24.9, 20);

    expect(window.videoIsEligible).toBe(false);
    expect(window.startsAtSeconds).toBeCloseTo(4.9);
  });
});

describe('snapToGrid', () => {
  it('rounds positions to a five-percent grid and keeps them bounded', () => {
    expect(snapToGrid(12)).toBe(10);
    expect(snapToGrid(13)).toBe(15);
    expect(snapToGrid(-5)).toBe(0);
    expect(snapToGrid(104)).toBe(100);
  });
});
