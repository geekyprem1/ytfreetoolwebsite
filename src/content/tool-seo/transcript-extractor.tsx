import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Which videos have a YouTube Video Transcript & Subtitles track?',
    a: 'Videos with captions - automatic or manual - can usually return a YouTube Video Transcript & Subtitles extract. This is caption text from the video, not a college or academic transcript. If the uploader disabled captions or none were generated, extraction will fail or return empty results.',
  },
  {
    q: 'Are timestamps included when I convert a YouTube transcript to a text file?',
    a: 'Yes. Segments typically include time offsets so you can jump to moments, quote accurately, or export a timestamped text file for chapters and show notes.',
  },
  {
    q: 'Which download formats are available?',
    a: 'TXT (with or without timestamps), SRT and WebVTT subtitle files, and JSON. Use SRT for video editors such as Premiere Pro, DaVinci Resolve and Final Cut, VTT for HTML5 web players, TXT for reading and repurposing, and JSON when you need start, end and duration for every line in code.',
  },
  {
    q: 'Can I get the transcript without timestamps?',
    a: 'Yes. Switch off “Show timestamps” and the preview, Copy text and TXT download become clean flowing text, split into paragraphs at natural pauses — ready to paste into a blog post or document.',
  },
  {
    q: 'Can I extract a transcript in another language?',
    a: 'Yes, if the video has captions in that language. The extractor lists every caption language the video offers — manual or auto-generated — and loads English by default when available, otherwise the first track. Pick another language from the menu to switch.',
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
    a: 'Indirectly. Transcripts reveal spoken keywords, chapter candidates, and quote hooks. You still need strong titles, thumbnails, and descriptions - but transcript research makes those assets more accurate. Titles in the 40-60 character range are often associated with about 21% higher CTR.',
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
          <strong>Output:</strong> timestamped segments or clean text, plus word count, character count and
          reading time
        </li>
        <li>
          <strong>Languages:</strong> every caption language the video offers, switchable in one click
        </li>
        <li>
          <strong>Export:</strong> copy text, or download TXT, SRT, VTT or JSON
        </li>
        <li>
          <strong>Optional:</strong> AI summary for long videos
        </li>
      </ul>
      <p>
        Use it as a free YouTube transcript extractor, transcript downloader, or online caption extractor
        when you need the spoken text without a browser extension. It only retrieves captions that the
        public video makes available; it does not create subtitles for a video with no caption track.
      </p>
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
          <strong>Copy, download, or summarize</strong> — Export TXT, SRT, VTT or JSON, or use AI summary for a
          fast overview.
        </li>
      </ol>

      <h2>Which transcript format should you download?</h2>
      <ul>
        <li>
          <strong>TXT</strong> — plain text for reading, notes, blog drafts and AI tools. Keep timestamps for
          quoting and chapters, or switch them off for clean paragraphs.
        </li>
        <li>
          <strong>SRT</strong> — the standard subtitle file for video editors (Premiere Pro, DaVinci Resolve,
          Final Cut, CapCut) and most media players.
        </li>
        <li>
          <strong>VTT (WebVTT)</strong> — the web subtitle format for HTML5 <code>&lt;video&gt;</code> players and
          many course platforms.
        </li>
        <li>
          <strong>JSON</strong> — structured data with start, end and duration for every line, for developers,
          search indexes and data analysis.
        </li>
      </ul>
      <p>
        For caption files only, the <Link href="/subtitle-downloader">Subtitle Downloader</Link> gives the same
        SRT, VTT, TXT and JSON exports in one click.
      </p>

      <h2>Convert YouTube transcript to a text file with timestamps</h2>
      <p>
        To convert a YouTube transcript to a text file with timestamps, extract the caption track above,
        keep “Show timestamps” on, then download TXT. Each line starts with its time, like{' '}
        <code>[4:05]</code>, so you can quote
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
