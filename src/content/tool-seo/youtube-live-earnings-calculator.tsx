import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How are YouTube Live earnings calculated?',
    a: 'Estimate = monetized playbacks ÷ 1,000 × CPM × 55% + gross Super Chats × 70% + new memberships × an assumed $3.50 creator share. Enter Super Chats before the estimated platform share. Add sponsorships separately.',
  },
  {
    q: 'What CPM do Live streams get?',
    a: 'Live CPM varies by audience, ad inventory, season and content. Use a comparable playback-based CPM from your YouTube Studio Analytics when available. The $6 starting value here is only an editable example, not a benchmark.',
  },
  {
    q: 'How much does YouTube take from Super Chats and memberships?',
    a: 'This calculator models a 70% creator share of gross Super Chats and assumes $3.50 per new member. Actual payouts can differ by transaction, product price, taxes and fees; confirm them in YouTube Studio.',
  },
  {
    q: 'Do I need monetization for Super Chats?',
    a: 'Yes. You must be in YPP to receive Super Chats, Super Thanks, Stickers and memberships. Until then, forecast with ads only or model 0 for chats.',
  },
  {
    q: 'Where do I find Live revenue?',
    a: 'Studio → Analytics → Revenue → filter Transaction Type = Super Chat / Memberships, and Content Type = Live. Separate ad vs fan-funding.',
  },
  {
    q: 'Should I run ads during Live?',
    a: 'Light mid-rolls on natural breaks (Q&A transitions) are fine; heavy ads crater Live retention. Many creators monetize Live via chats/members/sponsors and save ads for the VOD replay.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Live monetization is three revenue lines, not one</h2>
      <p>
        Unlike a premiered VOD, a <strong>YouTube Live</strong> earns from parallel lines: mid-roll
        ads on concurrent viewers, Super Chats/Thanks in the moment, and membership joins driven by
        Live exclusives. This calculator adds estimated creator revenue from all three sources. Use
        monetized playbacks for the ad scenario; total Live views can be higher because not every view
        receives an ad.
      </p>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Creator cut</th>
            <th>Lever</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Ad revenue</td><td>55%</td><td>Monetized playbacks ÷ 1,000 × CPM</td></tr>
          <tr><td>Super Chats / Thanks</td><td>70%</td><td>Engaged call-to-action moments</td></tr>
          <tr><td>Memberships</td><td>$3.50 assumed per new member</td><td>Exclusive perks + continuity</td></tr>
          <tr><td>Sponsorship (off-platform)</td><td>100% (minus fees)</td><td>Separate deal sheet</td></tr>
        </tbody>
      </table>

      <h2>How to estimate Live earnings</h2>
      <ol>
        <li><strong>Enter monetized Live playbacks</strong> — an estimate of playbacks with ads, not peak concurrent viewers or all views.</li>
        <li><strong>Enter Live CPM</strong> — the $6 starting value is an editable scenario assumption; use your own Analytics figure when available.</li>
        <li><strong>Add gross Super Chats ($) and new members</strong> — the tool models 70% of chat revenue and $3.50 per new member.</li>
        <li><strong>Calculate</strong> — read ad vs chats vs members vs total.</li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Ad + Super Chats + memberships composite</li>
        <li>Scenario shares built in: 55% ads, 70% gross Super Chats and $3.50 per new member</li>
        <li>Per-source breakdown cards</li>
        <li>Instant, client-only</li>
      </ul>

      <h2>How to make Live pay more per hour</h2>
      <p>
        Front-load value so viewers stay for mid-rolls; place Super Chat prompts at engagement peaks,
        not the intro. Script peaks with the <Link href="/hook-generator">Hook Generator</Link> and
        chapter the replay with the <Link href="/timestamp-generator">Timestamp Generator</Link> so the
        post-Live VOD keeps earning via the <Link href="/youtube-money-calculator">Money Calculator</Link> math.
        Drive higher-paying concurrent viewers by titling with the{' '}
        <Link href="/title-generator">Title Generator</Link>.
      </p>

      <h2>Related tools</h2>
      <p>
        Forecast VOD after Live with the <Link href="/youtube-money-calculator">Money Calculator</Link> and{' '}
        <Link href="/youtube-views-to-money-calculator">Views to Money Calculator</Link>, understand RPM drivers via the{' '}
        <Link href="/youtube-rpm-calculator">RPM Calculator</Link>, and keep cadence with the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>.
      </p>
    </>
  );
}
