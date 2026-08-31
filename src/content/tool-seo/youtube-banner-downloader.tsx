import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I download a YouTube channel banner?',
    a: 'Paste the channel URL or @handle above and press Get banner. The tool fetches the channel art in full resolution and offers download buttons for common widths. Click a width to save the image.',
  },
  {
    q: 'What is the correct YouTube banner size?',
    a: 'YouTube recommends uploading channel art at 2048×1152 pixels minimum, with a maximum file size of 6 MB. The "safe area" that shows on every device is 1235×338 pixels, centered — keep logos and text inside it so they are not cropped on phones or TVs.',
  },
  {
    q: 'Why does my banner look cropped differently on TV, desktop, and mobile?',
    a: 'YouTube displays one uploaded image at different crops per device. TVs show the full width, desktop shows a wide strip, and mobile shows only the central safe area (1235×338). That is why important elements should sit in the center.',
  },
  {
    q: 'What if a channel has no banner?',
    a: 'Some channels never upload channel art. When that happens the tool reports that no banner is set — there is simply no image to download.',
  },
  {
    q: 'Can I reuse a downloaded banner?',
    a: 'The banner is the creator’s artwork. Downloading for research, commentary, or fan work is common, but do not reuse it to impersonate the channel or imply endorsement. Respect the creator’s rights and YouTube’s terms.',
  },
  {
    q: 'What format and resolution do I get?',
    a: 'Banners are served as JPG. The tool requests wide crops (up to 2560 px) suitable for the desktop and TV display. The true ceiling depends on the resolution the creator uploaded.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube banner downloader?</h2>
      <p>
        A banner downloader fetches a channel’s header artwork — the wide image across the top of the
        channel page, also called channel art — in full resolution. Paste a channel URL or{' '}
        <code>@handle</code>, preview the banner, and download the width you need.
      </p>

      <h2>YouTube banner size guide</h2>
      <ul>
        <li>
          <strong>Recommended upload size:</strong> 2048×1152 pixels (minimum).
        </li>
        <li>
          <strong>Safe area (visible on all devices):</strong> 1235×338 pixels, centered.
        </li>
        <li>
          <strong>Maximum file size:</strong> 6 MB.
        </li>
        <li>
          <strong>Aspect ratio:</strong> 16:9 source, cropped per device.
        </li>
      </ul>
      <p>
        Because YouTube crops one image differently on TV, desktop, and mobile, keep your logo, channel
        name, and any text inside the central 1235×338 safe area so nothing important gets cut off.
      </p>

      <h2>How to download a channel banner</h2>
      <ol>
        <li>
          <strong>Copy the channel link</strong> — A handle or channel URL works.
        </li>
        <li>
          <strong>Paste it above</strong> — Press Get banner to fetch the artwork.
        </li>
        <li>
          <strong>Choose a width</strong> — Download at 2560, 2048, or 1280 pixels wide.
        </li>
      </ol>

      <h2>What people use banners for</h2>
      <ul>
        <li>
          <strong>Design inspiration</strong> — Study how successful channels lay out their art.
        </li>
        <li>
          <strong>Research &amp; reporting</strong> — Illustrate an article about a creator or niche.
        </li>
        <li>
          <strong>Redesign references</strong> — Keep the current banner while you draft a new one.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Grab the matching avatar with the{' '}
        <Link href="/youtube-profile-picture-downloader">Profile Picture Downloader</Link>, resolve any
        link to a channel ID with the <Link href="/channel-id-finder">Channel ID Finder</Link>, or check
        the channel’s public numbers with{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>.
      </p>
    </>
  );
}
