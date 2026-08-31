import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What is a YouTube channel ID?',
    a: 'A YouTube channel ID is the permanent identifier YouTube assigns to every channel. It always starts with "UC" and is 24 characters long (for example UC_x5XG1OV2P6uZZ5FSM9Ttw). Unlike a display name or @handle, the channel ID never changes, which is why the YouTube Data API, RSS feeds, and most third-party tools require it rather than the handle.',
  },
  {
    q: 'How do I find my own channel ID?',
    a: 'Open your channel page while signed in, copy the URL from the address bar, and paste it into the tool above. You can also go to YouTube Studio, then Settings, then Channel, then Advanced settings, where the channel ID is listed. Both routes give the same UC… value.',
  },
  {
    q: 'What is the difference between a channel ID and an @handle?',
    a: 'The @handle (for example @mkbhd) is a human-readable name a creator can choose and change. The channel ID (UC…) is a fixed system identifier that stays the same for the life of the channel. Handles are for people; channel IDs are for software, feeds, and APIs.',
  },
  {
    q: 'Why do I need the channel ID?',
    a: 'You need it for the YouTube Data API, to build an RSS feed of a channel’s uploads (youtube.com/feeds/videos.xml?channel_id=UC…), to embed a subscribe button, to configure many analytics and automation tools, and anywhere a stable identifier is required instead of a display name.',
  },
  {
    q: 'Does this tool work with old /c/ and /user/ URLs?',
    a: 'Yes. Paste a legacy custom URL such as youtube.com/c/Name or youtube.com/user/Name, a modern @handle URL, or a /channel/UC… URL. The tool resolves each format to the underlying channel ID.',
  },
  {
    q: 'Can I build an RSS feed from the channel ID?',
    a: 'Yes. Take the UC… ID and append it to https://www.youtube.com/feeds/videos.xml?channel_id= — the result is a standard RSS feed of that channel’s latest uploads that works in any feed reader. The tool shows this ready-made feed URL in the results.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube channel ID finder?</h2>
      <p>
        A channel ID finder converts any YouTube channel URL, <code>@handle</code>, or custom URL into
        the channel’s permanent ID — the 24-character string that starts with <code>UC</code>. YouTube
        uses this ID internally for every channel, and it never changes even if the creator renames the
        channel or updates their handle.
      </p>
      <p>
        Handles and custom URLs are convenient for humans, but software needs the stable identifier.
        The YouTube Data API, RSS feeds, subscribe-button embeds, and most analytics platforms all ask
        for the <code>UC…</code> ID. This tool bridges the gap: paste what you have, copy the ID you need.
      </p>

      <h2>How to find a YouTube channel ID</h2>
      <ol>
        <li>
          <strong>Copy the channel link</strong> — Open the channel on YouTube and copy the URL. A{' '}
          <code>@handle</code>, a <code>/channel/UC…</code> URL, or an older <code>/c/</code> or{' '}
          <code>/user/</code> link all work.
        </li>
        <li>
          <strong>Paste it above</strong> — Drop the URL or handle into the input and press Find ID.
        </li>
        <li>
          <strong>Copy the ID</strong> — Click the channel ID to copy it. The tool also builds a ready
          RSS feed URL you can copy in one click.
        </li>
      </ol>

      <h2>What you can do with a channel ID</h2>
      <ul>
        <li>
          <strong>YouTube Data API</strong> — Pass the ID to endpoints like <code>channels.list</code>{' '}
          and <code>playlistItems.list</code>.
        </li>
        <li>
          <strong>RSS feeds</strong> — Track uploads without the API using{' '}
          <code>feeds/videos.xml?channel_id=UC…</code>.
        </li>
        <li>
          <strong>Embeds &amp; widgets</strong> — Configure subscribe buttons and channel widgets that
          require the ID.
        </li>
        <li>
          <strong>Automation</strong> — Wire the ID into Zapier, Make, or your own scripts for reliable
          channel references.
        </li>
      </ul>

      <h2>Channel ID vs handle vs custom URL</h2>
      <p>
        A single channel can have three public references. The <strong>channel ID</strong> (
        <code>UC…</code>) is permanent and machine-facing. The <strong>@handle</strong> is a chosen name
        that can change. The <strong>custom URL</strong> is a legacy vanity path. Only the channel ID is
        guaranteed stable, so store it whenever you need a reference that will not break later.
      </p>

      <h2>Related tools</h2>
      <p>
        Once you have the ID, dig into public metrics with{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, pull the channel’s recurring keywords
        with <Link href="/channel-tags">Channel Tags</Link>, or grab the avatar with the{' '}
        <Link href="/youtube-profile-picture-downloader">Profile Picture Downloader</Link>.
      </p>
    </>
  );
}
