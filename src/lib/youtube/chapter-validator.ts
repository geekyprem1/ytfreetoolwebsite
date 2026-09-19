export const MIN_CHAPTER_SECONDS = 10;
export const MIN_CHAPTER_COUNT = 3;

export type ChapterIssueCode =
  | 'malformed'
  | 'missing-title'
  | 'missing-first-zero'
  | 'too-few'
  | 'duplicate'
  | 'out-of-order'
  | 'too-short'
  | 'after-video';

export interface ParsedChapter {
  lineNumber: number;
  timestampSeconds: number;
  title: string;
  raw: string;
}

export interface ChapterIssue {
  code: ChapterIssueCode;
  lineNumber?: number;
  message: string;
}

export interface ChapterValidationResult {
  chapters: ParsedChapter[];
  issues: ChapterIssue[];
  cleanedText: string;
  isValid: boolean;
}

export function parseTimestamp(value: string): number | null {
  const parts = value.trim().split(':');
  if (parts.length === 2) {
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    if (Number.isInteger(minutes) && Number.isInteger(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
      return minutes * 60 + seconds;
    }
  }

  if (parts.length === 3) {
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    const seconds = Number(parts[2]);
    if (Number.isInteger(hours) && Number.isInteger(minutes) && Number.isInteger(seconds) && hours >= 0 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      return hours * 3600 + minutes * 60 + seconds;
    }
  }

  return null;
}

export function formatTimestamp(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function validateChapters(text: string, videoDurationSeconds?: number): ChapterValidationResult {
  const chapters: ParsedChapter[] = [];
  const issues: ChapterIssue[] = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (!line.trim()) return;

    const match = line.trim().match(/^(\d{1,3}(?::\d{1,2})?:\d{2})(?:\s+(.+?))?\s*$/);
    if (!match) {
      issues.push({ code: 'malformed', lineNumber: index + 1, message: `Line ${index + 1}: use MM:SS or HH:MM:SS followed by a title.` });
      return;
    }

    const timestampSeconds = parseTimestamp(match[1] ?? '');
    const title = match[2]?.trim() ?? '';
    if (timestampSeconds === null) {
      issues.push({ code: 'malformed', lineNumber: index + 1, message: `Line ${index + 1}: the timestamp is not valid.` });
      return;
    }

    chapters.push({ lineNumber: index + 1, timestampSeconds, title, raw: line });
    if (!title) issues.push({ code: 'missing-title', lineNumber: index + 1, message: `Line ${index + 1}: add a chapter title after the timestamp.` });
  });

  if (chapters.length < MIN_CHAPTER_COUNT) {
    issues.push({ code: 'too-few', message: `Add at least ${MIN_CHAPTER_COUNT} valid timestamps for YouTube chapters.` });
  }

  const firstChapter = chapters[0];
  if (firstChapter && firstChapter.timestampSeconds !== 0) {
    issues.push({ code: 'missing-first-zero', lineNumber: firstChapter.lineNumber, message: `Line ${firstChapter.lineNumber}: the first timestamp must start at 00:00.` });
  }

  chapters.forEach((chapter, index) => {
    const previous = chapters[index - 1];
    if (!previous) return;

    const gap = chapter.timestampSeconds - previous.timestampSeconds;
    if (gap === 0) {
      issues.push({ code: 'duplicate', lineNumber: chapter.lineNumber, message: `Line ${chapter.lineNumber}: duplicate timestamp ${formatTimestamp(chapter.timestampSeconds)}.` });
    } else if (gap < 0) {
      issues.push({ code: 'out-of-order', lineNumber: chapter.lineNumber, message: `Line ${chapter.lineNumber}: timestamps must be in ascending order.` });
    } else if (gap < MIN_CHAPTER_SECONDS) {
      issues.push({ code: 'too-short', lineNumber: chapter.lineNumber, message: `Line ${chapter.lineNumber}: this chapter is only ${gap} seconds long; use at least ${MIN_CHAPTER_SECONDS} seconds.` });
    }
  });

  const hasVideoDuration = Number.isFinite(videoDurationSeconds) && (videoDurationSeconds ?? 0) > 0;
  if (hasVideoDuration) {
    const duration = videoDurationSeconds as number;
    chapters.forEach((chapter) => {
      if (chapter.timestampSeconds >= duration) {
        issues.push({ code: 'after-video', lineNumber: chapter.lineNumber, message: `Line ${chapter.lineNumber}: ${formatTimestamp(chapter.timestampSeconds)} is at or after the ${formatTimestamp(duration)} video end.` });
      }
    });

    const finalChapter = chapters[chapters.length - 1];
    if (finalChapter && duration - finalChapter.timestampSeconds < MIN_CHAPTER_SECONDS) {
      issues.push({ code: 'too-short', lineNumber: finalChapter.lineNumber, message: `The final chapter is only ${Math.max(0, duration - finalChapter.timestampSeconds)} seconds long; use at least ${MIN_CHAPTER_SECONDS} seconds.` });
    }
  }

  const cleanedText = chapters
    .filter((chapter) => chapter.title)
    .map((chapter) => `${formatTimestamp(chapter.timestampSeconds)} ${chapter.title}`)
    .join('\n');

  return { chapters, issues, cleanedText, isValid: issues.length === 0 };
}
