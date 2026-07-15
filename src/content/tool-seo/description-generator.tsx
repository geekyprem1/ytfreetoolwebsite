import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How long should a YouTube description be?',
    a: 'A practical SEO range is about 150–350 words: enough room for a summary, links, chapters, and CTAs without dumping unrelated keyword walls. The first 2–3 lines matter most because they appear before “Show more.”',
  },
  {
    q: 'Should chapters start at 0:00?',
    a: 'Yes. YouTube requires the first chapter timestamp to be 0:00, with later times in ascending order using MM:SS or HH:MM:SS. Missing 0:00 usually prevents chapters from activating.',
  },
  {
    q: 'How many hashtags should I include?',
    a: 'YouTube allows up to 15 hashtags associated with a video; only the first few surface prominently above the title. Many creators keep a focused set (often 3–5 visible) and avoid stuffing the description with dozens of tags.',
  },
  {
    q: 'Does YouTube render markdown in descriptions?',
    a: 'No. Descriptions are plain text. Asterisks, hash headings, and markdown bullets show as raw characters, so generated copy should stay plain.',
  },
  {
    q: 'What does the generator include by default?',
    a: 'Depending on your toggles, it can draft a keyword-aware summary, chapter timestamps, hashtags, and a call-to-action block ready to paste into Studio.',
  },
  {
    q: 'Can I edit the AI description before publishing?',
    a: 'You should. Add real links, accurate chapter times from your edit, legal disclosures, and channel-specific CTAs. Treat AI output as a structured first draft.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the AI Description Generator creates</h2>
      <p>
        The Description Generator builds a paste-ready YouTube description from your topic, keyword,
        and summary. Optional blocks cover chapters, hashtags, and CTAs so you are not staring at an
        empty Studio field after export. Output is plain text — YouTube does not render markdown.
      </p>
      <p>
        Descriptions rarely create a viral spike alone, but they clarify topical relevance, house
        chapters, and give returning viewers a scannable outline. The first lines also appear in
        search snippets and suggested expansions.
      </p>

      <h2>How to generate a video description</h2>
      <ol>
        <li>
          <strong>Enter the topic and keyword</strong> — Match the language you used in the title when
          possible.
        </li>
        <li>
          <strong>Add a short summary</strong> — List the outcomes, sections, or products covered.
        </li>
        <li>
          <strong>Toggle chapters, hashtags, and CTA</strong> — Enable only what you will actually
          verify before publish.
        </li>
        <li>
          <strong>Generate and refine</strong> — Replace placeholder links and align timestamps to the
          final cut.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Keyword-aware description drafts in the ~150–300 word working range</li>
        <li>Optional chapter list with realistic timestamp scaffolding</li>
        <li>Hashtag set kept as a separate list (typically 10–15 candidates to trim)</li>
        <li>CTA prompts for subscribe, playlist, or next-video actions</li>
        <li>Tone controls for professional, casual, educational, or enthusiastic voices</li>
      </ul>

      <h2>Description structure that scans well</h2>
      <h3>Lines 1–3: the expanded promise</h3>
      <p>
        Restate who the video helps and what they get. Include the primary keyword once naturally.
        Viewers who open “Show more” already clicked; the job here is confirmation and retention.
      </p>
      <h3>Middle: outline, links, resources</h3>
      <p>
        Add tool mentions, affiliate disclosures, and resource URLs. Keep paragraphs short. If you
        enable chapters, place them under a clear “Chapters:” or “Timestamps:” label with{' '}
        <strong>0:00</strong> first.
      </p>
      <h3>End: CTA and socials</h3>
      <p>
        One clear next step beats three competing asks. Pair with related uploads or a playlist URL
        when available.
      </p>

      <h2>Hashtags and chapters: factual limits</h2>
      <p>
        YouTube supports up to <strong>15 hashtags</strong> on a video; excess tags may be ignored.
        Only a small number appear above the title, so put the most accurate ones first. For deeper
        hashtag brainstorming, use the{' '}
        <Link href="/hashtag-generator">Hashtag Generator</Link>.
      </p>
      <p>
        Chapters need ascending times and a leading <strong>0:00</strong> entry. If your edit changed
        after drafting, regenerate or manually fix times — wrong chapters frustrate viewers and get
        ignored. For transcript-based chapters, start from the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link> and{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link>.
      </p>

      <h2>Why drafting descriptions with AI saves uploads</h2>
      <p>
        Creators often publish with a one-line description because packaging energy went into the
        thumbnail. A structured generator removes blank-page friction while leaving room for human
        accuracy on links and times. Then run the finished text through the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link> to catch missing keywords, thin word
        counts, or absent CTAs.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Keyword stuffing</strong> — Repeating the same phrase every sentence looks spammy and
          reads poorly aloud.
        </li>
        <li>
          <strong>Fake chapters</strong> — Timestamps that do not match the cut hurt trust.
        </li>
        <li>
          <strong>Hashtag walls</strong> — Pasting 30+ tags wastes space and can dilute relevance.
        </li>
        <li>
          <strong>Markdown formatting</strong> — Bold markers and heading hashes show as ugly raw
          characters on YouTube.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Draft the title first with the <Link href="/title-generator">Title Generator</Link>, compare
        options in the <Link href="/title-analyzer">Title Analyzer</Link>, and research competitor
        phrasing with the <Link href="/tags-extractor">Tags Extractor</Link>.
      </p>
    </>
  );
}
