import { describe, expect, it } from 'vitest';
import { analyzeThumbnailText, contrastGuidance, estimateContrastRatio } from './thumbnail-readability';

describe('thumbnail readability helpers', () => {
  it('keeps thumbnail copy short without making CTR claims', () => {
    expect(analyzeThumbnailText('Grow on YouTube')).toMatchObject({ wordCount: 3, characterCount: 15 });
    expect(analyzeThumbnailText('one two three four five').wordGuidance).toContain('1–4');
  });

  it('estimates contrast from normalized average luminance', () => {
    expect(estimateContrastRatio(0.1, 'light')).toBeCloseTo(7, 1);
    expect(contrastGuidance(0.9, 'light')).toContain('dark text');
  });
});
