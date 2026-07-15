import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Which videos have transcripts available?',
    a: 'Videos with captions — automatic or manual — can usually return a transcript. If the uploader disabled captions or none were generated, extraction will fail or return empty results.',
  },
  {
    q: 'Are timestamps included?',
    a: 'Yes. Segments typically include time offsets so you can jump to moments, quote accurately, or feed the text into a chapter workflow.',
  },
  {
    q: 'Can I download the transcript as a file?',
    a: 'You can copy the full text or download a TXT file for editing, translation, or repurposing into blogs and show notes.',
  },
  {
    q: 'Does the tool create captions if none exist?',
    a: 'No. It extracts existing caption tracks. It does not speech-to-text a silent upload that has no caption data.',
  },
  {
    q: 'How does AI summary use the transcript?',
    a: 'When available, the summary option compresses the extracted text into a shorter overview so you can decide whether a long video is worth a full watch or deeper research pass.',
  },
  {
    q: 'Can transcripts help YouTube SEO?',
    a: 'Indirectly. Transcripts reveal spoken keywords, chapter candidates, and quote hooks. You still need strong titles, thumbnails, and descriptions — but transcript research makes those assets more accurate.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What a YouTube transcript extractor is for</h2>
      <p>
        The Transcript Extractor pulls caption text from a public YouTube video and presents it as
        readable, timestamped segments. Creators use it to repurpose long-form videos into articles,
        newsletters, and Shorts scripts. Researchers use it to quote sources without scrubbing the
        timeline for twenty minutes.
      </p>
      <p>
        Because captions track what was actually said, transcripts are also a ground-truth SEO input:
        they show which phrases appear naturally in the talk track versus which keywords only exist in
        the title.
      </p>

      <h2>How to extract a transcript</h2>
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

      <h2>Features</h2>
      <ul>
        <li>Full transcript text when captions exist</li>
        <li>Timestamped segments for navigation and quoting</li>
        <li>Copy and TXT download</li>
        <li>Optional AI summary for long videos</li>
        <li>Multi-language tracks when the video provides them</li>
      </ul>

      <h2>High-value workflows with transcripts</h2>
      <h3>Turn long videos into chapters</h3>
      <p>
        Paste the transcript into the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link> to draft chapter lists. Remember
        YouTube chapters must start at <strong>0:00</strong> and use ascending times in{' '}
        <code>MM:SS</code> or <code>HH:MM:SS</code> format in the description.
      </p>
      <h3>Mine hooks and Shorts cuts</h3>
      <p>
        Scan the first 30–60 seconds for opening lines, then expand winners with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>. For vertical ideas spun from the same topic,
        use the <Link href="/shorts-ideas">Shorts Idea Generator</Link>.
      </p>
      <h3>Build descriptions from real talking points</h3>
      <p>
        Feed key beats into the{' '}
        <Link href="/description-generator">Description Generator</Link> so your written metadata
        mirrors the spoken outline instead of generic filler.
      </p>

      <h2>Why transcripts beat guesswork</h2>
      <p>
        Auto-captions are imperfect, especially with accents, jargon, and music beds — but they still
        beat relying on memory. A 25-minute tutorial may contain a single 20-second explanation that
        becomes your next Short, email subject, or FAQ answer. Timestamps make that moment findable.
      </p>
      <p>
        For competitive analysis, transcripts reveal structure: how often experts define terms, where
        they place CTAs, and whether they front-load the promise or bury it after a long story.
      </p>

      <h2>Limitations and accuracy tips</h2>
      <ul>
        <li>
          <strong>No captions means no transcript</strong> — Ask the creator or wait for auto-captions
          to finish processing on brand-new uploads.
        </li>
        <li>
          <strong>Proofread names and numbers</strong> — ASR often mangles brands, URLs, and statistics.
        </li>
        <li>
          <strong>Prefer manual captions when available</strong> — Uploader-edited tracks are usually
          cleaner for publication.
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
        <Link href="/title-analyzer">Title Analyzer</Link>, and grade the final metadata with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>
    </>
  );
}
