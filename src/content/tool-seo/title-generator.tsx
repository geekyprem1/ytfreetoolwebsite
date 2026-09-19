import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How long should a YouTube title be?',
    a: 'Aim for roughly 50–70 characters so the full promise remains visible in most search and suggested placements. YouTube allows longer titles, but truncation hides the ending on many surfaces.',
  },
  {
    q: 'How many title ideas does the generator create?',
    a: 'You can generate multiple SEO-oriented options in one run (commonly in the 5–20 range depending on your settings), then copy favorites or regenerate with a new tone.',
  },
  {
    q: 'Should the keyword go at the beginning?',
    a: 'Often yes for search-led videos. Leading with the primary phrase helps both clarity and relevance matching, as long as the title still sounds natural to a human scanner.',
  },
  {
    q: 'What tones can I choose?',
    a: 'Typical options include professional, casual, clickbait-leaning, educational, and humorous. Match tone to niche expectations — finance audiences tolerate less hype than entertainment channels.',
  },
  {
    q: 'Is an AI title enough to rank?',
    a: 'No. Titles help click-through and topical clarity, but watch time, satisfaction, thumbnail congruence, and competitive demand decide ranking. Treat AI output as a draft shortlist.',
  },
  {
    q: 'How do I pick between two strong titles?',
    a: 'Use the Title Analyzer to compare predicted CTR, SEO fit, and emotional pull side by side, then validate with your own audience intuition and past winners.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the AI YouTube Title Generator does</h2>
      <p>
        This free AI YouTube Title Generator turns a topic and keyword into clickable title drafts near
        the 40–60 character sweet spot—where titles often earn about 21% higher CTR. Choose tone and
        language, then copy your best options.
      </p>
      <p>
        Use it as an AI title generator for YouTube when you need several searchable, readable options quickly.
        Treat every result as a draft: keep the promise accurate, make the thumbnail tell the same story, and
        choose the version a real viewer would understand at a glance.
      </p>
      <p>
        Good titles do two jobs at once. They tell the algorithm what the video is about, and they tell
        a tired thumb-scroller why this result deserves the click over five similar alternatives.
      </p>

      <h2>How to generate YouTube titles</h2>
      <ol>
        <li>
          <strong>Describe the video topic</strong> — Be specific: outcome, audience, and format beat
          vague one-word seeds.
        </li>
        <li>
          <strong>Add your primary keyword</strong> — Use the phrase you actually want to rank or be
          associated with.
        </li>
        <li>
          <strong>Pick tone and language</strong> — Align voice with your channel brand.
        </li>
        <li>
          <strong>Generate and shortlist</strong> — Copy 3–5 candidates, then stress-test them against
          your thumbnail concept.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>AI drafts tuned for YouTube title patterns</li>
        <li>Keyword inclusion guidance toward the 50–70 character range</li>
        <li>Multiple tone presets for different niches</li>
        <li>Multi-language generation for international channels</li>
        <li>Fast copy and regenerate loop for brainstorming sessions</li>
      </ul>

      <h2>Title patterns that tend to work</h2>
      <h3>Outcome + audience</h3>
      <p>
        “Fix muddy dialogue for podcast editors” beats “Audio tips.” Specific outcomes reduce bounce
        from the wrong viewer and attract the right one.
      </p>
      <h3>Bracketed proof or format cues</h3>
      <p>
        Markers like “2026,” “beginner,” “template,” or “checklist” set expectations. Use them when
        true — fabricated urgency damages trust and repeat click-through.
      </p>
      <h3>Curiosity without bait-and-switch</h3>
      <p>
        Open a gap the video honestly closes. If the thumbnail implies a dramatic fail, the first
        minute should address that fail — not pivot to an unrelated tutorial.
      </p>

      <h2>Why title drafting deserves a dedicated tool</h2>
      <p>
        Most upload delays happen at packaging, not editing. Staring at a blank title field after a
        three-hour edit invites either bland labels or overstuffed keyword piles. A generator gives you
        volume quickly so you can spend judgment on selection instead of invention.
      </p>
      <p>
        After you have candidates, compare them in the{' '}
        <Link href="/title-analyzer">Title Analyzer</Link> and grade the full upload package with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>. For search expansion beyond one seed,
        open the <Link href="/keyword-generator">Keyword Generator</Link>.
      </p>

      <h2>Common title mistakes</h2>
      <ul>
        <li>
          <strong>Front-loading fluff</strong> — “You won’t believe…” wastes the highest-visibility
          characters.
        </li>
        <li>
          <strong>Ignoring truncation</strong> — If the unique promise sits after character 75, many
          surfaces never show it.
        </li>
        <li>
          <strong>Mismatching the thumbnail</strong> — Text and image must tell one story; conflict
          kills retention in the first seconds.
        </li>
        <li>
          <strong>Repeating the same formula every upload</strong> — Pattern recognition helps branding,
          but identical structures fatigue subscribers.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Once a title wins, draft the description with the{' '}
        <Link href="/description-generator">Description Generator</Link>, create opening lines with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>, and pull competitor phrasing via the{' '}
        <Link href="/tags-extractor">Tags Extractor</Link> when researching ranking videos.
      </p>
    </>
  );
}
