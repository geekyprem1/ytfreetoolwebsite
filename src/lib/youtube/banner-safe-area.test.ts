import { describe, expect, it } from 'vitest';
import {
  YOUTUBE_BANNER_MINIMUM,
  YOUTUBE_BANNER_RECOMMENDED,
  formatAspectRatio,
  getBannerDimensionStatus,
  getSafeAreaRect,
} from './banner-safe-area';

describe('getBannerDimensionStatus', () => {
  it('recognizes the recommended 16:9 banner dimensions', () => {
    const status = getBannerDimensionStatus(YOUTUBE_BANNER_RECOMMENDED.width, YOUTUBE_BANNER_RECOMMENDED.height);

    expect(status.is16By9).toBe(true);
    expect(status.meetsMinimum).toBe(true);
    expect(status.meetsRecommended).toBe(true);
  });

  it('recognizes the minimum dimensions but not the recommended size', () => {
    const status = getBannerDimensionStatus(YOUTUBE_BANNER_MINIMUM.width, YOUTUBE_BANNER_MINIMUM.height);

    expect(status.is16By9).toBe(true);
    expect(status.meetsMinimum).toBe(true);
    expect(status.meetsRecommended).toBe(false);
  });

  it('flags a square image as the wrong aspect ratio', () => {
    const status = getBannerDimensionStatus(2000, 2000);

    expect(status.is16By9).toBe(false);
  });
});

describe('getSafeAreaRect', () => {
  it('centers the official minimum safe area on the full banner', () => {
    const rect = getSafeAreaRect(2560, 1440);

    expect(rect.x).toBeCloseTo(508.125);
    expect(rect.y).toBeCloseTo(508.75);
    expect(rect.width).toBeCloseTo(1543.75);
    expect(rect.height).toBeCloseTo(422.5);
  });
});

describe('formatAspectRatio', () => {
  it('formats common banner dimensions', () => {
    expect(formatAspectRatio(2560, 1440)).toBe('16:9');
    expect(formatAspectRatio(2048, 1152)).toBe('16:9');
  });
});
