import { describe, expect, it } from 'vitest';
import {
  formatAspectRatio,
  formatVideoDuration,
  getShortsEligibility,
} from './shorts-eligibility';

describe('getShortsEligibility', () => {
  it('recognizes a 9:16 vertical video at the three-minute boundary as a Short', () => {
    const result = getShortsEligibility(
      { width: 1080, height: 1920, durationSeconds: 180 },
      'standard',
    );

    expect(result.likelyShort).toBe(true);
    expect(result.orientation).toBe('vertical');
    expect(result.aspectRatio).toBeCloseTo(9 / 16);
  });

  it('recognizes a square 1:1 video as a Short when it is within the duration limit', () => {
    const result = getShortsEligibility(
      { width: 1080, height: 1080, durationSeconds: 179.9 },
      'standard',
    );

    expect(result.likelyShort).toBe(true);
    expect(result.orientation).toBe('square');
  });

  it('recognizes a 4:5 vertical video as a Short', () => {
    const result = getShortsEligibility(
      { width: 1080, height: 1350, durationSeconds: 60 },
      'official-artist',
    );

    expect(result.likelyShort).toBe(true);
    expect(result.isSquareOrVertical).toBe(true);
  });

  it('flags a vertical video over three minutes as long-form', () => {
    const result = getShortsEligibility(
      { width: 1080, height: 1920, durationSeconds: 180.1 },
      'standard',
    );

    expect(result.likelyShort).toBe(false);
    expect(result.isWithinDurationLimit).toBe(false);
  });

  it('flags a 16:9 video as long-form even when it is short', () => {
    const result = getShortsEligibility(
      { width: 1920, height: 1080, durationSeconds: 30 },
      'standard',
    );

    expect(result.likelyShort).toBe(false);
    expect(result.isSquareOrVertical).toBe(false);
  });
});

describe('video formatters', () => {
  it('formats duration and common aspect ratios for display', () => {
    expect(formatVideoDuration(180)).toBe('3:00');
    expect(formatAspectRatio(1080, 1920)).toBe('9:16');
    expect(formatAspectRatio(1920, 1080)).toBe('16:9');
  });
});
