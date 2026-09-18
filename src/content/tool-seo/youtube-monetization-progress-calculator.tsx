import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What are the current YouTube monetization requirements?',
    a: 'Through 31 January 2027, the full YouTube Partner Program ads and Premium-revenue tier requires 1,000 subscribers plus either 4,000 qualified public watch hours from long-form videos in the previous 365 days or 10 million qualified public Shorts views in the previous 90 days. Meeting the numbers starts an application; YouTube still reviews the channel.',
  },
  {
    q: 'What changes for YouTube monetization in 2027?',
    a: 'For new applicants from 1 February 2027, YouTube says the full YPP entry requirement becomes 1,000 subscribers plus either 8,000 qualified watch hours in 365 days or 20 million qualified Shorts views in 90 days. Existing YPP creators are not retroactively required to meet the new entry bar.',
  },
  {
    q: 'Do Shorts watch hours count toward 4,000 or 8,000 watch hours?',
    a: 'No. Watch time from Shorts views in the Shorts Feed does not count toward the long-form watch-hour route. It belongs to the separate qualified Shorts-view route instead.',
  },
  {
    q: 'Can I join part of YPP at 500 subscribers?',
    a: 'In eligible countries, YouTube has an earlier-access tier: 500 subscribers, three public uploads in 90 days, and either 3,000 qualified watch hours in 365 days or 3 million qualified Shorts views in 90 days. It can unlock eligible fan-funding and Shopping features, not full ads/Premium revenue sharing.',
  },
  {
    q: 'Why does this calculator use qualified watch hours and qualified Shorts views?',
    a: 'The totals shown across YouTube Analytics are not always the totals used for YPP eligibility. Public status, rolling windows, content type and the source of a view can affect whether activity qualifies. Use the Earn tab in YouTube Studio as the final source of truth.',
  },
  {
    q: 'Does hitting the calculator target guarantee monetization?',
    a: 'No. It means you may satisfy the numerical eligibility threshold. YouTube also reviews policy compliance, channel status, country availability and other requirements before accepting a channel into YPP.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Plan your YouTube monetization progress with the right target</h2>
      <p>
        A subscriber count alone does not tell you how close a channel is to YouTube monetization. The full
        YouTube Partner Program (YPP) entry route combines subscribers with either qualified long-form watch
        hours or qualified Shorts views, and both activity measurements use rolling windows. This calculator
        turns those separate Studio numbers into a single practical progress view.
      </p>
      <p>
        It also matters which rule set you are planning around. Through 31 January 2027, the full ads and
        Premium-revenue tier uses the 4,000-hour or 10-million-Shorts-view route. YouTube has announced that
        new applicants from 1 February 2027 will need 8,000 qualified watch hours or 20 million qualified
        Shorts views, while the 1,000-subscriber requirement remains. Check YouTube&apos;s{' '}
        <a href="https://support.google.com/youtube/answer/12843009?hl=en" target="_blank" rel="noopener noreferrer">
          official YPP update
        </a>{' '}
        whenever you make a real business decision from these figures.
      </p>
      <p><strong>Last verified:</strong> 18 September 2026.</p>

      <h2>How to use the monetization progress calculator</h2>
      <ol>
        <li><strong>Open YouTube Studio → Earn.</strong> Use the eligibility totals rather than lifetime views or a Social Blade estimate.</li>
        <li><strong>Enter subscribers, qualified watch hours and qualified Shorts views.</strong> Each belongs to a different measurement window.</li>
        <li><strong>Add your recent pace.</strong> Subscriber gain, watch hours per month and Shorts views per day generate an indicative forecast.</li>
        <li><strong>Set a deadline if you have one.</strong> The calculator translates each remaining target into a required daily pace.</li>
        <li><strong>Choose a route deliberately.</strong> Long-form watch time and Shorts views are alternatives for full YPP entry; you do not need to complete both.</li>
      </ol>

      <h2>Current vs 2027 YPP requirements</h2>
      <table>
        <thead>
          <tr>
            <th>Full YPP entry route</th>
            <th>Through 31 Jan 2027</th>
            <th>New applicants from 1 Feb 2027</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Subscribers</td><td>1,000</td><td>1,000</td></tr>
          <tr><td>Qualified long-form watch hours</td><td>4,000 in 365 days</td><td>8,000 in 365 days</td></tr>
          <tr><td>Qualified Shorts views</td><td>10 million in 90 days</td><td>20 million in 90 days</td></tr>
        </tbody>
      </table>
      <p>
        The calculator keeps both paths visible because a new channel may still be building when the rule
        change takes effect. It is a planning aid, not a promise of approval or revenue. YouTube&apos;s{' '}
        <a href="https://support.google.com/youtube/answer/72857?hl=en" target="_blank" rel="noopener noreferrer">
          monetization help page
        </a>{' '}
        remains the primary source for eligibility and country-specific availability.
      </p>

      <h2>What counts toward watch hours and Shorts views?</h2>
      <p>
        The safe rule is to enter the qualified figure in Studio&apos;s Earn area, not a number reconstructed
        from public statistics. The long-form route is based on qualified public watch hours in a trailing
        365-day period. Shorts Feed watch time does not transfer into that route. For the alternative route,
        use qualified public Shorts views across the rolling 90-day period. Private, unlisted, deleted or
        promoted activity can be treated differently from public qualifying activity.
      </p>
      <p>
        This distinction is why a channel with plenty of lifetime views may still be far from eligibility.
        Use the <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link> to understand how
        views and average view duration create hours, then bring the actual qualified number back here.
      </p>

      <h2>The earlier-access YPP tier at 500 subscribers</h2>
      <p>
        In eligible locations, YouTube also offers earlier access to selected fan-funding and Shopping
        features. Its threshold is 500 subscribers, three public uploads in the past 90 days, and either
        3,000 qualified long-form watch hours in the last year or 3 million qualified Shorts views in 90
        days. It is useful progress to track, but it is not the same as earning ads on watch pages or in
        the Shorts Feed. The calculator labels this tier separately so the two milestones do not get mixed up.
      </p>

      <h2>Use your pace, not a viral fantasy</h2>
      <p>
        Forecasts are only as useful as the time window behind them. Take subscriber growth from the last 28
        or 90 days, qualified watch hours from a representative month, and daily Shorts views from a stable
        period. A single viral video can make a forecast look easy; a rolling window can remove old activity
        later. Treat the completion date as a scenario to improve, not a deadline YouTube guarantees.
      </p>
      <p>
        To improve the long-form path, focus on useful topics and retention: shape the opening with the{' '}
        <Link href="/hook-generator">Hook Generator</Link>, make navigation clearer with the{' '}
        <Link href="/timestamp-generator">Timestamp Generator</Link>, and inspect average duration with the{' '}
        <Link href="/youtube-average-view-duration-calculator">Average View Duration Calculator</Link>. For
        planning a sustainable publishing rhythm, use the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>.
      </p>

      <h2>Related tools</h2>
      <p>
        Estimate qualified long-form hours with the <Link href="/youtube-watch-time-calculator">Watch Time
        Calculator</Link>, calculate audience momentum with the{' '}
        <Link href="/youtube-subscriber-growth-calculator">Subscriber Growth Calculator</Link>, and estimate
        potential revenue only after eligibility with the <Link href="/youtube-money-calculator">YouTube Money
        Calculator</Link>. Model the separate Shorts-revenue side with the{' '}
        <Link href="/youtube-shorts-earnings-calculator">Shorts Earnings Calculator</Link>. If you are researching another creator rather than your own private Studio data,
        the <Link href="/monetization-checker">Monetization Checker</Link> gives a public-signal estimate, not
        official confirmation.
      </p>
    </>
  );
}
