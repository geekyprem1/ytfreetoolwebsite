import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I calculate subscriber growth rate?',
    a: 'Growth Rate = (Gain ÷ Starting Subscribers) × 100. Example: 10,000 → 12,500 in 30 days = 2,500 ÷ 10,000 × 100 = 25% in 30 days. Per-day = Gain ÷ Days. The calculator shows both plus projection.',
  },
  {
    q: 'What is a good subscriber growth rate?',
    a: 'Under 10K: 5–15%/month is solid; 15K–100K: 3–8%/month; 100K+: 1–3%/month is healthy (law of large numbers). Above 10%/month at scale usually means a viral hit feeding subs.',
  },
  {
    q: 'Where do I find subscriber counts for a period?',
    a: 'Studio → Analytics → Audience → Subscribers, set date range. Or use the Channel Statistics tool here to snapshot any public channel instantly.',
  },
  {
    q: 'How does the 1-year projection work?',
    a: 'It is linear: Current + (Per-Day × 365). Real growth compounds and spikes, so use it as a bearing, not a guarantee. Viral outliers will beat the line; dry spells will lag it.',
  },
  {
    q: 'When will I hit 100K at my current pace?',
    a: 'Days to 100K = (100,000 − Current) ÷ Per-Day. The calculator shows this if per-day is positive. Example: 12.5K at +83/day → ~1,054 days (~35 months) linearly.',
  },
  {
    q: 'Does subscriber growth equal views growth?',
    a: 'Not 1:1. Subs grow from browse/suggested loops and intent search. A channel can stall at 50K subs while views rise if non-subs drive traffic, or vice versa after a Shorts viral spike.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Why subscriber growth rate matters more than total subs</h2>
      <p>
        Totals impress; <strong>growth rate</strong> diagnoses momentum. A channel at 80K gaining
        400/month (+0.5%) is decaying vs one at 12K gaining 900/month (+7.5%) that will lap it in a
        year. Rate normalizes size so you can compare your current self to past self, to competitors,
        and to the pace needed for play-button goals without vanity math.
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Formula</th>
            <th>Signal</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Gain</td><td>Current − Start</td><td>Absolute lift</td></tr>
          <tr><td>Growth Rate</td><td>Gain ÷ Start × 100</td><td>Momentum %</td></tr>
          <tr><td>Per Day</td><td>Gain ÷ Days</td><td>Cadence health</td></tr>
          <tr><td>Per Month</td><td>Per Day × 30</td><td>Ops forecast</td></tr>
        </tbody>
      </table>

      <h2>How to calculate subscriber growth</h2>
      <ol>
        <li><strong>Enter start and current subscribers</strong> — pick a period (7, 28, 90 days).</li>
        <li><strong>Enter days</strong> — match the date range.</li>
        <li><strong>Calculate</strong> — read gain, growth %, per-day, per-month, 1-year linear projection and days to 100K.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Gain, growth %, per-day and per-month in one view</li>
        <li>1-year linear projection</li>
        <li>Days to 100K estimator</li>
        <li>No API, no login — paste public counts</li>
      </ul>

      <h2>How to accelerate subscriber growth</h2>
      <p>
        Grow per-video subs, not just uploads. Nail the first 30 seconds with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>, package intent clearer with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>, and study what actually drives subs
        via <Link href="/video-statistics">Video Statistics</Link> vs <Link href="/channel-statistics">Channel Statistics</Link>.
        Batch ideas with the <Link href="/shorts-ideas">Shorts Idea Generator</Link> and{' '}
        <Link href="/title-generator">Title Generator</Link> to keep cadence without burnout — check
        cadence with the <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li><strong>Judging 7-day noise</strong> — use 28–90 day windows for signal.</li>
        <li><strong>Sub4Sub</strong> — inflates count, collapses retention and RPM.</li>
        <li><strong>Ignoring churn</strong> — net gain = gross subs − unsubscribes; check Analytics net.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Cross-check with <Link href="/channel-statistics">Channel Statistics</Link> and{' '}
        <Link href="/video-statistics">Video Statistics</Link>, plan cadence with the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>, and model revenue per new subscriber via the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link>.
      </p>
    </>
  );
}
