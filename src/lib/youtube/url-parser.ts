export function parseYouTubeUrl(
  url: string,
): { type: 'video'; id: string } | { type: 'channel'; id: string } | null {
  const trimmed = url.trim();

  // Bare channel ID (UC…)
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(trimmed)) {
    return { type: 'channel', id: trimmed };
  }

  // Bare @handle
  if (/^@[a-zA-Z0-9_.-]+$/.test(trimmed)) {
    return { type: 'channel', id: trimmed.slice(1) };
  }

  const patterns: { type: 'video' | 'channel'; regex: RegExp }[] = [
    {
      type: 'video',
      regex:
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    },
    { type: 'channel', regex: /youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/ },
    { type: 'channel', regex: /youtube\.com\/c\/([a-zA-Z0-9_-]+)/ },
    { type: 'channel', regex: /youtube\.com\/user\/([a-zA-Z0-9_-]+)/ },
    { type: 'channel', regex: /youtube\.com\/@([a-zA-Z0-9_.-]+)/ },
  ];

  for (const { type, regex } of patterns) {
    const match = trimmed.match(regex);
    if (match?.[1]) {
      return { type, id: match[1] };
    }
  }

  return null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return parseYouTubeUrl(url) !== null;
}

/** Normalize channel URL, @handle, or channel ID to an API-ready identifier. */
export function normalizeChannelInput(input: string): string | null {
  const parsed = parseYouTubeUrl(input.trim());
  if (!parsed || parsed.type !== 'channel') return null;
  return parsed.id.replace(/^@/, '');
}
