import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What is a YouTube hook?',
    a: 'A hook is the opening line or moment that earns the next few seconds of watch time. On YouTube it usually lives in the first 3–15 seconds of the talk track and should align with the title and thumbnail promise.',
  },
  {
    q: 'What hook styles does the generator create?',
    a: 'It drafts question hooks, story hooks, curiosity-gap hooks, and shock or bold-claim hooks so you can test different emotional entry points for the same topic.',
  },
  {
    q: 'Why do people say the first 3 seconds matter?',
    a: 'Viewers decide quickly whether the video matches the click. A weak open triggers immediate scroll-away, which hurts early retention — a key ranking and satisfaction signal.',
  },
  {
    q: 'Should the hook repeat the title word for word?',
    a: 'Not usually. Acknowledge the promise, then add specificity, stakes, or a concrete scene. Exact title parroting can feel redundant after the viewer already read the title.',
  },
  {
    q: 'Can hooks help YouTube Shorts too?',
    a: 'Yes. Shorts need an even faster open because the feed moves quickly. Generate punchy lines here, then adapt length for vertical pacing with ideas from the Shorts Idea Generator.',
  },
  {
    q: 'How many hooks should I test?',
    a: 'Script two or three opens for important uploads when possible. Record the winner based on audience retention graphs rather than personal taste alone.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the AI Hook Generator does</h2>
      <p>
        This free AI YouTube Hook Generator drafts opening lines for the first 3 seconds of a
        video—question, story, curiosity, and shock styles—not blog introductions. Enter a topic,
        audience, and tone to earn early watch time.
      </p>
      <p>
        Hooks are retention tools first. SEO metadata gets the impression; the open decides whether
        that impression becomes a viewed minute.
      </p>

      <h2>How to generate video hooks</h2>
      <ol>
        <li>
          <strong>State the topic clearly</strong> — Include the outcome or conflict the video resolves.
        </li>
        <li>
          <strong>Define the audience</strong> — Beginners, operators, parents, and specialists need
          different stakes.
        </li>
        <li>
          <strong>Choose a tone</strong> — Bold, humorous, professional, or dramatic.
        </li>
        <li>
          <strong>Generate and rehearse aloud</strong> — If a line feels awkward spoken, rewrite before
          recording.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Question hooks that invite an internal answer</li>
        <li>Story hooks that tease a concrete scene</li>
        <li>Curiosity hooks that open an information gap</li>
        <li>Shock hooks built on surprising claims or contrasts</li>
        <li>Tone controls to match channel voice</li>
      </ul>

      <h2>Hook types and when to use them</h2>
      <h3>Question hooks</h3>
      <p>
        Best when the viewer already feels the problem. “Why does your export still look soft after
        sharpening?” works if the thumbnail showed a soft frame. Avoid trivia questions unrelated to
        the payoff.
      </p>
      <h3>Story hooks</h3>
      <p>
        Start mid-action: a failed launch, a client call, a before/after moment. Stories need a quick
        bridge to the lesson so you do not spend 45 seconds on setup in a tutorial.
      </p>
      <h3>Curiosity and shock hooks</h3>
      <p>
        Use sparingly and honestly. A curiosity gap you never close trains viewers to leave early next
        time. Shock claims must be supported in the next lines or trust collapses.
      </p>

      <h2>Align hooks with packaging</h2>
      <p>
        The open should redeem the title and thumbnail, not invent a second premise. Draft titles with
        the <Link href="/title-generator">Title Generator</Link>, compare them in the{' '}
        <Link href="/title-analyzer">Title Analyzer</Link>, and pull spoken references from competitor
        videos via the <Link href="/transcript-extractor">Transcript Extractor</Link>.
      </p>

      <h2>Why investing in the first 3–15 seconds pays</h2>
      <p>
        Audience retention graphs almost always show the steepest drop at the beginning. Saving even a
        few percentage points there compounds across suggested traffic. A sharper hook is often a
        higher-ROI edit than adding another mid-roll section.
      </p>
      <p>
        For short-form, combine hooks with concepts from the{' '}
        <Link href="/shorts-ideas">Shorts Idea Generator</Link> so the visual cold open and spoken line
        hit together.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Long channel intros before value</strong> — Branding can wait until the promise is
          clear.
        </li>
        <li>
          <strong>Apologizing or hedging</strong> — “Sorry this is random” trains exits.
        </li>
        <li>
          <strong>Clickbait opens</strong> — If the video cannot pay off the line, rewrite the hook or
          the video.
        </li>
        <li>
          <strong>Reading AI text robotically</strong> — Adapt wording to your natural speech rhythm.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        After you lock an open, build the description with the{' '}
        <Link href="/description-generator">Description Generator</Link> and grade metadata with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>. For chapter navigation on long videos,
        use the <Link href="/timestamp-generator">Timestamp Generator</Link>.
      </p>
    </>
  );
}
