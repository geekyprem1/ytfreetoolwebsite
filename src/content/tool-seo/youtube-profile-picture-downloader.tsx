import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I download a YouTube channel’s profile picture?',
    a: 'Paste the channel URL or @handle above and press Get avatar. The tool fetches the profile picture in full resolution and offers download buttons for common sizes (up to 800×800). Click a size to save the image.',
  },
  {
    q: 'What resolution is a YouTube profile picture?',
    a: 'YouTube stores channel avatars as square images and serves them at multiple sizes. The largest commonly available is 800×800 pixels. Smaller versions (240, 176, 88) are useful for favicons, comment-sized avatars, and thumbnails.',
  },
  {
    q: 'Can I download my own channel avatar?',
    a: 'Yes. Paste your channel URL or @handle like any other. The tool reads the publicly served avatar, so it works whether or not you are signed in.',
  },
  {
    q: 'Is it legal to download someone’s profile picture?',
    a: 'The image belongs to the creator. Downloading for research, commentary, criticism, or fan use is common, but you should not reuse someone’s avatar to impersonate them or imply endorsement. Follow the creator’s rights and YouTube’s terms.',
  },
  {
    q: 'Why does the downloaded image look smaller than expected?',
    a: 'If a channel uploaded a low-resolution avatar, YouTube cannot serve a larger one — upscaling would just blur it. The tool requests the largest size available; the real ceiling depends on what the creator uploaded.',
  },
  {
    q: 'What format is the downloaded profile picture?',
    a: 'Avatars are served as JPG images. The download keeps that format. If you need PNG with transparency, you would have to convert it, but YouTube avatars are always square JPGs with no transparency.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube profile picture downloader?</h2>
      <p>
        A profile picture downloader fetches a YouTube channel’s avatar — the round image shown next to
        its name — in full resolution so you can save it. Paste a channel URL or <code>@handle</code>,
        preview the image, and download the size you need.
      </p>
      <p>
        YouTube serves avatars as square images at several resolutions, up to 800×800 pixels. This tool
        requests the largest available and also offers smaller sizes for favicons, comment avatars, and
        design mockups.
      </p>

      <h2>How to download a YouTube profile picture</h2>
      <ol>
        <li>
          <strong>Copy the channel link</strong> — A <code>@handle</code>, <code>/channel/UC…</code>,
          <code>/c/</code>, or <code>/user/</code> URL all work.
        </li>
        <li>
          <strong>Paste it above</strong> — Press Get avatar to fetch the image.
        </li>
        <li>
          <strong>Pick a size</strong> — Click 800, 240, 176, or 88 to download that resolution.
        </li>
      </ol>

      <h2>What people use channel avatars for</h2>
      <ul>
        <li>
          <strong>Research &amp; reporting</strong> — Illustrate a write-up or comparison of creators.
        </li>
        <li>
          <strong>Design mockups</strong> — Place real avatars in layout drafts and pitches.
        </li>
        <li>
          <strong>Fan edits &amp; commentary</strong> — Reaction videos, community graphics, and tributes.
        </li>
        <li>
          <strong>Press kits</strong> — Collect assets for a collaboration or feature.
        </li>
      </ul>

      <h2>Use images responsibly</h2>
      <p>
        A profile picture is the creator’s property and often part of their brand identity. Downloading
        for legitimate use is fine, but do not reuse an avatar to impersonate a channel, imply
        endorsement, or mislead viewers. When in doubt, ask the creator.
      </p>

      <h2>Related tools</h2>
      <p>
        Grab the channel’s header art with the{' '}
        <Link href="/youtube-banner-downloader">Banner Downloader</Link>, resolve links to an ID with the{' '}
        <Link href="/channel-id-finder">Channel ID Finder</Link>, or review a channel’s public metrics
        with <Link href="/channel-statistics">Channel Statistics</Link>.
      </p>
    </>
  );
}
