import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I calculate upload frequency?',
    a: 'Frequency = Total Videos ÷ Days. Per Week = Frequency × 7, Per Month = Frequency × 30. Gap Days = Days ÷ Videos. Example: 50 videos in 90 days = 0.55/day = 3.89/week = every 1.8 days.',
  },
  {
    q: 'How often should I upload to YouTube?',
    a: 'For most creators 1–2×/week is the sustainable sweet spot. Daily only if quality holds and you have team. YouTube rewards consistency over volume — a steady 1/week beats a 7-video burst then burnout.',
  },
  {
    q: 'Does posting more always help growth?',
    a: 'No. Extra uploads below quality threshold hurt AVD and engagement, signaling low value to the recommendation system. Use the SEO Score Checker to keep bar high regardless of frequency.',
  },
  {
    q: 'How do I audit my frequency?',
    a: 'Pick a window (30, 90, 365 days), count uploads in that window (Studio → Content → filter by date), enter both numbers. The calculator shows per-day, per-week, per-month and gap days.',
  },
  {
    q: 'What is a good upload gap?',
    a: 'Weekly (every 7 days) is versatile; twice-weekly (every 3–4 days) suits fast niches (news, gaming). Monthly+ works for high-production (docs, essays) if retention is elite.',
  },
  {
    q: 'Should Shorts frequency mix with long-form?',
    a: 'Separate them. Audit long-form cadence and Shorts cadence independently — blending hides whether your core (8–15 min) engine is consistent.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Upload frequency is a consistency contract with the algorithm</h2>
      <p>
        The recommendation system and your audience both learn a cadence. The{' '}
        <strong>YouTube Upload Frequency Calculator</strong> quantifies that contract: videos per day,
        per week, per month and average gap days between uploads. It is the simplest audit — two
        numbers in, one clarity out — so you can decide whether to add a slot, cut a slot, or protect
        the one you have.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cadence</th>
            <th>Per Week</th>
            <th>Label</th>
            <th>Who it suits</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Daily</td><td>~7/week</td><td>High — daily-ish</td><td>News, Shorts, teams</td></tr>
          <tr><td>Twice-weekly</td><td>2/week</td><td>Good — weekly+</td><td>Gaming, commentary</td></tr>
          <tr><td>Weekly</td><td>1/week</td><td>Good — weekly</td><td>Most niches</td></tr>
          <tr><td>Bi-weekly</td><td>0.5/week</td><td>Moderate</td><td>Essays, tutorials</td></tr>
          <tr><td>Monthly</td><td>~0.25/week</td><td>Low</td><td>Docs, high-prod</td></tr>
        </tbody>
      </table>

      <h2>How to calculate upload frequency</h2>
      <ol>
        <li><strong>Count uploads</strong> — total videos in the window (include only the type you are auditing).</li>
        <li><strong>Enter period days</strong> — 30 for monthly, 90 for quarterly, 365 for yearly health.</li>
        <li><strong>Calculate</strong> — read per-week/month/year and gap days plus consistency label.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Per-day, per-week, per-month and per-year projections</li>
        <li>Gap days (average days between uploads)</li>
        <li>Consistency label (High / Good / Moderate / Low) with guidance</li>
        <li>Instant, local — no account or extension</li>
      </ul>

      <h2>How to pick your sustainable frequency</h2>
      <p>
        Audit first, then decide. Use this calculator on the last 90 days, then research sustainable
        cadence: can you keep packaging quality at 2×/week? Grade 3 recent uploads with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link> — if scores drop at higher frequency,
        hold weekly and build ideas backlog with the <Link href="/title-generator">Title Generator</Link>,{' '}
        <Link href="/shorts-ideas">Shorts Idea Generator</Link> and{' '}
        <Link href="/hook-generator">Hook Generator</Link> before adding a slot. Watch time impact? Check the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>.
      </p>

      <h2>Related tools</h2>
      <p>
        Validate capacity with <Link href="/video-statistics">Video Statistics</Link> and{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, plan watch-hours at that frequency via the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>, and forecast earnings impact with the{' '}
        <Link href="/youtube-money-calculator">Money Calculator</Link>.
      </p>
    </>
  );
}
