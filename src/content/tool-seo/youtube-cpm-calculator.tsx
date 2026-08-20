import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What is CPM on YouTube?',
    a: 'CPM (Cost Per Mille) is what advertisers pay per 1,000 monetized playbacks. YouTube takes ~45%, so creators see ~55% as RPM. A $7 CPM ≈ $3.85 RPM. The calculator shows both.',
  },
  {
    q: 'How do I calculate CPM?',
    a: 'CPM = (Gross Ad Revenue ÷ Monetized Playbacks) × 1000. Example: $1,000 ÷ 200,000 monetized views × 1000 = $5 CPM. Monetized playbacks ≠ total views — use the monetized number from Analytics.',
  },
  {
    q: 'Where do I find CPM in YouTube Studio?',
    a: 'Studio → Analytics → Revenue → CPM or Playback-based CPM. Filter by date and content type. Use playback-based CPM for apples-to-apples with the calculator.',
  },
  {
    q: 'What is a good CPM?',
    a: 'Entertainment $2–$6, Education $5–$12, Tech $6–$15, Finance $12–$25. Shorts CPM lives near $0.02–$0.15 due to pooled monetization. Anything above your niche median is strong.',
  },
  {
    q: 'Why is my CPM high but RPM low?',
    a: 'RPM = CPM × Monetized Rate × 55%. If only 30% of views are monetized, even an $8 CPM yields ~$1.32 RPM. Fix retention and ad-friendly packaging to lift monetized rate.',
  },
  {
    q: 'Does CPM change by season?',
    a: 'Yes. Q4 CPMs are typically 30–50% above January lows. Advertisers spend heavily before holidays. Plan annual forecasts with a blended $CPM, not December alone.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What YouTube CPM tells you that RPM hides</h2>
      <p>
        <strong>CPM</strong> is the advertiser spend; <strong>RPM</strong> is your take-home. Two
        channels can have the same CPM but different RPMs if one has sketchy traffic or low
        retention that suppresses monetized play rate. This calculator isolates CPM so you can
        benchmark niche value independent of your current monetization hygiene.
      </p>
      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>What it answers</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CPM</td><td>How valuable is my inventory to advertisers?</td></tr>
          <tr><td>RPM</td><td>How much do I actually keep per mille?</td></tr>
          <tr><td>Monetized rate</td><td>What % of views showed an ad?</td></tr>
        </tbody>
      </table>

      <h2>How to calculate CPM</h2>
      <ol>
        <li><strong>Copy gross ad revenue</strong> — Studio → Revenue → before YouTube cut, or estimate.</li>
        <li><strong>Copy monetized playbacks</strong> — not total views; find “Monetized playbacks” in Analytics.</li>
        <li><strong>Calculate</strong> — paste both; read CPM, implied RPM and per-view value.</li>
      </ol>

      <h2>CPM by content type</h2>
      <ul>
        <li><strong>Long-form (8–15 min)</strong> — $3–$15 typical; supports mid-rolls; highest monetized rate.</li>
        <li><strong>Shorts</strong> — $0.02–$0.15 RPM-equivalent; pooled pool, music splits.</li>
        <li><strong>Live</strong> — $3–$10 CPM but fewer ad breaks; Super Chats dominate.</li>
      </ul>

      <h2>How to increase CPM without changing niche</h2>
      <p>
        Use advertiser-friendly language (avoid heavy profanity, divisive politics), target commercial keywords via the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>, and design packaging that attracts
        Tier-1 search traffic. Grade titles with the <Link href="/title-analyzer">Title Analyzer</Link> and descriptions with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link> — clean metadata lifts both CPM and brand-safety scores.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Gross-to-net preview (CPM → RPM 55%)</li>
        <li>Per-monetized-view micro math</li>
        <li>Zero data collection, instant result</li>
        <li>Works for any niche and country</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        See creator take-home with the <Link href="/youtube-rpm-calculator">RPM Calculator</Link>, forecast earnings with the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link> and{' '}
        <Link href="/youtube-views-to-money-calculator">Views to Money Calculator</Link>, and check Shorts nuance with the{' '}
        <Link href="/youtube-shorts-earnings-calculator">Shorts Earnings Calculator</Link>.
      </p>
    </>
  );
}
