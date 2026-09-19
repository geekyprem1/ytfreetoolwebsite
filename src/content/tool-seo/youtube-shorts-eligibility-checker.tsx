import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Is my video eligible to become a YouTube Short?',
    a: 'For a standard YouTube channel, a new upload is categorized as a Short when it has a square or vertical aspect ratio and is up to three minutes long. This checker reads those local file properties, but YouTube makes the final classification after upload.',
  },
  {
    q: 'Can a square 1:1 video be a YouTube Short?',
    a: 'Yes. YouTube says square or vertical videos up to three minutes long are categorized as Shorts for standard channels when uploaded on or after 15 October 2024.',
  },
  {
    q: 'Will a 16:9 video become a YouTube Short?',
    a: 'No, not under the current square-or-vertical categorization rule. YouTube specifically recommends using a wider ratio such as 16:9 if you want a video to remain long-form.',
  },
  {
    q: 'Does this tool upload my video?',
    a: 'No. The video file stays on your device. The tool uses your browser to read duration, dimensions, aspect ratio, file size, and format without a server upload.',
  },
  {
    q: 'Can this checker detect copyright claims or music eligibility?',
    a: 'No. It only checks technical metadata. It cannot inspect the audio, scan music rights, find Content ID claims, or guarantee monetization eligibility.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Is my video eligible for YouTube Shorts?</h2>
      <p>
        For a standard YouTube channel, YouTube says that a video uploaded on or after 15 October 2024
        is categorized as a Short when it is <strong>square or vertical</strong> and <strong>up to three
        minutes long</strong>. This checker turns those rules into a fast local file check before you open
        YouTube Studio.
      </p>
      <p>
        Select a file and your browser reads the duration, width, height, aspect ratio, file size, and
        format. The video remains on your device: this is not an upload tool and it does not send the file
        to yttools.pro.
      </p>

      <h2>YouTube Shorts aspect ratio and duration rule</h2>
      <table>
        <thead>
          <tr>
            <th>Local video property</th>
            <th>Likely classification for a new standard-channel upload</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>9:16 vertical, 3:00 or less</td><td>Short</td></tr>
          <tr><td>4:5 vertical, 3:00 or less</td><td>Short</td></tr>
          <tr><td>1:1 square, 3:00 or less</td><td>Short</td></tr>
          <tr><td>Square or vertical, over 3:00</td><td>Long-form</td></tr>
          <tr><td>16:9 horizontal</td><td>Long-form</td></tr>
        </tbody>
      </table>
      <p>
        The rules above explain format classification, not distribution. A Short can still face separate
        policy, copyright, age-restriction, and monetization decisions after upload. Never treat a
        technical pass as a promise of views or revenue.
      </p>

      <h2>What this Shorts checker can and cannot inspect</h2>
      <p>
        It can read the file properties a browser exposes: duration, dimensions, aspect ratio, format, and
        size. It cannot watch the video, detect reused content, identify music, examine a Content ID claim,
        or decide whether an upload meets monetization policies. Check music rights separately in YouTube
        Studio and use licensed or original audio.
      </p>
      <p>
        YouTube notes that videos in the Shorts Feed can be eligible for monetization subject to its Shorts
        monetization policies, while globally blocked Shorts are not eligible. That decision belongs to
        YouTube after upload, not to a browser metadata tool.
      </p>

      <h2>Keep a video long-form instead</h2>
      <p>
        If you do not want a qualifying video classified as a Short, use a wider aspect ratio such as 16:9.
        This is particularly helpful when you are optimizing for the long-form watch-hour route to YPP.
        Plan that route with the{' '}
        <Link href="/youtube-watch-time-calculator">YouTube Watch Time Calculator</Link>, then compare it
        with the Shorts route in the{' '}
        <Link href="/youtube-monetization-progress-calculator">Monetization Progress Calculator</Link>.
      </p>

      <h2>Official YouTube source</h2>
      <p>
        Last verified 18 September 2026 against YouTube&apos;s{' '}
        <a
          href="https://support.google.com/youtube/answer/15424877?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          three-minute Shorts guidance
        </a>
        . The page also describes the separate effective date for Official Artist Channels, which this tool
        labels so you can choose the right context.
      </p>
    </>
  );
}
