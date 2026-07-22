import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Which videos have a YouTube Video Transcript & Subtitles track?',
    a: 'Videos with captions — automatic or manual — can usually return a YouTube Video Transcript & Subtitles extract. This is caption text from the video, not a college or academic transcript. If the uploader disabled captions or none were generated, extraction will fail or return empty results.',
  },
  {
    q: 'Are timestamps included when I convert a YouTube transcript to a text file?',
    a: 'Yes. Segments typically include time offsets so you can jump to moments, quote accurately, or export a timestamped text file for chapters and show notes.',
  },
  {
    q: 'Can I convert a YouTube transcript to a text file with timestamps?',
    a: 'Yes. Extract the caption track, then copy or download a TXT file that preserves timestamped segments for editing, translation, or repurposing into blogs and show notes.',
  },
  {
    q: 'Does the tool create captions if none exist?',
    a: 'No. It extracts existing YouTube Video Transcript & Subtitles tracks. It does not speech-to-text a silent upload that has no caption data.',
  },
  {
    q: 'How does AI summary use the transcript?',
    a: 'When available, the summary option compresses the extracted text into a shorter overview so you can decide whether a long video is worth a full watch or deeper research pass.',
  },
  {
    q: 'Can YouTube Video Transcript & Subtitles help SEO?',
    a: 'Indirectly. Transcripts reveal spoken keywords, chapter candidates, and quote hooks. You still need strong titles, thumbnails, and descriptions — but transcript research makes those assets more accurate. Titles in the 40–60 character range are often associated with about 21% higher CTR.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Key specs for YouTube Video Transcript &amp; Subtitles extraction</h2>
      <p>
        This free YouTube Video Transcript &amp; Subtitles Extractor pulls caption text from a public
        YouTube video — spoken dialogue with timestamps, not a college or academic transcript. Paste a
        captioned video URL to review segments, copy text, or download a timestamped text file for
        blogs, chapters, and research.
      </p>
      <ul>
        <li>
          <strong>Source:</strong> existing automatic or manual caption tracks
        </li>
        <li>
          <strong>Output:</strong> timestamped segments plus full text
        </li>
        <li>
          <strong>Export:</strong> copy or download TXT with timestamps
        </li>
        <li>
          <strong>Optional:</strong> AI summary for long videos
        </li>
      </ul>
      <p>
        Caption and localization concepts are covered in the{' '}
        <a
          href="https://developers.google.com/youtube/v3/docs/captions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google YouTube Data API v3 Captions documentation
        </a>
        . For packaging and viewer experience guidance, see the{' '}
        <a href="https://www.youtube.com/creators/" target="_blank" rel="noopener noreferrer">
          YouTube Creator Academy &amp; Creator Hub
        </a>
        .
      </p>

      <h2>How to extract a YouTube Video Transcript &amp; Subtitles track</h2>
      <ol>
        <li>
          <strong>Find a captioned video</strong> — Confirm the player offers a subtitle track.
        </li>
        <li>
          <strong>Paste the URL</strong> — Submit a watch or Shorts link above.
        </li>
        <li>
          <strong>Review timestamped segments</strong> — Skim for chapters, quotes, and keyword density.
        </li>
        <li>
          <strong>Copy, download, or summarize</strong> — Export TXT for editing, or use AI summary for a
          fast overview.
        </li>
      </ol>

      <h2>Convert YouTube transcript to a text file with timestamps</h2>
      <p>
        To convert a YouTube transcript to a text file with timestamps, extract the caption track above,
        then use Download TXT. The file preserves time offsets with each segment so you can quote
        accurately, draft chapters, or paste into a blog outline without scrubbing the player. Prefer
        uploader-edited captions when available — automatic speech recognition often mangles brands,
        URLs, and statistics.
      </p>

      <h3>Turn long videos into chapters</h3>
      <p>
        Paste the transcript into the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link> to draft chapter lists. YouTube
        chapters must start at <strong>0:00</strong> and use ascending times in <code>MM:SS</code> or{' '}
        <code>HH:MM:SS</code> format in the description.
      </p>
      <h3>Mine hooks and Shorts cuts</h3>
      <p>
        Scan the first 30–60 seconds for opening lines, then expand winners with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>. For vertical ideas from the same topic, use
        the <Link href="/shorts-ideas">Shorts Idea Generator</Link>.
      </p>

      <h2>Limitations and accuracy tips</h2>
      <ul>
        <li>
          <strong>No captions means no transcript</strong> — Wait for auto-captions to finish on brand-new
          uploads.
        </li>
        <li>
          <strong>Proofread names and numbers</strong> — ASR often mangles brands and statistics.
        </li>
        <li>
          <strong>Respect copyright</strong> — Extracting for research or personal notes differs from
          republishing someone else’s script as your article without permission.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Combine transcript research with packaging: draft titles in the{' '}
        <Link href="/title-generator">Title Generator</Link>, compare variants in the{' '}
        <Link href="/title-analyzer">Title Analyzer</Link>, and grade metadata with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>
    </>
  );
}
