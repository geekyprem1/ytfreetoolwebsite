import { describe, expect, it } from 'vitest';
import {
  calculateRequiredUploadSpeed,
  calculateUploadTime,
  bytesToSize,
  formatDuration,
  sizeToBytes,
} from './upload-time';

describe('upload-time conversions', () => {
  it('converts decimal file-size units to bytes and back', () => {
    expect(sizeToBytes(10, 'GB')).toBe(10_000_000_000);
    expect(sizeToBytes(500, 'MB')).toBe(500_000_000);
    expect(bytesToSize(1_000_000_000, 'GB')).toBe(1);
  });
});

describe('calculateUploadTime', () => {
  it('uses bits per second for the ideal transfer time and efficiency for practical time', () => {
    const result = calculateUploadTime(1_000_000_000, 100, 80);

    expect(result?.idealSeconds).toBeCloseTo(80);
    expect(result?.practicalSeconds).toBeCloseTo(100);
    expect(result?.practicalRangeSeconds.minimum).toBeCloseTo(88.8889, 3);
    expect(result?.practicalRangeSeconds.maximum).toBeCloseTo(114.2857, 3);
  });

  it('returns null when size or speed is missing', () => {
    expect(calculateUploadTime(0, 25, 80)).toBeNull();
    expect(calculateUploadTime(1_000_000, 0, 80)).toBeNull();
  });
});

describe('calculateRequiredUploadSpeed', () => {
  it('calculates the Mbps needed to finish within a target time', () => {
    const speed = calculateRequiredUploadSpeed(1_000_000_000, 100, 80);

    expect(speed).toBeCloseTo(100);
  });
});

describe('formatDuration', () => {
  it('formats seconds into a readable transfer duration', () => {
    expect(formatDuration(9)).toBe('9s');
    expect(formatDuration(65)).toBe('1m 5s');
    expect(formatDuration(3661)).toBe('1h 1m 1s');
  });
});
