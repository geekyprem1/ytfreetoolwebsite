export const YOUTUBE_BANNER_RECOMMENDED = { width: 2560, height: 1440 } as const;
export const YOUTUBE_BANNER_MINIMUM = { width: 2048, height: 1152 } as const;
export const YOUTUBE_BANNER_SAFE_AREA_AT_MINIMUM = { width: 1235, height: 338 } as const;

export interface BannerDimensionStatus {
  is16By9: boolean;
  meetsMinimum: boolean;
  meetsRecommended: boolean;
  width: number;
  height: number;
  aspectRatio: number;
}

export interface BannerCropWindow {
  label: 'TV' | 'Desktop' | 'Tablet' | 'Mobile';
  width: number;
  height: number;
  x: number;
  y: number;
}

export const BANNER_CROP_WINDOWS: BannerCropWindow[] = [
  { label: 'TV', width: 1, height: 1, x: 0, y: 0 },
  { label: 'Desktop', width: 1, height: 0.29375, x: 0, y: 0.353125 },
  { label: 'Tablet', width: 0.724609375, height: 0.29375, x: 0.1376953125, y: 0.353125 },
  { label: 'Mobile', width: 0.603515625, height: 0.29375, x: 0.1982421875, y: 0.353125 },
];

export function getBannerDimensionStatus(width: number, height: number): BannerDimensionStatus {
  const safeWidth = Math.max(0, width);
  const safeHeight = Math.max(0, height);
  const aspectRatio = safeHeight ? safeWidth / safeHeight : 0;

  return {
    is16By9: safeHeight > 0 && Math.abs(aspectRatio - 16 / 9) < 0.01,
    meetsMinimum: safeWidth >= YOUTUBE_BANNER_MINIMUM.width && safeHeight >= YOUTUBE_BANNER_MINIMUM.height,
    meetsRecommended: safeWidth >= YOUTUBE_BANNER_RECOMMENDED.width && safeHeight >= YOUTUBE_BANNER_RECOMMENDED.height,
    width: safeWidth,
    height: safeHeight,
    aspectRatio,
  };
}

export function getSafeAreaRect(width = 1, height = 1) {
  const safeWidth = YOUTUBE_BANNER_SAFE_AREA_AT_MINIMUM.width / YOUTUBE_BANNER_MINIMUM.width;
  const safeHeight = YOUTUBE_BANNER_SAFE_AREA_AT_MINIMUM.height / YOUTUBE_BANNER_MINIMUM.height;

  return {
    x: ((1 - safeWidth) / 2) * width,
    y: ((1 - safeHeight) / 2) * height,
    width: safeWidth * width,
    height: safeHeight * height,
  };
}

export function formatAspectRatio(width: number, height: number): string {
  if (!width || !height) return 'Unknown';
  const divisor = greatestCommonDivisor(width, height);
  return `${width / divisor}:${height / divisor}`;
}

function greatestCommonDivisor(first: number, second: number): number {
  let a = Math.abs(Math.round(first));
  let b = Math.abs(Math.round(second));

  while (b !== 0) [a, b] = [b, a % b];
  return a || 1;
}
