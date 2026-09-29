import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How does the YouTube Creator Income Calculator work?',
    a: 'It adds monthly views divided by 1,000 times your RPM, sponsorship deals times their fee, and affiliate clicks times conversion rate times commission per sale. Blank fields count as zero.',
  },
  {
    q: 'Where can I find my YouTube RPM?',
    a: 'Check YouTube Studio Analytics → Revenue for the same period and content type you want to model. RPM can include ads, YouTube Premium, memberships, Super Chat and Super Stickers, so it is broader than ad revenue. Match the entered view denominator to the RPM report.',
  },
  {
    q: 'Does this calculator predict actual earnings or profit?',
    a: 'No. It models the inputs you provide. The yearly figure repeats the same monthly assumptions 12 times. Results are revenue before taxes and your own expenses, not profit or a guarantee.',
  },
  {
    q: 'Are low and high scenarios automatic?',
    a: 'No. Each case starts as a copy of Base and must be edited by you. The calculator does not apply default percentages or claim that the cases are statistical ranges.',
  },
  {
    q: 'Does the calculator subtract YouTube’s platform share from RPM?',
    a: 'No. RPM is already creator revenue per 1,000 views, so the tool does not deduct YouTube’s share again. It can already include several YouTube revenue sources; add external brand sponsorships and affiliate commissions separately, and avoid entering a YouTube revenue line twice.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Estimate creator revenue from three separate sources</h2>
      <p>
        A creator may earn from YouTube Analytics revenue, sponsorships and affiliate sales. Add only income that
        belongs in each line: use a YouTube Analytics RPM for the views entered, include expected
        sponsorship fees, and estimate affiliate commissions from clicks that convert. This is a
        planning model based on your assumptions, not channel-specific earnings data.
      </p>

      <h2>Formula used</h2>
      <ul>
        <li><strong>YouTube RPM-based revenue:</strong> monthly views ÷ 1,000 × your RPM</li>
        <li><strong>Sponsorship revenue:</strong> sponsorship deals per month × fee per deal</li>
        <li><strong>Affiliate commissions:</strong> affiliate clicks × (conversion rate ÷ 100) × commission per sale</li>
        <li><strong>Yearly projection:</strong> monthly total × 12, assuming each input stays the same</li>
      </ul>
      <p>
        The selected currency formats all money values but does not convert them. RPM is already
        creator revenue, so no extra YouTube platform share is deducted. The combined result is
        revenue before taxes and your own costs; it is not profit.
      </p>

      <h2>Build scenarios from your own data</h2>
      <p>
        Start with a typical month from your analytics and deal history. Add Low or High to copy the
        Base inputs, then edit the values to reflect your own assumptions. The tool does not invent
        rates based on subscribers, niche or country. Keep the views period aligned with the RPM and
        avoid counting a sponsorship or affiliate amount twice if it is included in another figure.
      </p>

      <h2>Choose the right earnings calculator</h2>
      <p>
        Use the <Link href="/youtube-rpm-calculator">YouTube RPM Calculator</Link> to calculate RPM
        from revenue and views. Learn how to combine the streams in the{' '}
        <Link href="/blog/youtube-creator-income-streams">creator income planning guide</Link>, or use the{' '}
        <Link href="/youtube-money-calculator">YouTube Money Calculator</Link>
        to model ad income from CPM and monetized play rate. For format-specific estimates, see the{' '}
        <Link href="/youtube-shorts-earnings-calculator">Shorts Earnings Calculator</Link> and{' '}
        <Link href="/youtube-live-earnings-calculator">Live Earnings Calculator</Link>.
      </p>
    </>
  );
}
