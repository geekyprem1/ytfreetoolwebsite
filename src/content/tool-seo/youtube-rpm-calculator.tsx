import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What is RPM on YouTube and how is it different from CPM?',
    a: 'RPM (Revenue Per Mille) is what you, the creator, actually earn per 1,000 views after YouTube’s 45% cut. CPM (Cost Per Mille) is what advertisers pay before the cut. RPM = CPM × 0.55 on average. Use RPM for channel math, CPM for advertiser comparisons.',
  },
  {
    q: 'How do I calculate RPM manually?',
    a: 'RPM = (Total Revenue ÷ Total Views) × 1000. Example: $500 ÷ 100,000 views × 1000 = $5 RPM. The calculator does this instantly and also shows per-view and CPM equivalents.',
  },
  {
    q: 'Where do I find my real RPM?',
    a: 'YouTube Studio → Analytics → Revenue → RPM. It is shown per video, per period and by geography. Use that number in the Views to Money Calculator for forecasts.',
  },
  {
    q: 'What is a good RPM for a small channel?',
    a: 'Depends on niche: $1–$3 is normal for entertainment/gaming, $3–$6 for education/tech, $6+ for finance. Under $0.50 usually means Shorts-heavy or non-monetized traffic.',
  },
  {
    q: 'Does RPM include Shorts?',
    a: 'Studio blends long-form, Shorts and Live differently. Filter by content type in Analytics to see long-form RPM vs Shorts RPM vs Live RPM separately — they differ 10–100×.',
  },
  {
    q: 'Can I compare RPM across videos?',
    a: 'Yes. Two videos at 100K views with $2 vs $5 RPM = $200 vs $500. Same views, 2.5× revenue. That tells you which topic and audience to double down on.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What RPM means and why it beats CPM for creators</h2>
      <p>
        <strong>RPM — Revenue Per Mille</strong> answers: “For every 1,000 views I get, how many dollars
        land in my bank after YouTube’s share and invalid traffic filters?” It is the only
        creator-realistic number. CPM is the advertiser price tag; RPM is your paycheck.
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Formula</th>
            <th>Who cares</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>RPM</td><td>(Revenue ÷ Views) × 1000</td><td>Creators — your earnings</td></tr>
          <tr><td>CPM</td><td>(Ad Revenue ÷ Monetized Views) × 1000</td><td>Advertisers — their cost</td></tr>
          <tr><td>Playback CPM</td><td>CPM on monetized playbacks only</td><td>Ops — inventory view</td></tr>
        </tbody>
      </table>

      <h2>How to calculate YouTube RPM</h2>
      <ol>
        <li><strong>Copy revenue</strong> — Studio → Analytics → Revenue for the same period as views.</li>
        <li><strong>Copy views</strong> — Same date range and content filter (long-form vs Shorts).</li>
        <li><strong>Calculate</strong> — Paste both here and read RPM, per-view, per-million and estimated CPM.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Instant (Revenue ÷ Views) × 1000 math</li>
        <li>Per-view and per-million conversions</li>
        <li>Implied CPM preview (RPM ÷ 0.55)</li>
        <li>No data leaves your device</li>
        <li>Works for any period: 7 days, 28 days, lifetime</li>
      </ul>

      <h2>What to do with your RPM</h2>
      <p>
        Forecast: <code>Future Earnings = (Expected Views ÷ 1000) × RPM</code>. If your RPM is $4 and
        you forecast 300K views next month, budget $1,200. Improve RPM by targeting higher-CPM topics
        — research with the <Link href="/keyword-generator">Keyword Generator</Link> and validate with the{' '}
        <Link href="/youtube-cpm-calculator">CPM Calculator</Link>. Compare earnings efficiently via the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link> and{' '}
        <Link href="/youtube-views-to-money-calculator">Views to Money Calculator</Link>.
      </p>

      <h2>How to raise RPM by 20–50%</h2>
      <ul>
        <li><strong>Increase retention past 45%</strong> — more mid-rolls serve, lifting monetized rate.</li>
        <li><strong>Make 8+ minute videos</strong> — enables multiple mid-rolls; keep them non-intrusive.</li>
        <li><strong>Attract Tier-1 viewers</strong> — titles/descriptions in English for US/UK intent score higher.</li>
        <li><strong>Cut low-value traffic</strong> — misleading packaging brings views but tanks RPM.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Forecast with the <Link href="/youtube-money-calculator">YouTube Money Calculator</Link> and{' '}
        <Link href="/youtube-views-to-money-calculator">Views to Money Calculator</Link>, see advertiser side with the{' '}
        <Link href="/youtube-cpm-calculator">CPM Calculator</Link>, and audit watch value with the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link> and{' '}
        <Link href="/youtube-average-view-duration-calculator">Average View Duration Calculator</Link>.
      </p>
    </>
  );
}
