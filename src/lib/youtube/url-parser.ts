const VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;
const CHANNEL_ID = /^UC[a-zA-Z0-9_-]{22}$/;
const PLAYLIST_ID = /^(?:PL|UU|FL|LL|OL|RD)[a-zA-Z0-9_-]{10,}$/;
const HANDLE = /^[a-zA-Z0-9_.-]+$/;

function youtubeUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) return null;
    if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be', 'www.youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(url.hostname.toLowerCase())) return null;
    return url;
  } catch {
    return null;
  }
}

export function parseYouTubeUrl(
  input: string,
): { type: 'video'; id: string } | { type: 'channel'; id: string } | null {
  const trimmed = input.trim();
  if (VIDEO_ID.test(trimmed)) return { type: 'video', id: trimmed };
  if (CHANNEL_ID.test(trimmed)) return { type: 'channel', id: trimmed };
  if (/^@[a-zA-Z0-9_.-]+$/.test(trimmed)) return { type: 'channel', id: trimmed.slice(1) };

  const url = youtubeUrl(trimmed);
  if (!url) return null;
  const parts = url.pathname.split('/').filter(Boolean);
  const first = parts[0] ?? '';
  const second = parts[1] ?? '';
  const host = url.hostname.toLowerCase();
  if (host === 'youtu.be' || host === 'www.youtu.be') {
    return parts.length === 1 && VIDEO_ID.test(first) ? { type: 'video', id: first } : null;
  }
  if (host.includes('youtube-nocookie.com')) {
    return parts.length === 2 && first === 'embed' && VIDEO_ID.test(second)
      ? { type: 'video', id: second } : null;
  }
  if (parts.length === 1 && first === 'watch') {
    const id = url.searchParams.get('v');
    return id && VIDEO_ID.test(id) ? { type: 'video', id } : null;
  }
  if (parts.length === 2 && ['shorts', 'embed', 'live'].includes(first) && VIDEO_ID.test(second)) {
    return { type: 'video', id: second };
  }
  if (parts.length === 2 && first === 'channel' && CHANNEL_ID.test(second)) {
    return { type: 'channel', id: second };
  }
  if (parts.length === 1 && /^@[a-zA-Z0-9_.-]+$/.test(first)) {
    return { type: 'channel', id: first.slice(1) };
  }
  if (parts.length === 2 && ['c', 'user'].includes(first) && HANDLE.test(second)) {
    return { type: 'channel', id: second };
  }
  return null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return parseYouTubeUrl(url) !== null;
}

/** Extract a playlist ID from a trusted YouTube URL or accept a bare playlist ID. */
export function parseYouTubePlaylistId(input: string): string | null {
  const trimmed = input.trim();
  if (PLAYLIST_ID.test(trimmed)) return trimmed;
  const url = youtubeUrl(trimmed);
  if (!url || !['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com'].includes(url.hostname.toLowerCase())) return null;
  if (!['/playlist', '/watch'].includes(url.pathname)) return null;
  const id = url.searchParams.get('list');
  return id && PLAYLIST_ID.test(id) ? id : null;
}

export type YouTubeInspection = {
  type: 'video' | 'channel' | 'playlist';
  id: string;
  identifierKind: 'video ID' | 'channel ID' | 'handle' | 'custom name' | 'username' | 'playlist ID';
  normalizedUrl: string;
  playlistId?: string;
};

/** Pure local inspection. A parsed identifier does not verify that a resource exists. */
export function inspectYouTubeInput(input: string): YouTubeInspection | null {
  const trimmed = input.trim();
  const playlistId = parseYouTubePlaylistId(trimmed);
  const parsed = parseYouTubeUrl(trimmed);
  if (parsed?.type === 'video') {
    return {
      type: 'video', id: parsed.id, identifierKind: 'video ID',
      normalizedUrl: `https://www.youtube.com/watch?v=${parsed.id}`,
      ...(playlistId ? { playlistId } : {}),
    };
  }
  if (parsed?.type === 'channel') {
    const url = youtubeUrl(trimmed);
    const path = url?.pathname.split('/').filter(Boolean) ?? [];
    const identifierKind = path[0] === 'c' ? 'custom name'
      : path[0] === 'user' ? 'username'
      : trimmed.startsWith('@') || path[0]?.startsWith('@') ? 'handle'
      : CHANNEL_ID.test(parsed.id) ? 'channel ID' : 'handle';
    const segment = identifierKind === 'channel ID' ? `channel/${parsed.id}`
      : identifierKind === 'custom name' ? `c/${parsed.id}`
      : identifierKind === 'username' ? `user/${parsed.id}` : `@${parsed.id}`;
    return { type: 'channel', id: parsed.id, identifierKind, normalizedUrl: `https://www.youtube.com/${segment}` };
  }
  if (playlistId) {
    return { type: 'playlist', id: playlistId, identifierKind: 'playlist ID', normalizedUrl: `https://www.youtube.com/playlist?list=${playlistId}` };
  }
  return null;
}

/** Normalize channel URL, @handle, or channel ID to an API-ready identifier. */
export function normalizeChannelInput(input: string): string | null {
  const parsed = parseYouTubeUrl(input.trim());
  if (!parsed || parsed.type !== 'channel') return null;
  return parsed.id;
}
