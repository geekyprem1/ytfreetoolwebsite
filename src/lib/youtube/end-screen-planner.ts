export const MIN_END_SCREEN_SECONDS = 5;
export const MAX_END_SCREEN_SECONDS = 20;
export const MIN_VIDEO_DURATION_FOR_END_SCREEN_SECONDS = 25;
export const MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS = 4;

export interface EndScreenWindow {
  videoIsEligible: boolean;
  endScreenSeconds: number;
  startsAtSeconds: number;
  endsAtSeconds: number;
}

export function getEndScreenWindow(
  videoDurationSeconds: number,
  requestedEndScreenSeconds: number,
): EndScreenWindow {
  const safeVideoDuration = Math.max(0, videoDurationSeconds);
  const endScreenSeconds = clamp(
    requestedEndScreenSeconds,
    MIN_END_SCREEN_SECONDS,
    MAX_END_SCREEN_SECONDS,
  );

  return {
    videoIsEligible: safeVideoDuration >= MIN_VIDEO_DURATION_FOR_END_SCREEN_SECONDS,
    endScreenSeconds,
    startsAtSeconds: Math.max(0, safeVideoDuration - endScreenSeconds),
    endsAtSeconds: safeVideoDuration,
  };
}

export function snapToGrid(value: number, step = 5): number {
  return clamp(Math.round(value / step) * step, 0, 100);
}

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function formatTimelineTime(totalSeconds: number): string {
  const roundedSeconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(roundedSeconds / 60);
  const seconds = roundedSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
