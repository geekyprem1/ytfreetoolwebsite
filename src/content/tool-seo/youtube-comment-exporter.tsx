import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I export YouTube comments to a spreadsheet?',
    a: 'Paste the video URL, let the comments load, then click CSV to download a comma-separated file you can open in Excel, Google Sheets, or Numbers. Each row has the author, like count, publish date, and comment text.',
  },
  {
    q: 'Can I export as JSON for developers?',
    a: 'Yes. The JSON export contains the same fields in a structured array, ready to feed into scripts, notebooks, or data pipelines.',
  },
  {
    q: 'Does it export replies too?',
    a: 'No. The tool exports top-level comments only, which is what most analysis and giveaway use cases need. Nested replies are not included.',
  },
  {
    q: 'How many comments can I export?',
    a: 'The tool pulls a large batch and caps very high-comment videos to stay within YouTube’s API limits. When results are capped it tells you, so you know the export is a sample rather than every single comment.',
  },
  {
    q: 'Can I sort and search before exporting?',
    a: 'Yes. Sort by likes, newest, or oldest, and use the search box to filter by keyword or author. The export reflects whatever is currently shown, so you can export a filtered subset.',
  },
  {
    q: 'Is exporting comments allowed?',
    a: 'Comments are public data. Exporting them for research, analysis, or backup is common. Handle the data responsibly — do not use it to harass commenters or to build profiles of individuals.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube comment exporter?</h2>
      <p>
        A comment exporter pulls the comments from a public YouTube video and lets you download them as a{' '}
        <strong>CSV</strong> or <strong>JSON</strong> file. Paste a video URL, optionally sort and search,
        then export the data for analysis, sentiment review, or backup.
      </p>

      <h2>How to export YouTube comments</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — The tool loads that video’s top-level comments.
        </li>
        <li>
          <strong>Sort or search</strong> — Order by likes or date, or filter by keyword and author.
        </li>
        <li>
          <strong>Download</strong> — Export the current view as CSV or JSON.
        </li>
      </ol>

      <h2>What you get in the export</h2>
      <ul>
        <li>
          <strong>Author</strong> — The commenter’s display name.
        </li>
        <li>
          <strong>Likes</strong> — The like count on each comment.
        </li>
        <li>
          <strong>Published date</strong> — When the comment was posted.
        </li>
        <li>
          <strong>Text</strong> — The full comment content.
        </li>
      </ul>

      <h2>Common uses</h2>
      <p>
        Creators export comments to analyze feedback and spot recurring requests. Researchers study
        audience sentiment and language. Teams back up comments before a video is edited or removed.
        Because JSON preserves structure, it drops cleanly into data tools and scripts.
      </p>

      <h2>Related tools</h2>
      <p>
        Running a giveaway from these comments? Use the{' '}
        <Link href="/youtube-comment-picker">Comment Picker</Link> to draw a fair winner. To analyze the
        video itself, see <Link href="/video-statistics">Video Statistics</Link>, and for the transcript
        try the <Link href="/transcript-extractor">Transcript Extractor</Link>.
      </p>
    </>
  );
}
