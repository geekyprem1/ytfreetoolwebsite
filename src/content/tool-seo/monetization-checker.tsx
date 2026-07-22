import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Can this tool tell me for sure if a channel is monetized?',
    a: 'No. YouTube does not publish official YouTube Partner Program (YPP) or monetization status to third-party tools. This checker returns an estimated status with a confidence score based on public Data API signals. Treat every result as an estimate, never as confirmation.',
  },
  {
    q: 'What inputs does the monetization checker accept?',
    a: 'Paste a channel URL (youtube.com/@handle or /channel/UC…), a bare @handle, or a channel ID starting with UC. The tool normalizes these formats before fetching public channel and video data.',
  },
  {
    q: 'Why are Join / Membership and Super Thanks marked unavailable?',
    a: 'Those UI features are not exposed as fields in the official YouTube Data API v3. When a signal cannot be verified through documented public endpoints, this tool marks it unavailable instead of guessing from private or undocumented APIs.',
  },
  {
    q: 'What does the confidence score mean?',
    a: 'Confidence is a 0–100 score reflecting how many supporting public signals were found. It is capped below 100 because direct monetization UI signals cannot be verified officially. Higher confidence still means “stronger estimate,” not certainty.',
  },
  {
    q: 'Does meeting 1,000 subscribers mean a channel is monetized?',
    a: 'No. The subscriber threshold is only one eligibility requirement for YPP. Watch time, Shorts views, policy compliance, and application approval are not publicly visible. Many channels above 1,000 subscribers are not monetized.',
  },
  {
    q: 'Is this the same as YouTube Studio monetization data?',
    a: 'No. Studio shows private revenue and YPP status only to the channel owner. This tool uses public channel statistics, status fields, description text, and recent video metadata available through the official Data API.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube monetization checker?</h2>
      <p>
        This free YouTube Monetization Checker estimates whether a channel may be earning through the
        Partner Program using public Data API signals and a 0–100 confidence score—not official YouTube
        Partner Program confirmation. Paste a channel URL, @handle, or UC ID for an estimate.
      </p>
      <p>
        This free checker pulls channel metadata through the official YouTube Data API, then reads
        public channel and watch pages for the same class of signals used by tools like YTLarge: video
        ad placements (including pre-roll / mid-roll), Join / Memberships, and Super Thanks when
        visible. Results are shown as Monetization ON or OFF with confidence — always an estimate.
      </p>

      <h2>How to check estimated monetization status</h2>
      <ol>
        <li>
          <strong>Paste a channel identifier</strong> — Use a full channel URL, an @handle, or a UC channel ID.
        </li>
        <li>
          <strong>Review the estimate</strong> — Results show Likely Monetized, Probably Monetized, or No Strong
          Evidence of Monetization, plus a confidence score.
        </li>
        <li>
          <strong>Inspect detected signals</strong> — See which public indicators were detected, not detected, or
          unavailable.
        </li>
        <li>
          <strong>Read the disclaimer</strong> — Always treat the outcome as an estimate, not official YPP status.
        </li>
      </ol>

      <h2>Signals this tool analyzes</h2>
      <ul>
        <li>
          <strong>YPP subscriber threshold</strong> — Whether public subscribers meet the common 1,000-subscriber
          eligibility bar (not proof of enrollment).
        </li>
        <li>
          <strong>Channel reach and maturity</strong> — Lifetime views, channel age, and upload volume as supporting
          context.
        </li>
        <li>
          <strong>Recent activity</strong> — Whether sampled recent uploads show ongoing publishing.
        </li>
        <li>
          <strong>Made for Kids status</strong> — When available, a strong limiter for classic ad monetization.
        </li>
        <li>
          <strong>Public membership-related copy</strong> — Weak hints in the channel description only.
        </li>
        <li>
          <strong>Licensed content and paid product placement</strong> — Public video metadata when returned by the
          API.
        </li>
        <li>
          <strong>Join / Super Thanks / player ads</strong> — Marked unavailable; not exposed by the official API.
        </li>
      </ul>

      <h2>Why estimates matter (and why certainty does not)</h2>
      <p>
        Creators, agencies, and researchers often want a quick read on whether a peer or prospect is likely earning
        on-platform. Public stats help triage, but watch hours, ad enablement, and YPP application status stay
        private in YouTube Studio. Overstating certainty misleads outreach and competitive research.
      </p>
      <p>
        Pair this estimate with{' '}
        <Link href="/channel-statistics">channel statistics</Link> for scale context and{' '}
        <Link href="/video-statistics">video statistics</Link> when you need performance on specific uploads.
      </p>

      <h2>Tips and common mistakes</h2>
      <ul>
        <li>
          <strong>Do not cite this as official monetization proof.</strong> Use it as a research estimate only.
        </li>
        <li>
          <strong>Do not equate brand deals with YPP.</strong> Paid product placement can appear without ad revenue
          sharing.
        </li>
        <li>
          <strong>Do not ignore unavailable signals.</strong> Missing Join / Super Thanks data is expected — not a
          bug.
        </li>
        <li>
          <strong>Verify the exact channel</strong> before sharing results; similar names and fan channels are common.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Explore public scale with <Link href="/channel-statistics">YouTube Channel Statistics</Link>, dig into
        uploads with <Link href="/video-statistics">Video Statistics</Link>, or research topics with{' '}
        <Link href="/channel-tags">Channel Tags</Link>.
      </p>
    </>
  );
}
