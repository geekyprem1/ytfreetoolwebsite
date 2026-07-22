import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How many Shorts ideas can I generate at once?',
    a: 'You can request a batch sized for ideation — commonly from a handful up to about 50 ideas — each with trend and virality-oriented scores to help prioritize what to film first.',
  },
  {
    q: 'What do trend and virality scores mean?',
    a: 'They are heuristic 0–100 style ratings estimating how timely and shareable an idea may be based on the model’s understanding of formats and topics. They are planning aids, not guarantees of views.',
  },
  {
    q: 'How long should a YouTube Short be?',
    a: 'Shorts are built for vertical, bite-sized viewing. Many strong Shorts land in roughly the 15–60 second range, with the hook visible immediately on loop-friendly topics.',
  },
  {
    q: 'Can I use these ideas for long-form videos too?',
    a: 'Yes. A Shorts concept often expands into a full tutorial or story video. Use the idea as a cold open, then deepen it with chapters and a longer outline.',
  },
  {
    q: 'Do I need trending audio for Shorts to work?',
    a: 'Not always. Clear visuals, a fast promise, and on-screen text often matter more than a specific sound — especially in educational and product niches.',
  },
  {
    q: 'How should I pick which scored idea to film?',
    a: 'Filter for ideas you can execute well this week, that match your channel authority, and that you can package with a credible title and thumbnail. Highest score plus low feasibility still loses.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the YouTube Shorts Idea Generator provides</h2>
      <p>
        This free YouTube Shorts Idea Generator brainstorms vertical concepts from a niche seed with
        trend and virality scores—up to <strong>50 ideas</strong> per run. Plan Shorts you can film
        this week, not long-form blog topics.
      </p>
      <p>
        Ideas are starting points. The winners still need a crisp visual hook, readable on-screen text,
        and a payoff that matches the first frame.
      </p>

      <h2>How to generate Shorts ideas</h2>
      <ol>
        <li>
          <strong>Enter your niche or theme</strong> — “budget travel Japan” beats “travel.”
        </li>
        <li>
          <strong>Choose how many ideas you need</strong> — Smaller sets for today’s shoot; larger sets
          for quarterly planning.
        </li>
        <li>
          <strong>Generate scored cards</strong> — Note categories such as tutorial, lifehack, or
          challenge-style prompts when provided.
        </li>
        <li>
          <strong>Shortlist by feasibility</strong> — Prefer ideas you can film with assets you already
          have.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Batch ideation sized for planning boards (up to ~50)</li>
        <li>Trend and virality scores on a 0–100 style scale</li>
        <li>Category-minded prompts for varied formats</li>
        <li>Copy helpers for moving ideas into your script doc</li>
        <li>No login required for quick brainstorming</li>
      </ul>

      <h2>What makes a Shorts idea filmable</h2>
      <h3>One promise, one motion</h3>
      <p>
        The best Shorts communicate a single outcome in the first seconds: a fix, a reveal, a contrast,
        or a checklist item. If the idea needs a three-act plot, it may belong in long-form instead.
      </p>
      <h3>Loop or save potential</h3>
      <p>
        Educational Shorts often win on saves; entertainment Shorts win on replays. When scores look
        similar, pick the idea that creates a natural loop or a checklist viewers will revisit.
      </p>
      <h3>Fit the 15–60 second canvas</h3>
      <p>
        Design for a tight runtime. If the explanation needs five minutes, film a teaser Short that
        points to the long video rather than crushing the tutorial into unreadable speed.
      </p>

      <h2>From idea to packaged Short</h2>
      <p>
        Draft a spoken open with the <Link href="/hook-generator">Hook Generator</Link>, then a title
        with the <Link href="/title-generator">Title Generator</Link>. For topic labels, trim a set in
        the <Link href="/hashtag-generator">Hashtag Generator</Link> — remember the{' '}
        <strong>15-hashtag</strong> publish cap.
      </p>

      <h2>Why scored ideation beats random trends</h2>
      <p>
        Trend pages show what already moved — not what you can uniquely deliver. Scored ideation from
        your niche seed keeps suggestions nearer your expertise while still pushing you toward formats
        with share potential. Treat scores as prioritization hints, then confirm with your retention
        data after posting.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Filming every high score blindly</strong> — Authority mismatch wastes posting
          consistency.
        </li>
        <li>
          <strong>Ignoring on-screen text</strong> — Many Shorts are watched without sound.
        </li>
        <li>
          <strong>Recreating copyrighted layouts frame-for-frame</strong> — Borrow pacing patterns, not
          protected creative.
        </li>
        <li>
          <strong>No series thinking</strong> — Cluster ideas into themes so the algorithm and audience
          learn what you stand for.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Expand a winning Short into a long video outline using the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link> on related references, then build
        chapters with the <Link href="/timestamp-generator">Timestamp Generator</Link>. Compare title
        options in the <Link href="/title-analyzer">Title Analyzer</Link> before you publish the
        follow-up cut.
      </p>
    </>
  );
}
