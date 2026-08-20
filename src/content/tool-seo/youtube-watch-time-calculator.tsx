import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How is YouTube watch time calculated?',
    a: 'Watch Time (hours) = Views × Average View Duration (minutes) ÷ 60. Example: 50,000 views × 4.5 minutes = 225,000 minutes = 3,750 hours. The calculator adds days continuous and YPP % automatically.',
  },
  {
    q: 'How many watch hours do I need for monetization?',
    a: 'YouTube Partner Program requires 4,000 public watch hours in the last 12 months plus 1,000 subscribers (or 10M Shorts views in 90 days as alternative). Watch hours must be public — private, unlisted drafts and Shorts below the threshold don’t count the same way.',
  },
  {
    q: 'Where do I find my watch hours?',
    a: 'Studio → Analytics → Overview or Revenue. Filter last 365 days for YPP eligibility. Use that number to cross-check the calculator.',
  },
  {
    q: 'What is a good average view duration?',
    a: 'Depends on length: 40–50% retention is strong (e.g., 4 min AVD on a 10-min video). Under 30% signals hook or pacing problems. Use the Average View Duration Calculator to derive AVD from hours and views.',
  },
  {
    q: 'How many views do I need for 4,000 hours?',
    a: 'Views = 4,000 × 60 ÷ AVD. At 3.5 min AVD you need ~68,571 views; at 6 min AVD only 40,000 views. Longer AVD collapses the view requirement.',
  },
  {
    q: 'Do Shorts watch hours count?',
    a: 'Shorts views count toward 10M Shorts pathway, not the 4,000-hour long-form pathway. Studio separates them. The Watch Time Calculator here is for long-form watch hours.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Why watch time decides monetization before views do</h2>
      <p>
        Views get headlines; <strong>watch time</strong> gets monetization. YouTube’s Partner Program,
        recommendation weight and ad-inventory all scale with hours watched, not clicks. Two channels
        at 100K views can have 2K vs 8K watch hours depending on average view duration — the second
        earns 4× the watch-hour progress and surfaces far more in suggested.
      </p>
      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>Formula</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Watch Hours</td><td>Views × AVD ÷ 60</td><td>YPP gating + ad capacity</td></tr>
          <tr><td>AVD</td><td>Watch Minutes ÷ Views</td><td>Retention quality</td></tr>
          <tr><td>Retention %</td><td>AVD ÷ Video Length × 100</td><td>Pacing benchmark</td></tr>
        </tbody>
      </table>

      <h2>How to calculate watch time</h2>
      <ol>
        <li><strong>Enter views</strong> — total for period or per video.</li>
        <li><strong>Enter AVD</strong> — average view duration in minutes + seconds (from Analytics → Engagement).</li>
        <li><strong>Calculate</strong> — read hours, days continuous, YPP % and views needed for 4K hours.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Minutes + seconds precision for accurate AVD</li>
        <li>Hours → days and YPP 4,000-hour progress bar</li>
        <li>Reverse math: views needed for 4K hours</li>
        <li>Zero login, instant recalculation</li>
      </ul>

      <h2>How to reach 4,000 hours faster</h2>
      <p>
        Lift AVD, not just publish more. Strengthen hooks with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>, chapter with the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link> to reduce drop-off, and study
        transcript pacing via the <Link href="/transcript-extractor">Transcript Extractor</Link>. Compare
        concepts with the <Link href="/title-analyzer">Title Analyzer</Link> and audit retention intent
        with the <Link href="/youtube-average-view-duration-calculator">Average View Duration Calculator</Link>.
      </p>

      <h2>Benchmarks</h2>
      <ul>
        <li><strong>New channel</strong> — 0–500 hours/month is normal; focus on AVD over volume.</li>
        <li><strong>Approaching YPP</strong> — 300–500 hours/month closes 4K in 8–12 months with weekly uploads.</li>
        <li><strong>Post-YPP</strong> — track hours per video to forecast inventory for mid-rolls.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Derive AVD with the <Link href="/youtube-average-view-duration-calculator">Average View Duration Calculator</Link>,
        plan cadence with the <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>,
        measure stickiness with the <Link href="/youtube-engagement-calculator">Engagement Calculator</Link>, and forecast
        revenue from those hours via the <Link href="/youtube-money-calculator">Money Calculator</Link>.
      </p>
    </>
  );
}
