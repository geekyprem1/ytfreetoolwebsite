import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I calculate average view duration on YouTube?',
    a: 'AVD = Total Watch Minutes ÷ Total Views. Example: 4,000 watch hours × 60 = 240,000 minutes ÷ 100,000 views = 2.4 minutes AVD. If the video is 10 minutes, Retention = 2.4 ÷ 10 × 100 = 24%. The calculator shows both plus a Low–Excellent label.',
  },
  {
    q: 'Where do I find watch time and views for AVD?',
    a: 'Studio → Analytics → Overview or Engagement → Watch Time and Views for same period/video. Copy both into the calculator. For retention you also need video length.',
  },
  {
    q: 'What is a good average view duration?',
    a: 'Absolute AVD is meaningless without length. Retention % is the benchmark: 40–60% is excellent for 8–12 min, 30–40% average, under 30% needs hook/pacing work. For 60-min podcasts, 15–25% retention can be strong.',
  },
  {
    q: 'Does AVD affect YouTube ranking?',
    a: 'Heavily. YouTube optimizes for satisfaction, and AVD + retention are strong proxies for “this held attention.” Higher AVD at same retention often gets more suggested inventory.',
  },
  {
    q: 'How do retention and CTR interact?',
    a: 'CTR gets the click, retention earns the push. A 6% CTR at 22% retention will decay; a 4% CTR at 48% retention can compound. Balance packaging (title/thumbnail) and payoff, not just CTR.',
  },
  {
    q: 'Can I compare AVD across videos of different lengths?',
    a: 'Compare retention %, not minutes. A 3-min AVD on a 5-min video (60%) beats a 4-min AVD on a 15-min video (27%), even though 4 > 3 numerically.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Average view duration turns hours into a quality signal</h2>
      <p>
        Watch hours tell you <em>how much</em> was watched; <strong>average view duration</strong>{' '}
        tells you <em>how well</em> each view was held. The same 4,000 hours from 100K vs 400K views
        is 2.4 min vs 0.6 min AVD — the first holds attention 4× longer and will be pushed 4× more.
        This calculator derives AVD from watch hours and views, then frames it as retention % against
        your video length for a true quality read.
      </p>
      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>Formula</th>
            <th>Benchmark</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>AVD</td><td>Watch Minutes ÷ Views</td><td>2–6 min typical (8–15m video)</td></tr>
          <tr><td>Retention %</td><td>AVD ÷ Video Length ×100</td><td>40–60% excellent</td></tr>
          <tr><td>Watch Hours</td><td>Views × AVD ÷ 60</td><td>4,000 needed for YPP</td></tr>
        </tbody>
      </table>

      <h2>How to calculate average view duration</h2>
      <ol>
        <li><strong>Enter watch hours</strong> — total for the video or period.</li>
        <li><strong>Enter views</strong> — same scope as watch hours.</li>
        <li><strong>Enter video length (optional)</strong> — to derive retention % and Low–Excellent label.</li>
        <li><strong>Calculate</strong> — read AVD in mm:ss and minutes, plus retention.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>mm:ss + decimal minutes dual display</li>
        <li>Retention % vs video length with rating</li>
        <li>Benchmark guidance (40–60% band)</li>
        <li>Instant, private — no data leaves browser</li>
      </ul>

      <h2>How to improve AVD by 30–60 seconds</h2>
      <p>
        Tighten the first 15 seconds — that is where 30% of drop occurs. Script with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>, remove dead air by reading transcript pacing via the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link>, and chapter tightly with the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link> so viewers skip forward, not out.
        Package honestly with the <Link href="/title-analyzer">Title Analyzer</Link> — clickbait AVD dies on payoff mismatch.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li><strong>Chasing AVD on bloated length</strong> — 18 minutes at 22% retention &lt; 10 minutes at 48%.</li>
        <li><strong>Ignoring the first 30 seconds</strong> — the drop cliff lives there.</li>
        <li><strong>Comparing minutes across lengths</strong> — always normalize to retention %.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Contextualize with the <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>, measure parallel engagement via the{' '}
        <Link href="/youtube-engagement-calculator">Engagement Calculator</Link>, plan upload impact with the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>, and model revenue per AVD gain with the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link>.
      </p>
    </>
  );
}
