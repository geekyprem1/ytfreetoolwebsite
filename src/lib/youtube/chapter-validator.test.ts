import { describe, expect, it } from 'vitest';
import { formatTimestamp, parseTimestamp, validateChapters } from './chapter-validator';

describe('timestamp parsing', () => {
  it('parses MM:SS and HH:MM:SS formats', () => {
    expect(parseTimestamp('01:05')).toBe(65);
    expect(parseTimestamp('01:02:03')).toBe(3723);
    expect(parseTimestamp('1:60')).toBeNull();
  });

  it('formats hours only when needed', () => {
    expect(formatTimestamp(65)).toBe('1:05');
    expect(formatTimestamp(3723)).toBe('01:02:03');
  });
});

describe('validateChapters', () => {
  it('accepts three ascending chapters with ten-second spacing', () => {
    const result = validateChapters('00:00 Intro\n00:10 Setup\n00:20 Demo', 30);

    expect(result.isValid).toBe(true);
    expect(result.cleanedText).toBe('0:00 Intro\n0:10 Setup\n0:20 Demo');
  });

  it('reports missing zero, too few chapters, malformed lines, and missing titles', () => {
    const result = validateChapters('0:05\nbad line');

    expect(result.isValid).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'missing-first-zero')).toBe(true);
    expect(result.issues.some((issue) => issue.code === 'too-few')).toBe(true);
    expect(result.issues.some((issue) => issue.code === 'missing-title')).toBe(true);
    expect(result.issues.some((issue) => issue.code === 'malformed')).toBe(true);
  });

  it('reports duplicates, out-of-order timestamps, and short gaps', () => {
    const result = validateChapters('0:00 Intro\n0:10 Setup\n0:10 Duplicate\n0:05 Backtrack\n0:14 Too soon');

    expect(result.issues.some((issue) => issue.code === 'duplicate')).toBe(true);
    expect(result.issues.some((issue) => issue.code === 'out-of-order')).toBe(true);
    expect(result.issues.some((issue) => issue.code === 'too-short')).toBe(true);
  });

  it('checks the final chapter against a supplied video length', () => {
    const result = validateChapters('0:00 Intro\n0:10 Setup\n0:25 Demo', 30);

    expect(result.issues.some((issue) => issue.code === 'too-short')).toBe(true);
  });
});
