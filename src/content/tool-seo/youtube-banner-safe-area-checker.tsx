import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What size should a YouTube channel banner be?',
    a: 'YouTube recommends 2560×1440 pixels for the best display across devices. The minimum upload dimension is 2048×1152 pixels with a 16:9 aspect ratio.',
  },
  {
    q: 'What is the YouTube banner safe area?',
    a: 'At YouTube\'s minimum 2048×1152 canvas, the minimum safe area for text and logos is 1235×338 pixels, centered in the image. Keep important branding in the centered guide so it survives device crops.',
  },
  {
    q: 'Does this banner checker upload my image?',
    a: 'No. Your banner stays in your browser. The previews and PNG guide are generated locally on your device.',
  },
  {
    q: 'Can the tool detect text or logos outside the safe area?',
    a: 'It cannot reliably identify text or logo pixels automatically. Instead, it shades the outside region and draws the official safe-area boundary so you can inspect important content visually.',
  },
  {
    q: 'Why does my YouTube banner look different on mobile and TV?',
    a: 'YouTube uses one channel-art image but crops it differently across device surfaces. A centered safe area helps text and logos remain visible while the outer artwork fills larger screens.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>YouTube banner safe area checker for mobile and desktop</h2>
      <p>
        A YouTube channel banner is one image that gets cropped for different screens. YouTube recommends a{' '}
        <strong>2560×1440 px</strong> canvas, while important text and logos should stay inside the
        centered safe area. Upload your artwork here to see the full TV canvas alongside desktop, tablet,
        and mobile crop previews.
      </p>
      <p>
        The checker runs in your browser. It does not send your brand image to yttools.pro, and the export
        is a new guide file—the original stays unchanged.
      </p>

      <h2>YouTube channel art dimensions</h2>
      <table>
        <thead>
          <tr>
            <th>Guideline</th>
            <th>Dimensions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Recommended banner canvas</td><td>2560×1440 px</td></tr>
          <tr><td>Minimum upload canvas</td><td>2048×1152 px, 16:9</td></tr>
          <tr><td>Minimum safe area at minimum canvas</td><td>1235×338 px, centered</td></tr>
          <tr><td>File format</td><td>JPG, PNG, or another supported image format</td></tr>
        </tbody>
      </table>
      <p>
        The safe-area numbers are a minimum-canvas reference. The overlay scales that centered region to your
        uploaded image so you can check a recommended 2560×1440 design without manually recalculating it.
      </p>

      <h2>How to preview a YouTube banner on every device</h2>
      <ol>
        <li>Upload your channel art; the browser reads its dimensions locally.</li>
        <li>Check the dimension badge: 16:9 and at least 2048×1152 are the baseline.</li>
        <li>Keep your channel name, logo, schedule, and CTA inside the amber safe-area box.</li>
        <li>Inspect mobile and tablet crops first; edge artwork is most likely to disappear there.</li>
        <li>Export a guide if a designer or editor needs the same crop reference.</li>
      </ol>

      <h2>What the checker can and cannot flag</h2>
      <p>
        It can flag the image dimensions and aspect ratio, and it shades the artwork outside the centered
        safe area. It cannot tell whether a specific pixel is text, a face, or a logo, so treat the overlay
        as a visual review guide rather than an automated brand detector.
      </p>
      <p>
        If you need the original artwork from an existing channel, use the{' '}
        <Link href="/youtube-banner-downloader">YouTube Banner Downloader</Link>. For a matching avatar,
        see the <Link href="/youtube-profile-picture-downloader">Profile Picture Downloader</Link>.
      </p>

      <h2>Official YouTube dimensions</h2>
      <p>
        Last verified 19 September 2026 against YouTube&apos;s{' '}
        <a
          href="https://support.google.com/youtube/answer/10456525?hl=en-GB"
          target="_blank"
          rel="noopener noreferrer"
        >
          channel branding guidance
        </a>
        . YouTube can change display behavior, so preview the final artwork in YouTube Studio before saving
        the banner.
      </p>
    </>
  );
}
