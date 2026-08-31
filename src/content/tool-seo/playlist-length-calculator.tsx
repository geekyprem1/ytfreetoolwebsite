import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I find the total length of a YouTube playlist?',
    a: 'Paste the playlist URL (any link containing ?list=PL…) or the playlist ID above and press Calculate. The tool reads the duration of every video in the playlist, adds them up, and shows the total runtime, the number of videos, and the average video length.',
  },
  {
    q: 'Can I see how long a playlist takes at 1.5x or 2x speed?',
    a: 'Yes. Results include adjusted watch time at 1.25x, 1.5x, 1.75x, and 2x. For example, a 10-hour playlist takes about 6 hours 40 minutes at 1.5x and 5 hours at 2x, which is useful for planning study or binge sessions.',
  },
  {
    q: 'Does it work with private or unlisted playlists?',
    a: 'It works with public and unlisted playlists that are reachable by link. Fully private playlists cannot be read because the YouTube Data API does not expose them without the owner’s authorization.',
  },
  {
    q: 'Is there a limit on playlist size?',
    a: 'Very large playlists are measured up to a cap to stay within API limits. If a playlist exceeds the cap, the tool tells you the results are partial and cover the first batch of videos, so the true total is longer.',
  },
  {
    q: 'Why is the total slightly different from adding videos by hand?',
    a: 'Private, deleted, or region-blocked videos in a playlist have no readable duration and are skipped. The tool reports how many videos it actually measured so you can see whether any were excluded.',
  },
  {
    q: 'What playlist URL formats are supported?',
    a: 'Any URL with a list= parameter works: a watch URL like youtube.com/watch?v=…&list=PL…, a playlist page like youtube.com/playlist?list=PL…, or a bare playlist ID starting with PL, UU, FL, LL, OL, or RD.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube playlist length calculator?</h2>
      <p>
        This tool adds up the duration of every video in a YouTube playlist to tell you the total watch
        time. Paste the playlist link and you get the combined runtime, the number of videos, the average
        length per video, and how long the playlist takes at faster playback speeds.
      </p>
      <p>
        It answers a simple question YouTube itself does not: “How long will this actually take?” That
        matters for lecture series, tutorial courses, podcast backlogs, and binge sessions.
      </p>

      <h2>How to calculate playlist length</h2>
      <ol>
        <li>
          <strong>Copy the playlist URL</strong> — Open the playlist and copy any link that contains{' '}
          <code>?list=PL…</code>, or copy the playlist ID directly.
        </li>
        <li>
          <strong>Paste it above</strong> — Press Calculate. The tool fetches each video’s duration and
          totals them.
        </li>
        <li>
          <strong>Read the breakdown</strong> — See total length, video count, average, and adjusted
          watch time at 1.25x through 2x.
        </li>
      </ol>

      <h2>Why playback speed matters</h2>
      <p>
        Watching at a faster speed changes the time commitment dramatically. A course that is 20 hours at
        normal speed becomes about 13 hours 20 minutes at 1.5x and 10 hours at 2x. Seeing those numbers up
        front helps you decide whether to commit, and at what speed. The formula is straightforward: total
        seconds divided by the speed multiplier.
      </p>

      <h2>Common uses</h2>
      <ul>
        <li>
          <strong>Study planning</strong> — Estimate how many sessions a lecture playlist will take.
        </li>
        <li>
          <strong>Course length checks</strong> — Compare tutorial series before you start one.
        </li>
        <li>
          <strong>Podcast &amp; backlog</strong> — Know how many hours of listening are ahead.
        </li>
        <li>
          <strong>Content research</strong> — Gauge how much a creator has published in a series.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Turn watch time into partner-program progress with the{' '}
        <Link href="/youtube-watch-time-calculator">Watch Time Calculator</Link>, look up a single
        video’s stats with <Link href="/video-statistics">Video Statistics</Link>, or size the whole
        channel behind a playlist with{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>.
      </p>
    </>
  );
}
