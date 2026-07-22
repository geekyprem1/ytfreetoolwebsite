import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Is the Title Analyzer a real YouTube A/B test?',
    a: 'No. YouTube does not offer native title A/B testing for all creators. This tool provides an AI-assisted side-by-side prediction of CTR potential, SEO fit, and emotional pull to help you choose before publishing.',
  },
  {
    q: 'What scores does the comparison include?',
    a: 'Typical outputs include a CTR-oriented prediction, an SEO score (0–100 style), an emotion score, detected power words, and a written winner analysis explaining the tradeoffs.',
  },
  {
    q: 'How long can each title be in the form?',
    a: 'The analyzer accepts titles up to 200 characters for comparison, but you should still prefer roughly 50–70 characters for real-world display so the full promise remains visible.',
  },
  {
    q: 'Do I need to enter a keyword?',
    a: 'Optional but recommended. A target keyword helps the SEO dimension judge placement and relevance between Title A and Title B.',
  },
  {
    q: 'Should I always publish the AI “winner”?',
    a: 'Not blindly. Use the analysis as a decision aid, then weigh brand voice, thumbnail fit, and what has worked on your channel historically.',
  },
  {
    q: 'Can I compare more than two titles?',
    a: 'Run pairwise comparisons. Keep a shortlist of three favorites, compare A vs B, then pit the winner against C until one remains.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the YouTube Title Analyzer compares</h2>
      <p>
        This free YouTube Title Analyzer compares two candidate headlines side by side with
        CTR-oriented guidance, SEO and emotion scores—not a live Studio A/B test. Prefer titles near
        40–60 characters, where about 21% higher CTR is common versus extremes.
      </p>
      <p>
        This is not a live YouTube experiment. Platform-native title A/B testing is not universally
        available, so creators need a pre-publish comparison layer. Treat outputs as informed
        predictions, then confirm with your analytics after release.
      </p>

      <h2>How to compare two titles</h2>
      <ol>
        <li>
          <strong>Paste Title A and Title B</strong> — Keep them honest alternatives for the same video.
        </li>
        <li>
          <strong>Add a target keyword (recommended)</strong> — Helps the SEO dimension stay grounded.
        </li>
        <li>
          <strong>Analyze</strong> — Review scores, power words, and the winner write-up.
        </li>
        <li>
          <strong>Check thumbnail congruence</strong> — The higher-scoring title still loses if the
          image tells a different story.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Side-by-side title comparison</li>
        <li>CTR-oriented prediction for packaging decisions</li>
        <li>SEO score and emotion score (0–100 style signals)</li>
        <li>Power-word detection and winner analysis</li>
        <li>Optional keyword input for relevance checks</li>
      </ul>

      <h2>How to interpret the scores</h2>
      <h3>CTR prediction</h3>
      <p>
        Estimates which phrasing may attract more clicks given clarity, curiosity, and specificity.
        High predicted CTR with a vague payoff can still hurt retention — optimize for qualified
        clicks.
      </p>
      <h3>SEO score</h3>
      <p>
        Looks at keyword presence, length practicality, and topical clarity. A title can win SEO while
        losing emotion; pick based on whether the upload is search-led or browse/suggested-led.
      </p>
      <h3>Emotion and power words</h3>
      <p>
        Emotional pull helps in competitive suggested feeds. Overused hype words can also signal
        clickbait. Prefer concrete stakes over empty superlatives.
      </p>

      <h2>A practical selection workflow</h2>
      <p>
        Generate a wide set with the <Link href="/title-generator">Title Generator</Link>, narrow to
        two finals here, then grade the full package — description, tags, hashtags — in the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>. If search demand is unclear, expand
        seeds with the <Link href="/keyword-generator">Keyword Generator</Link>.
      </p>

      <h2>Why pairwise analysis beats endless rewriting</h2>
      <p>
        Writers often oscillate between safe and spicy titles for hours. A constrained A-vs-B pass
        forces criteria into the open: which option fronts the keyword, which names the outcome, which
        truncates less around the 50–70 character display zone. Even when you disagree with the model,
        the rubric improves your judgment.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Comparing unrelated premises</strong> — Both titles must describe the same video.
        </li>
        <li>
          <strong>Ignoring truncation</strong> — A brilliant ending after character 90 may never appear
          on mobile search.
        </li>
        <li>
          <strong>Optimizing only for shock</strong> — Mismatch with content damages session time.
        </li>
        <li>
          <strong>Never reading the rationale</strong> — The written analysis often matters more than
          the raw winner label.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Study how competitors phrase ranking videos with the{' '}
        <Link href="/tags-extractor">Tags Extractor</Link> and{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link>, then sharpen the spoken open
        with the <Link href="/hook-generator">Hook Generator</Link> so the first seconds fulfill the
        title you selected.
      </p>
    </>
  );
}
