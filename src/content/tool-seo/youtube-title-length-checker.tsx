import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How long can a YouTube title be?',
    a: 'A YouTube video title can be up to 100 characters, including spaces. If you paste a longer title, YouTube Studio simply will not accept the extra characters.',
  },
  {
    q: 'What is the ideal YouTube title length?',
    a: 'There is no single ideal, but titles are usually cut off after roughly 60 characters in desktop search and suggested videos, and around 40 on mobile. Many creators aim for about 50–60 characters so the whole title is visible, then put the most important words first.',
  },
  {
    q: 'Why does the preview say “approximate”?',
    a: 'YouTube truncates by pixel width, not a fixed number of characters. A title full of wide letters (W, M) is cut sooner than one with narrow letters (i, l), and the point differs across devices and layouts. The previews here use character estimates as a practical guide.',
  },
  {
    q: 'Do emojis count toward the limit?',
    a: 'Yes. This tool counts each emoji as one character (matching how the limit generally behaves). Note that emojis take more visible width, so they can push the truncation point earlier.',
  },
  {
    q: 'Does title length affect ranking?',
    a: 'Length itself is not a ranking factor. What matters is that the title is clear, includes your main topic, and is not cut off before the key words. A title that reads well and is fully visible tends to earn more clicks, which does help.',
  },
  {
    q: 'Is the Title Length Checker free?',
    a: 'Yes. It runs entirely in your browser, needs no login, and nothing you type is sent to a server.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the Title Length Checker does</h2>
      <p>
        Paste or type a video title and this tool counts it live against YouTube’s{' '}
        <strong>100-character limit</strong>, then shows how it is likely to look in two common places: desktop
        search and suggested videos (cut off around 60 characters) and the mobile app (around 40). The colour bar
        turns amber as you pass the search cut-off and red if you exceed the hard limit.
      </p>

      <h2>YouTube title length limits</h2>
      <ul>
        <li>
          <strong>Hard limit:</strong> 100 characters. Studio will not save more.
        </li>
        <li>
          <strong>Desktop search / suggested:</strong> roughly the first 60 characters are shown.
        </li>
        <li>
          <strong>Mobile app:</strong> roughly the first 40 characters.
        </li>
      </ul>
      <p>
        These cut-offs are approximate because YouTube measures pixel width, not characters. Treat them as a guide
        and always front-load the words that matter.
      </p>

      <h2>How to write a well-sized title</h2>
      <ol>
        <li>Put your main keyword and hook in the first 40–50 characters.</li>
        <li>Keep the full title under 60 characters when you can, so nothing important is cut.</li>
        <li>Use the extra room up to 100 characters for secondary context, not filler.</li>
        <li>Avoid ALL CAPS for the whole title and long strings of emojis — both read as clickbait.</li>
      </ol>

      <h2>Related tools</h2>
      <p>
        Fix inconsistent casing with the <Link href="/youtube-title-capitalizer">Title Capitalizer</Link>, score the
        wording with the <Link href="/title-analyzer">AI Title Analyzer</Link>, brainstorm new options in the{' '}
        <Link href="/title-generator">AI Title Generator</Link>, or pull the exact title of an existing video with the{' '}
        <Link href="/youtube-title-extractor">Title Extractor</Link>.
      </p>
    </>
  );
}
