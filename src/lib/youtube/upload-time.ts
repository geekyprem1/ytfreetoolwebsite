export type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB';

export const FILE_SIZE_MULTIPLIERS: Record<FileSizeUnit, number> = {
  B: 1,
  KB: 1_000,
  MB: 1_000_000,
  GB: 1_000_000_000,
};

export interface UploadTimeEstimate {
  fileSizeBytes: number;
  uploadSpeedMbps: number;
  efficiencyPercent: number;
  idealSeconds: number;
  practicalSeconds: number;
  practicalRangeSeconds: { minimum: number; maximum: number };
}

export function sizeToBytes(value: number, unit: FileSizeUnit): number {
  return Math.max(0, value) * FILE_SIZE_MULTIPLIERS[unit];
}

export function bytesToSize(bytes: number, unit: FileSizeUnit): number {
  return Math.max(0, bytes) / FILE_SIZE_MULTIPLIERS[unit];
}

export function calculateUploadTime(
  fileSizeBytes: number,
  uploadSpeedMbps: number,
  efficiencyPercent: number,
): UploadTimeEstimate | null {
  if (fileSizeBytes <= 0 || uploadSpeedMbps <= 0) return null;

  const safeEfficiency = clamp(efficiencyPercent, 1, 100);
  const idealSeconds = (fileSizeBytes * 8) / (uploadSpeedMbps * 1_000_000);
  const practicalSeconds = idealSeconds / (safeEfficiency / 100);

  return {
    fileSizeBytes,
    uploadSpeedMbps,
    efficiencyPercent: safeEfficiency,
    idealSeconds,
    practicalSeconds,
    practicalRangeSeconds: {
      minimum: idealSeconds / 0.9,
      maximum: idealSeconds / 0.7,
    },
  };
}

export function calculateRequiredUploadSpeed(
  fileSizeBytes: number,
  targetSeconds: number,
  efficiencyPercent: number,
): number | null {
  if (fileSizeBytes <= 0 || targetSeconds <= 0) return null;

  const safeEfficiency = clamp(efficiencyPercent, 1, 100) / 100;
  return (fileSizeBytes * 8) / (targetSeconds * 1_000_000 * safeEfficiency);
}

export function formatDuration(totalSeconds: number): string {
  const roundedSeconds = Math.max(0, Math.ceil(totalSeconds));
  const hours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.floor((roundedSeconds % 3600) / 60);
  const seconds = roundedSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}
