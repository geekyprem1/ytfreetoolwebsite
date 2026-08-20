import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How is YouTube engagement rate calculated?',
    a: 'Engagement Rate = (Likes + Comments + Shares) ÷ Views × 100. Example: (5,000 + 400 + 200) ÷ 100,000 × 100 = 5.6% → Excellent. Some add shares/saves; this tool includes them as optional input.',
  },
  {
    q: 'What is a good engagement rate on YouTube?',
    a: 'Long-form: 1–3% average, 3–5% good, 5%+ excellent. Shorts often 0.5–1.5% due to passive swiping. Compare within your niche — meme pages expect higher, finance lower but more valuable comments.',
  },
  {
    q: 'Is like rate different from engagement rate?',
    a: 'Yes. Like Rate = Likes ÷ Views × 100 isolates likes. Engagement Rate bundles interactions for a fuller health score. The calculator shows both plus comment rate.',
  },
  {
    q: 'Where do I find likes, comments and shares?',
    a: 'Studio → Analytics → Engagement per video or last 28 days. Shares appear under Engagement → Shares. Export or copy counts into the calculator.',
  },
  {
    q: 'Does engagement affect the algorithm?',
    a: 'Indirectly. Engagement signals satisfaction but retention and satisfaction surveys weigh heavier. Still, high engagement lifts comment ranking and can boost suggested placement via “valued watch” heuristics.',
  },
  {
    q: 'Should I include dislikes?',
    a: 'No — YouTube hides public dislikes and the classic formula excludes them. Track like-to-view as a quality proxy instead.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What engagement rate reveals beyond views</h2>
      <p>
        Views measure reach; <strong>engagement rate</strong> measures resonance. A 200K-view video at
        0.8% engagement likely had a curiosity gap but weak payoff; a 40K-view video at 6% has an
        audience that talks, saves and returns. Brands pay the second creator more despite fewer
        views because comment depth predicts purchase intent and community pull.
      </p>
      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>Formula</th>
            <th>Band</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Engagement Rate</td><td>(Likes+Comments+Shares) ÷ Views ×100</td><td>1–5% typical</td></tr>
          <tr><td>Like Rate</td><td>Likes ÷ Views ×100</td><td>1–4% typical</td></tr>
          <tr><td>Comment Rate</td><td>Comments ÷ Views ×100</td><td>0.2–0.8% typical</td></tr>
        </tbody>
      </table>

      <h2>How to calculate engagement rate</h2>
      <ol>
        <li><strong>Paste views</strong> — same period as engagements (per video or 28 days).</li>
        <li><strong>Add likes, comments, shares</strong> — shares optional but recommended for full picture.</li>
        <li><strong>Calculate</strong> — read overall rate, like rate, comment rate and Low/Average/Good/Excellent label.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Four-input flexible model (shares optional)</li>
        <li>Auto rating vs benchmarks</li>
        <li>Like and comment rate breakdown</li>
        <li>Client-side only — private counts stay private</li>
      </ul>

      <h2>How to lift engagement without bait</h2>
      <p>
        Ask one specific question per video, pin a thoughtful comment, and reply within the first hour.
        Script open loops with the <Link href="/hook-generator">Hook Generator</Link> and craft comment-worthy titles via the{' '}
        <Link href="/title-generator">Title Generator</Link>. Mine proven phrasing with the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link> and audit packaging via the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li><strong>Gaming with “comment below” spam</strong> — YouTube down-ranks empty prompts.</li>
        <li><strong>Comparing Shorts to long-form</strong> — different denominator behaviors; segment them.</li>
        <li><strong>Ignoring comment rate</strong> — comments predict community, likes alone do not.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Check stickiness with the <Link href="/youtube-average-view-duration-calculator">Average View Duration Calculator</Link>,
        watch-hours impact with the <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>, growth with the{' '}
        <Link href="/youtube-subscriber-growth-calculator">Subscriber Growth Calculator</Link>, and revenue per engaged viewer via the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link>.
      </p>
    </>
  );
}
