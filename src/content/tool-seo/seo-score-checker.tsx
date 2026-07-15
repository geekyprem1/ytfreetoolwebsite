import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What does the SEO Score Checker evaluate?',
    a: 'It grades title, description, tags, keyword density, hashtags, readability, structure, and engagement hooks, then rolls them into a weighted score out of 100 with category-level tips.',
  },
  {
    q: 'How are category weights distributed?',
    a: 'Approximate weights: keyword density 20%, tags 15%, readability 15%, and 10% each for title, description, hashtags, structure, and engagement hooks. Fix the lowest weighted gaps first.',
  },
  {
    q: 'What title length does the checker prefer?',
    a: 'It favors titles in a practical display range (around the mid-length band used in YouTube packaging, commonly discussed as roughly 50–70 characters) with the keyword placed early when relevant.',
  },
  {
    q: 'How many tags and hashtags are considered healthy?',
    a: 'Tag scoring looks favorably on roughly 15–30 relevant tags. Hashtag scoring treats about 3–15 hashtags as optimal, aligning with YouTube’s 15-hashtag maximum.',
  },
  {
    q: 'Is a score of 100 required to rank?',
    a: 'No. The score is a packaging hygiene checklist, not a ranking guarantee. Viewer satisfaction, competition, and topical authority still dominate outcomes.',
  },
  {
    q: 'Does this tool call AI for every check?',
    a: 'The core score is computational and fast — it evaluates your pasted metadata against rule-based heuristics so you can iterate without waiting on a model call.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the YouTube SEO Score Checker measures</h2>
      <p>
        The SEO Score Checker grades your draft title, description, tags, hashtags, and keyword usage
        against practical packaging heuristics, then returns a score out of <strong>100</strong> with a
        category breakdown. It is a pre-publish checklist: catch thin descriptions, missing keywords,
        and weak CTA patterns before you hit upload.
      </p>
      <p>
        It does not watch your video file or predict virality. It audits the text layer that YouTube
        and viewers see around the player.
      </p>

      <h2>How to check your video SEO score</h2>
      <ol>
        <li>
          <strong>Paste your draft title and description</strong> — Use the text you plan to publish.
        </li>
        <li>
          <strong>Add tags, hashtags, and a target keyword</strong> — Scoring needs a keyword to judge
          placement and density.
        </li>
        <li>
          <strong>Run Analyze</strong> — Review the overall gauge and each category score.
        </li>
        <li>
          <strong>Apply the top suggestions</strong> — Re-check until the biggest gaps close.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Overall score out of 100 with visual breakdown</li>
        <li>Weighted categories across metadata and readability</li>
        <li>Actionable suggestions sorted toward weaker areas</li>
        <li>Fast rule-based analysis for rapid iteration</li>
        <li>Works before upload — no need to publish first</li>
      </ul>

      <h2>Category weights and what “good” looks like</h2>
      <h3>Keyword density (about 20%)</h3>
      <p>
        The primary phrase should appear naturally in the title and description without stuffing.
        Density that is too low looks unfocused; density that is too high reads as spam.
      </p>
      <h3>Tags (about 15%) and hashtags (about 10%)</h3>
      <p>
        Aim near <strong>15–30</strong> relevant Studio tags and about <strong>3–15</strong> hashtags
        (YouTube caps hashtags at 15). Mix broad and specific terms; drop duplicates.
      </p>
      <h3>Title and description (about 10% each)</h3>
      <p>
        Titles should carry the keyword early and stay scannable. Descriptions in roughly the{' '}
        <strong>150–350 word</strong> band give room for summary, links, and chapters without empty
        filler.
      </p>
      <h3>Readability, structure, and hooks (remaining weight)</h3>
      <p>
        Short paragraphs, line breaks, chapter-style structure, questions, and clear CTAs improve
        scanability and engagement cues in the text layer.
      </p>

      <h2>How to raise a low score without gaming</h2>
      <p>
        Fix accuracy first. If the keyword is wrong, change the keyword — do not force a mismatched
        phrase into every sentence. Rebuild weak titles with the{' '}
        <Link href="/title-generator">Title Generator</Link>, expand thin copy with the{' '}
        <Link href="/description-generator">Description Generator</Link>, and refresh labels via the{' '}
        <Link href="/hashtag-generator">Hashtag Generator</Link>.
      </p>
      <p>
        For competitive context, extract ranking-video tags with the{' '}
        <Link href="/tags-extractor">Tags Extractor</Link> and compare title candidates in the{' '}
        <Link href="/title-analyzer">Title Analyzer</Link>.
      </p>

      <h2>Why a hygiene score still matters</h2>
      <p>
        Many uploads fail basic packaging: keyword missing from the title, 20-word descriptions, zero
        hashtags, or tag lists copied from an unrelated video. A weighted checker makes those issues
        visible in seconds so creative energy goes to thumbnail and watch-time design instead of
        hunting typos in Studio.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Chasing 100 with spam</strong> — Artificial repetition can raise a heuristic and still
          hurt viewers.
        </li>
        <li>
          <strong>Ignoring thumbnail and retention</strong> — Text SEO cannot rescue a misleading cover.
        </li>
        <li>
          <strong>Using the wrong target keyword</strong> — Optimize for the query you can satisfy.
        </li>
        <li>
          <strong>Skipping chapters on long videos</strong> — Structure scoring expects scannable
          organization; real chapters still need a leading <strong>0:00</strong>.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Research phrases with the <Link href="/keyword-generator">Keyword Generator</Link>, mine spoken
        keywords via the <Link href="/transcript-extractor">Transcript Extractor</Link>, and draft
        opens with the <Link href="/hook-generator">Hook Generator</Link> so the on-video experience
        matches the metadata you just improved.
      </p>
    </>
  );
}
