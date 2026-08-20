import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How does the YouTube Money Calculator estimate earnings?',
    a: 'It uses (Views × Monetized Play Rate ÷ 1000) × CPM. For example, 100K views at $4 CPM and 55% monetized rate = 55,000 monetized views ÷ 1000 × $4 = $220 estimated gross. Creators keep ~55% → ~$121 RPM. The tool shows a ±30% range for seasonality and niche variance.',
  },
  {
    q: 'What CPM should I enter for an accurate estimate?',
    a: 'Use your real CPM/RPM from YouTube Analytics → Revenue. If you are pre-monetization, start with $2–$4 for entertainment/gaming, $6–$12 for finance/tech/education, and $0.5–$2 for memes/kids. Search “YouTube CPM by niche 2025” for benchmarks.',
  },
  {
    q: 'Why does the tool ask for monetized play rate?',
    a: 'Not every view shows an ad — skips, Premium, ad blockers and Shorts reduce monetized rate. Long-form averages 45–65% on i.ytimg.com-era CDN logic; Shorts are far lower. Leaving it at 55% is a safe default for long-form.',
  },
  {
    q: 'Is this the same as YouTube Studio estimated revenue?',
    a: 'No. Studio shows exact attributed revenue after YouTube’s 45% cut and valid-play filters. This is a planning estimate before upload. Plug Studio RPM to forecast future videos.',
  },
  {
    q: 'How many views do I need to earn $1,000?',
    a: 'Views = ($1,000 ÷ RPM) × 1000. At $2.50 RPM you need 400K views; at $8 RPM you need 125K views. Use the Views to Money Calculator for exact math at your RPM.',
  },
  {
    q: 'Does location and season change earnings?',
    a: 'Yes. US/UK/CA viewers pay higher CPM; Q4 (Oct–Dec) CPMs can be 30–50% higher than January. The range in the result covers this swing — plan with the conservative (low) number.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the YouTube Money Calculator does</h2>
      <p>
        This free <strong>YouTube Money Calculator</strong> turns any view count into an estimated
        earnings range using your CPM and monetized play rate — the two numbers that actually move
        revenue. It is a planning tool, not a Studio replacement. Use it before you publish to set
        realistic income expectations and compare video ideas by revenue potential, not just views.
      </p>
      <table>
        <thead>
          <tr>
            <th>Input</th>
            <th>What to enter</th>
            <th>Typical range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Views</td>
            <td>Total views you expect</td>
            <td>1K – 10M</td>
          </tr>
          <tr>
            <td>CPM</td>
            <td>Advertiser cost per 1,000 monetized views</td>
            <td>$1 – $15</td>
          </tr>
          <tr>
            <td>Monetized play rate</td>
            <td>% of views that served an ad</td>
            <td>45% – 65%</td>
          </tr>
        </tbody>
      </table>
      <p>
        Formula: <code>Earnings = (Views × Monetized Rate ÷ 1000) × CPM × 0.55 Creator Split</code> is
        approximated inside the cleaner <code>Monetized Views ÷ 1000 × CPM</code> shown in the result.
        The UI then shows revenue per 1K and per 1M views for quick comparisons.
      </p>

      <h2>How to estimate YouTube earnings in 3 steps</h2>
      <ol>
        <li>
          <strong>Enter views</strong> — Use a past video’s views or a forecast (e.g., 100,000 if your
          average is 80K–120K).
        </li>
        <li>
          <strong>Enter CPM</strong> — Copy from Analytics → Revenue → CPM, or estimate by niche (see
          benchmarks below).
        </li>
        <li>
          <strong>Set monetized rate</strong> — Leave at 55% for long-form; lower to 15–30% if your
          audience is heavily mobile or Shorts-driven. Click Calculate.
        </li>
      </ol>

      <h2>CPM benchmarks by niche (planning defaults)</h2>
      <table>
        <thead>
          <tr>
            <th>Niche</th>
            <th>Typical CPM</th>
            <th>RPM (55%)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Finance / Investing</td><td>$12 – $25</td><td>$6 – $14</td></tr>
          <tr><td>Tech / Software</td><td>$6 – $15</td><td>$3 – $8</td></tr>
          <tr><td>Education</td><td>$5 – $12</td><td>$2.5 – $6.5</td></tr>
          <tr><td>Health / Fitness</td><td>$4 – $10</td><td>$2 – $5.5</td></tr>
          <tr><td>Gaming / Entertainment</td><td>$2 – $6</td><td>$1 – $3.3</td></tr>
          <tr><td>Memes / Compilation</td><td>$0.5 – $3</td><td>$0.3 – $1.6</td></tr>
        </tbody>
      </table>
      <p>
        Geography multiplies this: Tier-1 CPMs (US, UK, AU, CA) are 3–5× India/SEA. A Hindi gaming
        channel and an English finance channel at the same 1M views can differ 10× in payout.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Monetized views math built-in — no manual % calculation</li>
        <li>Low/high range (±30%) for seasonality</li>
        <li>Per-1K and per-1M quick conversions</li>
        <li>100% client-side — no data sent, no login</li>
        <li>Mobile-friendly for on-the-go forecasting</li>
      </ul>

      <h2>How to increase earnings without chasing views</h2>
      <p>
        Raise CPM, not just views. Target higher-CPM keywords with the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>, package for Tier-1 search intent, and
        keep viewers past 50% retention so mid-rolls serve — that lifts monetized rate. Score packaging
        with the <Link href="/seo-score-checker">SEO Score Checker</Link> and test titles in the{' '}
        <Link href="/title-analyzer">Title Analyzer</Link> before you record.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li><strong>Using $10 CPM for entertainment</strong> — you will over-forecast 3×.</li>
        <li><strong>Forgetting monetized rate</strong> — 100K views ≠ 100K monetized views.</li>
        <li><strong>Planning on gross CPM</strong> — you keep ~55%; RPM is the real number.</li>
        <li><strong>Ignoring seasonality</strong> — January RPM can be half of December.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Convert precisely at your real RPM with the{' '}
        <Link href="/youtube-views-to-money-calculator">Views to Money Calculator</Link>, reverse-engineer with the{' '}
        <Link href="/youtube-rpm-calculator">RPM Calculator</Link> and{' '}
        <Link href="/youtube-cpm-calculator">CPM Calculator</Link>, and check watch-hours economics with the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link> and{' '}
        <Link href="/monetization-checker">Monetization Checker</Link>.
      </p>
    </>
  );
}
