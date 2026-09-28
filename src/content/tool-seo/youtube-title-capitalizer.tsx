import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What is Title Case for a YouTube title?',
    a: 'Title Case capitalizes the first letter of each major word and keeps short words — a, an, the, of, to, and, or, for and similar — lowercase, unless one of them is the first or last word. For example, “how to edit videos on a budget” becomes “How to Edit Videos on a Budget”.',
  },
  {
    q: 'Does it keep brand names like iPhone or macOS correct?',
    a: 'It tries to. The tool only changes the first letter of each word, so mid-word capitals in brands such as iPhone, macOS or PlayStation are preserved. Always double-check unusual spellings after converting.',
  },
  {
    q: 'Should YouTube titles use Title Case or Sentence case?',
    a: 'Both are common and neither affects ranking. Title Case can look more polished for how-to and list videos; Sentence case can feel more natural and conversational. Pick one style and use it consistently across your channel.',
  },
  {
    q: 'Is writing a title in ALL CAPS a good idea?',
    a: 'Usually no. Full ALL CAPS titles can look like clickbait and some viewers find them off-putting. A single capitalized word for emphasis is fine, but avoid capitalizing the whole title.',
  },
  {
    q: 'Does capitalization change the character count?',
    a: 'No. Changing case does not add or remove characters, so the length stays the same. UPPERCASE does take more visible width, which can make a title look longer and hit YouTube’s truncation point sooner.',
  },
  {
    q: 'Is the Title Capitalizer free?',
    a: 'Yes. It runs entirely in your browser, needs no login, and nothing you type leaves your device.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the Title Capitalizer does</h2>
      <p>
        Paste a video title and this tool shows it in four styles at once — <strong>Title Case</strong>,{' '}
        <strong>Sentence case</strong>, <strong>UPPERCASE</strong> and <strong>lowercase</strong> — each with its own
        copy button and character count. It is handy when you paste a title in the wrong case, or when you want a
        consistent style across every video on your channel.
      </p>

      <h2>How Title Case is applied</h2>
      <ul>
        <li>The first letter of each major word is capitalized.</li>
        <li>Minor words (a, an, the, of, to, and, or, for, in, on, vs and similar) stay lowercase…</li>
        <li>…unless they are the first or last word of the title, which are always capitalized.</li>
        <li>Mid-word capitals in brands like iPhone or PlayStation are left as they are.</li>
      </ul>

      <h2>Which style should you use?</h2>
      <p>
        Neither Title Case nor Sentence case affects how a video ranks — this is purely about readability and brand
        consistency. Title Case often suits tutorials and list videos; Sentence case can feel more personal. The one
        rule worth following is consistency: pick a style and apply it to every title so your channel looks
        deliberate.
      </p>

      <h2>Related tools</h2>
      <p>
        Check the title fits with the <Link href="/youtube-title-length-checker">Title Length Checker</Link>, score
        the wording with the <Link href="/title-analyzer">AI Title Analyzer</Link>, generate new ideas with the{' '}
        <Link href="/title-generator">AI Title Generator</Link>, or grab the exact title of any video with the{' '}
        <Link href="/youtube-title-extractor">Title Extractor</Link>.
      </p>
    </>
  );
}
