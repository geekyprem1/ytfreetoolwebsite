import Link from 'next/link';

export function YouTubeCreatorIncomeStreamsArticle() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> estimate YouTube Analytics RPM revenue, brand sponsorships, and affiliate
        commissions as separate lines. YouTube RPM already includes several YouTube revenue sources after YouTube’s
        share; external brand deals and merchandise are not included in the standard RPM definition.
      </p>

      <h2>Keep the three lines separate</h2>
      <table>
        <thead><tr><th scope="col">Income line</th><th scope="col">Inputs</th><th scope="col">Check before adding it</th></tr></thead>
        <tbody>
          <tr><td>YouTube Analytics RPM revenue</td><td>Matching views ÷ 1,000 × RPM</td><td>RPM can include ads, Premium, memberships, Super Chat and Super Stickers.</td></tr>
          <tr><td>Brand sponsorships</td><td>Deals in the month × fee per deal</td><td>Only add the amount that is not already included in the YouTube revenue figure you entered.</td></tr>
          <tr><td>Affiliate commissions</td><td>Clicks × conversion rate × commission per sale</td><td>Use your own tracked conversion and received commission, not a platform-wide benchmark.</td></tr>
        </tbody>
      </table>
      <p>
        YouTube defines RPM as revenue per 1,000 views after its revenue share and says it can include ads, YouTube
        Premium, channel memberships, Super Chat and Super Stickers. Standard RPM does not include external brand
        deals or merchandise. It also includes views that were not monetized, so RPM is not the same as CPM.
        See YouTube’s{' '}
        <a href="https://support.google.com/youtube/answer/9314357?hl=en" target="_blank" rel="noopener noreferrer">official RPM and CPM explanation</a>.
      </p>

      <h2>Match the period and denominator</h2>
      <p>
        Take RPM and views from the same date range and content format in YouTube Studio. For regular videos, use the
        view count that corresponds to the RPM report. YouTube describes Shorts RPM against engaged views, so do not
        casually pair a Shorts RPM with an unrelated long-form view total. If you want ad-only earnings, use the
        estimated ad revenue report or model monetized playbacks and playback-based CPM separately.
      </p>

      <h2>A worked example, not an earnings benchmark</h2>
      <p>
        Suppose a creator enters 100,000 monthly views and a $2 RPM: the YouTube RPM-based line is $200. Two expected
        sponsorships at $300 each add $600. If 1,000 affiliate clicks convert at 2% and pay $5 per sale, that adds
        $100. The modeled total is $900 for that month. These are round illustrative inputs to show the math; they
        are not typical rates or a promise of what another channel will earn.
      </p>

      <h2>Turn a monthly estimate into a planning range</h2>
      <p>
        The <Link href="/youtube-creator-income-calculator">Creator Income Calculator</Link> keeps the YouTube RPM,
        sponsor and affiliate lines visible, then annualizes the monthly total by multiplying it by 12. Its Low and
        High cases copy Base; edit each input to reflect your own slower or stronger month. They are personal
        assumptions, not statistical confidence intervals.
      </p>
      <p>
        To calculate RPM from total YouTube revenue and views, use the{' '}
        <Link href="/youtube-rpm-calculator">YouTube RPM Calculator</Link>. To model ad revenue from monetized
        playbacks and CPM, use the <Link href="/youtube-money-calculator">YouTube Money Calculator</Link>.
      </p>

      <p>
        All three lines are revenue estimates before taxes, production costs, agency fees, refunds or other business
        expenses. A revenue total is not profit. Replace illustrative assumptions with your own Analytics, contract
        and affiliate reports, and keep the measurement periods aligned.
      </p>
    </>
  );
}
