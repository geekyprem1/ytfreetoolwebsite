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
    a: 'The tool loads up to 2,000 top-level comments per lookup. Search and sorting work only within those loaded comments; replies and comments outside the loaded sample are not searched. When the cap is reached, the result says so. The export contains all comments matching your current filter, not every comment on the video.',
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
        <strong>CSV</strong> or <strong>JSON</strong> file. Paste a video URL, then search or sort the loaded
        sample before export. Each lookup loads up to 2,000 top-level comments; this is not a search across
        every comment or any replies on the video.
      </p>

      <h2>How to export YouTube comments</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — The tool loads that video’s top-level comments.
        </li>
        <li>
          <strong>Sort or search the loaded sample</strong> — Order by likes or date, or filter the loaded top-level comments by keyword and author. A lookup loads up to 2,000 comments.
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
          <strong>Published date</strong> — The timestamp returned for the comment.
        </li>
        <li>
          <strong>Text</strong> — The full comment content.
        </li>
      </ul>

      <h2>Common uses</h2>
      <p>
        Creators export comments to analyze feedback and spot recurring requests. Researchers study
        audience sentiment and language. Teams back up comments before a video is edited or removed.
        Because JSON preserves structure, it drops cleanly into data tools and scripts. Search filters
        only comments already loaded for this lookup, so an export is a filtered sample—not a complete
        archive of every comment and reply on the video. If results seem empty or incomplete, follow the{' '}
        <Link href="/blog/youtube-comment-export-troubleshooting">comment export troubleshooting guide</Link>.
      </p>

      <h2>Related tools</h2>
      <p>
        Running a giveaway from these comments? Use the{' '}
        <Link href="/youtube-comment-picker">Comment Picker</Link> to draw a fair winner. To analyze the
        tone and recurring topics in a small comment sample, try the{' '}
        <Link href="/youtube-comment-sentiment-analyzer">Comment Sentiment Analyzer</Link>. To analyze the
        video itself, see <Link href="/video-statistics">Video Statistics</Link>, and for the transcript
        try the <Link href="/transcript-extractor">Transcript Extractor</Link>.
      </p>
    </>
  );
}
