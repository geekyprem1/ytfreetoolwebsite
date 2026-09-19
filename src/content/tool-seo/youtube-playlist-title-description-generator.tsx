import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What does this YouTube playlist generator create?',
    a: 'It creates multiple title and description pairs from your topic, audience, video themes, tone, language, and optional target keyword. You can copy one option or download the full set as a TXT file.',
  },
  {
    q: 'How long should a YouTube playlist description be?',
    a: 'There is no single required length. Give viewers enough context to understand the series, who it is for, and what they will watch next. Clear paragraphs are more useful than padding or repeated keywords.',
  },
  {
    q: 'Does keyword coverage guarantee playlist rankings?',
    a: 'No. The tool only counts exact keyword occurrences in each draft. It does not predict rankings, search volume, CTR, or competition; viewer satisfaction and the quality of the videos still matter.',
  },
  {
    q: 'Can I use the generated description as-is?',
    a: 'Treat it as a draft. Check every claim, replace generic lines with your actual episode order, and make sure the title accurately describes every video in the playlist.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>YouTube playlist title and description generator</h2>
      <p>
        A playlist works best when its name tells a clear story and its description explains the path. This free
        YouTube playlist title and description generator turns a topic, audience, target keyword, and episode themes
        into several drafts you can review before publishing.
      </p>
      <p>
        It also reports plain character counts and exact keyword occurrences. Those are transparent editing checks,
        not ranking scores or promises. Use the option that sounds most like your channel and most accurately matches
        the videos inside it.
      </p>

      <h2>How to write an SEO description for a YouTube playlist</h2>
      <ol>
        <li><strong>State the outcome</strong> — tell viewers what they will learn, solve, or watch.</li>
        <li><strong>Name the audience</strong> — beginners, returning customers, or a specific creator niche.</li>
        <li><strong>Preview the sequence</strong> — mention the early steps and what the later videos build toward.</li>
        <li><strong>Use the keyword naturally</strong> — one clear phrase is better than a repetitive keyword wall.</li>
        <li><strong>Verify every promise</strong> — remove claims the actual playlist cannot support.</li>
      </ol>

      <h2>What the generator checks</h2>
      <ul>
        <li>Title and description character counts for quick editing</li>
        <li>Exact, case-insensitive keyword occurrences in each field</li>
        <li>Individual copy buttons plus copy-all and TXT download</li>
        <li>Multiple angles so you can compare a beginner path with a practical series</li>
        <li>No invented ranking, CTR, competition, or search-volume claims</li>
      </ul>

      <h2>Build the playlist after choosing a draft</h2>
      <p>
        Use the <Link href="/playlist-length-calculator">Playlist Length Calculator</Link> to check the total runtime,
        the <Link href="/keyword-generator">Keyword Generator</Link> to expand a seed phrase, and the{' '}
        <Link href="/description-generator">Description Generator</Link> when you need a full description for an
        individual video. A playlist title should remain accurate even when one episode is updated or removed.
      </p>
    </>
  );
}
