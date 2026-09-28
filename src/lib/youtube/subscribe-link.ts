/**
 * Subscribe-link builder (pure; runs in the browser, no API calls).
 *
 * Appending `?sub_confirmation=1` to a channel URL makes YouTube open a
 * "Subscribe to …?" confirmation for signed-in visitors.
 */

export type ChannelRef =
  | { kind: 'handle'; value: string }
  | { kind: 'id'; value: string }
  | { kind: 'custom'; value: string }
  | { kind: 'user'; value: string };

const HANDLE_RE = /^[\p{L}\p{N}._-]{3,30}$/u;
const ID_RE = /^UC[a-zA-Z0-9_-]{22}$/;

/** Accepts @handle, bare handle, UC… ID, or any youtube.com channel URL. */
export function parseChannelRef(raw: string): ChannelRef | null {
  const input = raw.trim();
  if (!input) return null;

  if (ID_RE.test(input)) return { kind: 'id', value: input };

  // URL forms (with or without protocol / www / m.)
  const urlMatch = input.match(
    /^(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/(@[^/?#\s]+|channel\/[^/?#\s]+|c\/[^/?#\s]+|user\/[^/?#\s]+)/i,
  );
  if (urlMatch) {
    const path = decodeURIComponent(urlMatch[1]!);
    if (path.startsWith('@')) {
      const h = path.slice(1);
      return HANDLE_RE.test(h) ? { kind: 'handle', value: h } : null;
    }
    const [prefix, value = ''] = path.split('/');
    if (prefix === 'channel') return ID_RE.test(value) ? { kind: 'id', value } : null;
    if (!value) return null;
    return { kind: prefix === 'c' ? 'custom' : 'user', value };
  }

  const handle = input.replace(/^@/, '');
  return HANDLE_RE.test(handle) ? { kind: 'handle', value: handle } : null;
}

export function channelUrl(ref: ChannelRef): string {
  const v = encodeURIComponent(ref.value);
  switch (ref.kind) {
    case 'handle':
      return `https://www.youtube.com/@${v}`;
    case 'id':
      return `https://www.youtube.com/channel/${v}`;
    case 'custom':
      return `https://www.youtube.com/c/${v}`;
    case 'user':
      return `https://www.youtube.com/user/${v}`;
  }
}

export function buildSubscribeLink(ref: ChannelRef): string {
  return `${channelUrl(ref)}?sub_confirmation=1`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Plain HTML link/button snippet for websites and email signatures. */
export function subscribeHtmlSnippet(link: string, label = 'Subscribe on YouTube'): string {
  return `<a href="${escapeHtml(link)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
}

export function subscribeMarkdownSnippet(link: string, label = 'Subscribe on YouTube'): string {
  return `[${label.replace(/[[\]]/g, '')}](${link})`;
}
