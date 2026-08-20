import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How much does YouTube pay for Shorts views?',
    a: 'Shorts revenue is pooled, then allocated by views and music usage. Typical Shorts RPM is $0.01–$0.08 per 1,000 views — about 50–100× lower than long-form. Example: 1M views at $0.03 RPM = $30. The calculator shows a $0.01–$0.05 range for pool variance.',
  },
  {
    q: 'How do I find my Shorts RPM?',
    a: 'Studio → Analytics → Revenue → filter Content Type = Shorts Feed. Look for RPM or revenue per mille for Shorts. Use that exact number in the calculator.',
  },
  {
    q: 'Why do Shorts pay so little per view?',
    a: 'Ads on Shorts are less valuable (short attention, limited inventory), revenue is pooled across all Shorts and split, and music-licensed Shorts share revenue with rights holders. Long-form mid-rolls monetize intent far better.',
  },
  {
    q: 'How many views do I need for $1,000 from Shorts?',
    a: 'At $0.03 RPM you need ~33M views; at $0.07 RPM ~14M views; at $0.015 RPM ~66M views. That is why brands and funnels matter more than Shorts ad cents.',
  },
  {
    q: 'Do Shorts counts mix with long-form RPM?',
    a: 'Don’t blend them. A channel with 10M Shorts + 500K long-form can show a blended $0.20 RPM that hides a $4 long-form RPM. Segment by content type in Analytics.',
  },
  {
    q: 'Can I use this calculator for pre-monetization planning?',
    a: 'Yes. Use $0.02–$0.04 as conservative planning RPM if you have no data. After monetization, replace with your Studio RPM for accuracy.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Shorts earnings are a pool problem, not a views problem</h2>
      <p>
        YouTube Shorts monetization since Feb 2023 uses a <strong>Creator Pool</strong>: all Shorts ad
        revenue is pooled, then allocated by each creator’s share of total Shorts views, minus music
        splits. Your take is <code>(Views ÷ 1000) × Shorts RPM</code> — but Shorts RPM lives around{' '}
        <strong>$0.01–$0.08</strong>, so 1M Shorts views often yields $10–$80, not $1,000s. This
        calculator makes that expectation gap visible before you bet your calendar on Shorts alone.
      </p>
      <table>
        <thead>
          <tr>
            <th>Shorts Views</th>
            <th>At $0.02 RPM</th>
            <th>At $0.05 RPM</th>
            <th>Long-form $4 RPM for contrast</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>100K</td><td>$2</td><td>$5</td><td>$400</td></tr>
          <tr><td>1M</td><td>$20</td><td>$50</td><td>$4,000</td></tr>
          <tr><td>10M</td><td>$200</td><td>$500</td><td>$40,000</td></tr>
        </tbody>
      </table>

      <h2>How to estimate Shorts earnings</h2>
      <ol>
        <li><strong>Enter Shorts views</strong> — total or per video.</li>
        <li><strong>Enter Shorts RPM</strong> — from Studio filter or $0.02 planning default.</li>
        <li><strong>Calculate</strong> — read earnings, per-million, and low/high pool range.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Shorts-specific RPM defaults (0.01–0.08)</li>
        <li>Per-million payout card</li>
        <li>Pool variance low/high range</li>
        <li>No login, instant recalculation</li>
      </ul>

      <h2>How to make Shorts pay anyway</h2>
      <p>
        Treat Shorts as <em>discovery</em>, not payroll. Funnel Shorts viewers to long-form with end
        screens and series playlists — ideate with the <Link href="/shorts-ideas">Shorts Idea Generator</Link> and{' '}
        <Link href="/hook-generator">Hook Generator</Link>, then package long-form with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>. Track the funnel: Shorts views via this calculator vs long-form via the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link> and{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>.
      </p>

      <h2>Related tools</h2>
      <p>
        Compare to long-form with the <Link href="/youtube-views-to-money-calculator">Views to Money Calculator</Link> and{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link>, audit cadence with the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>, and grow intent traffic via the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>.
      </p>
    </>
  );
}
