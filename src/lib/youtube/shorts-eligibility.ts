export const MAX_YOUTUBE_SHORT_DURATION_SECONDS = 3 * 60;

export type YouTubeChannelType = 'standard' | 'official-artist';

export interface LocalVideoMetadata {
  durationSeconds: number;
  width: number;
  height: number;
}

export interface ShortsEligibilityResult {
  isSquareOrVertical: boolean;
  isWithinDurationLimit: boolean;
  likelyShort: boolean;
  aspectRatio: number;
  orientation: 'vertical' | 'square' | 'horizontal';
  reason: string;
}

export function getShortsEligibility(
  metadata: LocalVideoMetadata,
  channelType: YouTubeChannelType,
): ShortsEligibilityResult {
  const isSquareOrVertical = metadata.width <= metadata.height;
  const isWithinDurationLimit = metadata.durationSeconds <= MAX_YOUTUBE_SHORT_DURATION_SECONDS;
  const likelyShort = isSquareOrVertical && isWithinDurationLimit;
  const orientation =
    metadata.width === metadata.height
      ? 'square'
      : metadata.width < metadata.height
        ? 'vertical'
        : 'horizontal';
  const aspectRatio = metadata.width / metadata.height;

  const channelLabel = channelType === 'official-artist' ? 'Official Artist Channel' : 'standard channel';
  let reason: string;

  if (likelyShort) {
    reason = `This ${orientation} video is within YouTube's three-minute limit. Under the current ${channelLabel} rule, a new upload with these dimensions is likely to be categorized as a Short.`;
  } else if (!isSquareOrVertical && !isWithinDurationLimit) {
    reason = 'This video is wider than it is tall and longer than three minutes, so it is likely to remain long-form under YouTube\'s current Shorts rule.';
  } else if (!isSquareOrVertical) {
    reason = 'This video is wider than it is tall. YouTube says using a wider ratio such as 16:9 keeps content long-form rather than categorizing it as a Short.';
  } else {
    reason = 'This video is square or vertical, but it is over YouTube\'s three-minute Shorts limit. It is likely to remain long-form.';
  }

  return {
    isSquareOrVertical,
    isWithinDurationLimit,
    likelyShort,
    aspectRatio,
    orientation,
    reason,
  };
}

export function formatVideoDuration(totalSeconds: number): string {
  const wholeSeconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(wholeSeconds / 60);
  const seconds = wholeSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatAspectRatio(width: number, height: number): string {
  if (!width || !height) return 'Unknown';

  const divisor = greatestCommonDivisor(width, height);
  return `${width / divisor}:${height / divisor}`;
}

function greatestCommonDivisor(first: number, second: number): number {
  let a = Math.abs(Math.round(first));
  let b = Math.abs(Math.round(second));

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a || 1;
}
