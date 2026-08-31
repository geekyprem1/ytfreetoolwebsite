import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I pick a random YouTube giveaway winner?',
    a: 'Paste the giveaway video URL, let the tool load the comments, set any filters you want (keyword, minimum likes, one entry per person), then press Pick a winner. The tool draws randomly from the eligible comments and shows the winner along with a proof seed you can share.',
  },
  {
    q: 'Is the draw actually random and fair?',
    a: 'Yes. Each draw generates a random seed, then uses a seeded shuffle (Fisher–Yates) so the selection is uniform across eligible entries. Because the seed and timestamp are shown, anyone can see the draw was not hand-picked.',
  },
  {
    q: 'What is the proof seed for?',
    a: 'The seed plus the draw time is your fairness receipt. Post it in your winner announcement so entrants trust the result. It shows the draw happened at a specific moment from a specific pool size, rather than being chosen manually.',
  },
  {
    q: 'Can I remove duplicate entries from the same person?',
    a: 'Yes. Keep "one entry per person" enabled and the tool counts each commenter only once, even if they left several comments. This prevents someone from boosting their odds by spamming.',
  },
  {
    q: 'Can I require a keyword like "done" or a hashtag?',
    a: 'Yes. Enter a keyword and only comments containing it become eligible. This is useful when your giveaway rules ask entrants to comment a specific word, tag a friend, or answer a question.',
  },
  {
    q: 'Why might not every comment be loaded?',
    a: 'For very large videos the tool caps how many comments it pulls to stay within YouTube’s API limits, and it tells you when results are capped. Replies (nested comments) are not included — only top-level comments are eligible, which is standard for giveaways.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube comment picker?</h2>
      <p>
        A comment picker loads the comments on a YouTube video and draws a random winner from them —
        the standard way to run a fair giveaway. Paste the giveaway video URL, apply any entry rules,
        and pick one or more winners with a shareable proof seed.
      </p>
      <p>
        Because the draw is seeded and timestamped, you can prove to entrants that the result was random
        rather than cherry-picked, which is exactly what a trustworthy giveaway needs.
      </p>

      <h2>How to run a giveaway draw</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — The tool loads that video’s top-level comments.
        </li>
        <li>
          <strong>Set your rules</strong> — Require a keyword, a minimum number of likes, one entry per
          person, and how many winners to draw.
        </li>
        <li>
          <strong>Pick winners</strong> — Draw randomly and share the seed and timestamp as proof.
        </li>
      </ol>

      <h2>Fairness and filters</h2>
      <ul>
        <li>
          <strong>One entry per person</strong> — De-duplicates commenters so nobody can spam their odds.
        </li>
        <li>
          <strong>Keyword requirement</strong> — Only entries containing your word or hashtag qualify.
        </li>
        <li>
          <strong>Minimum likes</strong> — Optionally require a like threshold to filter low-effort spam.
        </li>
        <li>
          <strong>Seeded draw</strong> — A random seed drives a uniform shuffle; the seed is shown for
          verification.
        </li>
      </ul>

      <h2>Tips for a credible giveaway</h2>
      <p>
        State your rules clearly in the video or description (what to comment, deadline, eligibility).
        When you draw, screenshot the winner card with the seed and time, and post it in a pinned comment
        or community post. Transparency is what makes viewers trust future giveaways.
      </p>

      <h2>Related tools</h2>
      <p>
        Need the raw comments as a spreadsheet instead? Use the{' '}
        <Link href="/youtube-comment-exporter">Comment Exporter</Link>. To check the video first, see{' '}
        <Link href="/video-statistics">Video Statistics</Link>, and to track the giveaway video’s reach
        live, try the <Link href="/live-view-count">Live View Count</Link>.
      </p>
    </>
  );
}
