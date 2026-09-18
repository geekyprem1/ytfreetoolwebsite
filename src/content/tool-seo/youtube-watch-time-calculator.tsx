import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How is YouTube watch time calculated?',
    a: 'Watch Time (hours) = Views × Average View Duration (minutes) ÷ 60. Example: 50,000 views × 4.5 minutes = 225,000 minutes = 3,750 hours. The calculator adds days continuous and YPP % automatically.',
  },
  {
    q: 'How many watch hours do I need for monetization?',
    a: 'Through 31 January 2027, full YouTube Partner Program entry requires 4,000 qualified long-form watch hours in the last 365 days plus 1,000 subscribers (or 10M qualified Shorts views in 90 days). For new applicants from 1 February 2027, the watch-hour and Shorts-view targets rise to 8,000 and 20M. Meeting a threshold does not guarantee approval.',
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
    q: 'How many views do I need for 4,000 or 8,000 hours?',
    a: 'Views = target watch hours × 60 ÷ average view duration. At a 3.5-minute AVD, 4,000 hours needs about 68,571 views and 8,000 hours needs about 137,143. Longer average view duration reduces the view requirement.',
  },
  {
    q: 'Do Shorts watch hours count?',
    a: 'Shorts Feed watch time does not count toward the long-form watch-hour pathway. Through 31 January 2027, qualified Shorts views can satisfy the separate 10M-in-90-days pathway; the announced target for new applicants becomes 20M from 1 February 2027. This calculator is for long-form watch hours.',
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
        <li><strong>Calculate</strong> — read hours, days continuous, current YPP % and the upcoming target side by side.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Minutes + seconds precision for accurate AVD</li>
        <li>Hours → days plus current 4,000-hour and upcoming 8,000-hour YPP progress</li>
        <li>Reverse math: views needed for both watch-hour targets</li>
        <li>Zero login, instant recalculation</li>
      </ul>

      <h2>How to reach your YPP watch-hour target faster</h2>
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
        <li><strong>Approaching YPP</strong> — 300–500 hours/month closes the current 4K target in roughly 8–12 months; new applicants should also plan against the 8K threshold effective 1 February 2027.</li>
        <li><strong>Post-YPP</strong> — track hours per video to forecast inventory for mid-rolls.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Derive AVD with the <Link href="/youtube-average-view-duration-calculator">Average View Duration Calculator</Link>,
        plan cadence with the <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>,
        measure stickiness with the <Link href="/youtube-engagement-calculator">Engagement Calculator</Link>, and forecast
        revenue from those hours via the <Link href="/youtube-money-calculator">Money Calculator</Link>. For a
        full subscriber, watch-hour and Shorts-view plan, use the{' '}
        <Link href="/youtube-monetization-progress-calculator">Monetization Progress Calculator</Link>.
      </p>
    </>
  );
}
