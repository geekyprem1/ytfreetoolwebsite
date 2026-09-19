export type ThumbnailTextColor = 'light' | 'dark';

export function analyzeThumbnailText(text: string) {
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  return {
    wordCount,
    characterCount: trimmed.length,
    wordGuidance:
      wordCount === 0
        ? 'Add the text used on the thumbnail.'
        : wordCount <= 4
          ? 'Good: short enough to scan on mobile.'
          : 'Consider cutting to 1–4 strong words for mobile legibility.',
  };
}

export function estimateContrastRatio(averageLuminance: number, textColor: ThumbnailTextColor): number {
  const background = Math.min(Math.max(averageLuminance, 0), 1);
  const foreground = textColor === 'light' ? 1 : 0;
  const lighter = Math.max(background, foreground);
  const darker = Math.min(background, foreground);
  return (lighter + 0.05) / (darker + 0.05);
}

export function contrastGuidance(averageLuminance: number, textColor: ThumbnailTextColor): string {
  const ratio = estimateContrastRatio(averageLuminance, textColor);
  if (ratio >= 4.5) return 'Estimated contrast is strong; still check the thumbnail at a small mobile size.';
  return `Estimated contrast is ${ratio.toFixed(1)}:1. Try ${textColor === 'light' ? 'dark' : 'light'} text, a solid outline, or a darker/lighter background.`;
}
