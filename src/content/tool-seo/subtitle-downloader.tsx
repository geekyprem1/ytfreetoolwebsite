import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I download subtitles from a YouTube video?',
    a: 'Paste the video URL above and press Get subtitles. The tool fetches the video’s captions with timestamps and lets you download them as an SRT, VTT, or plain TXT file. No login or browser extension is required.',
  },
  {
    q: 'What is the difference between SRT, VTT, and TXT?',
    a: 'SRT (SubRip) is the most widely supported subtitle format for video editors and players. VTT (WebVTT) is the web standard used by HTML5 video and many streaming platforms. TXT is plain text with no timestamps — useful when you only need the words for notes, blog posts, or translation.',
  },
  {
    q: 'Does it work with auto-generated captions?',
    a: 'Yes. If a video has automatic captions and they are publicly available, the tool can export them. Auto-generated captions are less accurate than human-written ones, so proofread before publishing.',
  },
  {
    q: 'Why do some videos have no subtitles to download?',
    a: 'If a creator disabled captions, or a video genuinely has none, there is nothing to export. Some videos also restrict captions by region or language. In those cases the tool reports that subtitles are unavailable.',
  },
  {
    q: 'Can I download subtitles in other languages?',
    a: 'The tool exports the caption track the video exposes, defaulting to English when available. Availability of other languages depends on whether the creator uploaded or enabled them for that video.',
  },
  {
    q: 'Are the timestamps accurate for use in an editor?',
    a: 'Timestamps come from YouTube’s caption data and align with the spoken audio. SRT and VTT include start and end times per line, so the file drops straight into editors like Premiere, DaVinci Resolve, or CapCut. Minor nudging is sometimes needed for auto-generated tracks.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube subtitle downloader?</h2>
      <p>
        This tool exports the captions from a public YouTube video as a subtitle file. Paste a video URL
        and download the captions as <strong>SRT</strong>, <strong>VTT</strong>, or plain{' '}
        <strong>TXT</strong> — with timestamps preserved in the SRT and VTT formats.
      </p>
      <p>
        Subtitles are useful far beyond accessibility: editors reuse them for captions on clips,
        translators start from them, and writers turn them into articles and show notes.
      </p>

      <h2>How to download YouTube subtitles</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — Any watch, <code>youtu.be</code>, or shorts link works.
        </li>
        <li>
          <strong>Press Get subtitles</strong> — The tool fetches the caption track with timestamps.
        </li>
        <li>
          <strong>Choose a format</strong> — Download <code>.srt</code>, <code>.vtt</code>, or{' '}
          <code>.txt</code>.
        </li>
      </ol>

      <h2>Which subtitle format should I use?</h2>
      <ul>
        <li>
          <strong>SRT</strong> — Best for video editors and most players; universally supported.
        </li>
        <li>
          <strong>VTT</strong> — The web standard for HTML5 <code>&lt;track&gt;</code> and streaming.
        </li>
        <li>
          <strong>TXT</strong> — Just the words, no timing; ideal for repurposing into text.
        </li>
      </ul>

      <h2>Common uses</h2>
      <ul>
        <li>
          <strong>Captioning clips</strong> — Drop an SRT into your editor for burned-in captions.
        </li>
        <li>
          <strong>Translation</strong> — Start from the original captions to create subtitles in other
          languages.
        </li>
        <li>
          <strong>Repurposing</strong> — Turn a talk or tutorial into a blog post or newsletter.
        </li>
        <li>
          <strong>Accessibility review</strong> — Check caption quality on your own uploads.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Need the plain transcript with a reading view or AI summary instead? Use the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link>. To create description chapters
        from the captions, try the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link>, and to link to a specific caption
        moment use the{' '}
        <Link href="/youtube-timestamp-link-generator">Timestamp Link Generator</Link>.
      </p>
    </>
  );
}
