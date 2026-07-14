export function parseYouTubeUrl(url: string): { type: 'video'; id: string } | { type: 'channel'; id: string } | null {
  const trimmed = url.trim();

  const patterns: { type: 'video' | 'channel'; regex: RegExp }[] = [
    { type: 'video', regex: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/ },
    { type: 'channel', regex: /youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/ },
    { type: 'channel', regex: /youtube\.com\/c\/([a-zA-Z0-9_-]+)/ },
    { type: 'channel', regex: /youtube\.com\/@([a-zA-Z0-9_.-]+)/ },
  ];

  for (const { type, regex } of patterns) {
    const match = trimmed.match(regex);
    if (match && match[1]) {
      return { type, id: match[1] } as { type: typeof type; id: string };
    }
  }

  return null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return parseYouTubeUrl(url) !== null;
}
