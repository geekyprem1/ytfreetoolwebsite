import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I summarize a YouTube video?',
    a: 'Paste the video URL above and press Summarize. The tool pulls the video’s transcript, then uses AI to produce a short TL;DR made of key takeaways. It works in seconds and needs no login.',
  },
  {
    q: 'Does it work on any video?',
    a: 'It works on videos that have captions (either creator-uploaded or auto-generated). If a video has no available transcript, there is nothing to summarize and the tool will tell you.',
  },
  {
    q: 'How accurate is the AI summary?',
    a: 'The summary is generated from the actual transcript, so it reflects what was said. Like any AI output, it can occasionally miss nuance or compress important detail, so treat it as a fast overview rather than a substitute for watching critical content.',
  },
  {
    q: 'Is there a length limit?',
    a: 'Very long transcripts are trimmed before summarizing to keep the request efficient, so extremely long videos are summarized from the earlier portion. For most talks, tutorials, and podcasts the full content is covered.',
  },
  {
    q: 'Can I summarize videos in other languages?',
    a: 'If the video has captions in another language, the tool can summarize from them. Output quality is best when the transcript language is well supported by the underlying AI model.',
  },
  {
    q: 'Is this better than watching the video?',
    a: 'It is faster for deciding whether a video is worth your time, or for capturing the main points of a long talk. For tutorials where you need to follow steps precisely, watching is still best — use the summary to navigate to the parts that matter.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube video summarizer?</h2>
      <p>
        A video summarizer reads a YouTube video’s transcript and uses AI to condense it into a short
        TL;DR of key takeaways. Paste a URL and get the main points in seconds — without watching the
        whole thing.
      </p>
      <p>
        It is ideal for long tutorials, conference talks, podcasts, and lectures, where you want the
        substance quickly or need to decide whether the full video is worth your time.
      </p>

      <h2>How to summarize a YouTube video</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — Any watch, <code>youtu.be</code>, or shorts link.
        </li>
        <li>
          <strong>Press Summarize</strong> — The tool fetches the transcript, then runs the AI summary.
        </li>
        <li>
          <strong>Read the takeaways</strong> — Copy or download the bullet-point summary.
        </li>
      </ol>

      <h2>When to use a summary</h2>
      <ul>
        <li>
          <strong>Triage</strong> — Decide if a 45-minute video is worth watching in full.
        </li>
        <li>
          <strong>Research</strong> — Capture the main arguments of a talk for notes.
        </li>
        <li>
          <strong>Repurposing</strong> — Start a blog post, thread, or newsletter from the key points.
        </li>
        <li>
          <strong>Study</strong> — Review the takeaways of a lecture before an exam.
        </li>
      </ul>

      <h2>How it works and its limits</h2>
      <p>
        The summary is built from the actual transcript, so it stays grounded in what was said rather
        than inventing content. Very long transcripts are trimmed for efficiency, and AI can occasionally
        compress away nuance, so use the summary as a fast overview. For step-by-step tutorials, jump back
        to the video for the exact details.
      </p>

      <h2>Related tools</h2>
      <p>
        Want the full text instead of a summary? Use the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link>. Turn a video into shareable
        chapters with the <Link href="/timestamp-generator">Timestamp Generator</Link>, or download
        captions with the <Link href="/subtitle-downloader">Subtitle Downloader</Link>.
      </p>
    </>
  );
}
