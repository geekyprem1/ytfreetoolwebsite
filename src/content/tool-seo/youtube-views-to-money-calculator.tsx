import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I convert YouTube views to money?',
    a: 'Views to Money = (Views ÷ 1000) × RPM. Example: 1,000,000 views × $2.50 RPM ÷ 1000 = $2,500 estimated. RPM is after YouTube’s 45% cut. Use your real RPM from Analytics for accuracy — the calculator also shows views needed for $100 and $1,000.',
  },
  {
    q: 'What RPM should I use if I am not monetized yet?',
    a: 'Start with $1.5–$3 for gaming/entertainment, $3–$6 for education/tech, $6–$12 for finance. Check public CPM benchmarks for your niche, then halve for RPM (55% split).',
  },
  {
    q: 'Why do two channels at 1M views earn very different amounts?',
    a: 'Niche, geography, watch length and monetized rate differ. Finance US traffic at 1M can pay $6K–$12K; meme compilation in Tier-3 at 1M may pay $300–$800. Views alone do not set pay — RPM does.',
  },
  {
    q: 'How many views do I need to make $100 on YouTube?',
    a: 'Views = ($100 ÷ RPM) × 1000. At $1.50 RPM you need ~66,666 views; at $5 RPM only 20,000 views. The result panel does this math instantly.',
  },
  {
    q: 'Does this include YouTube Premium and Shorts?',
    a: 'Blend with caution. Long-form RPM and Shorts RPM differ 50–100×. For Shorts, use the Shorts Earnings Calculator; for Premium, Studio blends it into RPM already.',
  },
  {
    q: 'Is this before or after tax?',
    a: 'Before tax, before expenses. It is gross creator revenue after YouTube’s cut but before your local tax, editor costs, music splits or MCN fees.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Views to money is a multiplication problem with one missing variable: your RPM</h2>
      <p>
        Everyone asks “How much is 1M views worth?” The honest answer: <code>(Views ÷ 1000) × RPM</code>.
        The <strong>YouTube Views to Money Calculator</strong> makes that one-liner actionable — enter
        any view count and your RPM and instantly see earnings, plus the reverse: how many views you
        need for $100, $500 and $1,000 goals. It turns vanity views into cash math.
      </p>
      <table>
        <thead>
          <tr>
            <th>Views</th>
            <th>At $1.50 RPM</th>
            <th>At $4 RPM</th>
            <th>At $8 RPM</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>10K</td><td>$15</td><td>$40</td><td>$80</td></tr>
          <tr><td>100K</td><td>$150</td><td>$400</td><td>$800</td></tr>
          <tr><td>1M</td><td>$1,500</td><td>$4,000</td><td>$8,000</td></tr>
          <tr><td>10M</td><td>$15,000</td><td>$40,000</td><td>$80,000</td></tr>
        </tbody>
      </table>

      <h2>How to convert views to money</h2>
      <ol>
        <li><strong>Enter views</strong> — any number you want to price (idea, forecast, actual).</li>
        <li><strong>Enter RPM</strong> — from Studio → Revenue → RPM for the same content type.</li>
        <li><strong>Calculate</strong> — read earnings, per-1K/100K and milestone views for $100/$1,000.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Instant (Views ÷ 1000) × RPM</li>
        <li>Per-1K and per-100K reference cards</li>
        <li>Reverse milestones: views for $100 and $1,000</li>
        <li>Zero network calls — local math only</li>
      </ul>

      <h2>How to make each view worth more</h2>
      <p>
        Don’t just chase more views — raise RPM. Target commercial keywords with the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>, package for higher-CPM intent with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>, and test titles via the{' '}
        <Link href="/title-analyzer">Title Analyzer</Link>. Verify advertiser side with the{' '}
        <Link href="/youtube-cpm-calculator">CPM Calculator</Link> and creator side with the{' '}
        <Link href="/youtube-rpm-calculator">RPM Calculator</Link>.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li><strong>Using someone else’s RPM</strong> — finance $8 vs gaming $1.5 breaks forecasting.</li>
        <li><strong>Mixing Shorts + long-form</strong> — segment them; blended RPM misleads.</li>
        <li><strong>Forgetting tax and costs</strong> — gross ≠ take-home.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Build forecasts with the <Link href="/youtube-money-calculator">Money Calculator</Link>, derive your RPM with the{' '}
        <Link href="/youtube-rpm-calculator">RPM Calculator</Link>, understand Watch Hours value with the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>, and check Shorts separately via the{' '}
        <Link href="/youtube-shorts-earnings-calculator">Shorts Earnings Calculator</Link>.
      </p>
    </>
  );
}
