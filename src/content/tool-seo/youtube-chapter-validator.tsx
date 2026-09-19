import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Why are my YouTube chapters not showing?',
    a: 'Check that the first timestamp starts at 00:00, you have at least three timestamps in ascending order, each line has a title, and every chapter is at least 10 seconds long. This validator checks those format rules before you save the description.',
  },
  {
    q: 'What timestamp formats does YouTube accept for chapters?',
    a: 'Use MM:SS for shorter videos or HH:MM:SS for long videos. Each timestamp should be followed by a descriptive chapter title on the same line.',
  },
  {
    q: 'How many timestamps do YouTube chapters need?',
    a: 'YouTube says your video should have at least three timestamps listed in ascending order for manually added chapters.',
  },
  {
    q: 'What is the minimum length of a YouTube chapter?',
    a: 'YouTube says the minimum length for video chapters is 10 seconds. If you enter a video length, this tool also checks the final chapter duration.',
  },
  {
    q: 'Does this validator upload my timestamps or video?',
    a: 'No. Pasted text and uploaded TXT files are processed in your browser. The tool does not need a YouTube login or video upload.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Fix YouTube chapters not showing</h2>
      <p>
        YouTube chapters are usually a formatting problem before they are an SEO problem. The validator
        checks the rules that commonly stop chapter markers from appearing: the first timestamp must be
        <code>00:00</code>, there must be at least three timestamps in ascending order, and each chapter
        must be at least 10 seconds long.
      </p>
      <p>
        Paste your timestamp block or upload a plain-text file. The tool reports the exact line that needs
        attention, then creates a normalized block you can copy into your YouTube description.
      </p>

      <h2>YouTube chapter timestamp rules</h2>
      <table>
        <thead>
          <tr><th>Check</th><th>Requirement</th></tr>
        </thead>
        <tbody>
          <tr><td>First timestamp</td><td><code>00:00</code></td></tr>
          <tr><td>Chapter count</td><td>At least 3 timestamps</td></tr>
          <tr><td>Order</td><td>Ascending, with no duplicates</td></tr>
          <tr><td>Spacing</td><td>At least 10 seconds per chapter</td></tr>
          <tr><td>Title</td><td>A readable title after every timestamp</td></tr>
          <tr><td>Formats</td><td><code>MM:SS</code> or <code>HH:MM:SS</code></td></tr>
        </tbody>
      </table>

      <h2>How to use the chapter validator</h2>
      <ol>
        <li>Paste lines such as <code>0:00 Intro</code> and <code>1:20 Setup</code>, or upload a TXT file.</li>
        <li>Optionally enter your video length to check the final chapter against the actual ending.</li>
        <li>Run the validator and fix any line-specific errors.</li>
        <li>Copy or download the cleaned block and paste it into the video description in YouTube Studio.</li>
      </ol>
      <p>
        The cleaned output keeps your original order and titles while normalizing the timestamp format. It
        does not invent a title for a missing line and does not silently reorder chapters, because both
        changes could hide an editing mistake.
      </p>

      <h2>Chapters are navigation, not a ranking guarantee</h2>
      <p>
        Clear chapters help viewers understand a long video and jump to the section they need. They do not
        guarantee a search position, key-moment display, or watch-time increase. Verify each timestamp on
        the actual timeline before publishing, especially when captions or editing notes are out of sync.
      </p>
      <p>
        Need chapter suggestions from a transcript? Try the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link> first, then validate its output here.
        You can wrap the corrected block into a full description with the{' '}
        <Link href="/description-generator">Description Generator</Link>.
      </p>

      <h2>Official YouTube source</h2>
      <p>
        Last verified 19 September 2026 against YouTube&apos;s{' '}
        <a
          href="https://support.google.com/youtube/answer/9884579?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Video Chapters help page
        </a>
        . YouTube also notes that advanced features and other channel/video eligibility conditions can
        affect availability, even when the timestamp format is valid.
      </p>
    </>
  );
}
