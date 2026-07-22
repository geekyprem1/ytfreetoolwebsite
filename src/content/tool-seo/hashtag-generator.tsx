import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How many hashtags does YouTube allow?',
    a: 'YouTube allows up to 15 hashtags on a video. Additional hashtags beyond that limit may be ignored. Only a few appear above the title; the rest live in the description context.',
  },
  {
    q: 'How many hashtags should I show above the title?',
    a: 'Practically, keep the most accurate 2–3 hashtags first because those are the ones viewers notice above the title. Broader discovery tags can follow in the description set within the 15-tag cap.',
  },
  {
    q: 'What hashtag mix does the generator use?',
    a: 'It aims for a blend of broad (about 30%), niche (about 40%), and trending (about 30%) tags so you get reach, relevance, and timeliness without a pure spam list.',
  },
  {
    q: 'Can I generate more than 15 hashtags to choose from?',
    a: 'Yes. You can brainstorm larger sets (for example 5–50) and then trim to the best 15 or fewer before publishing. Generation volume is for ideation; the platform cap still applies.',
  },
  {
    q: 'Do hashtags replace regular video tags?',
    a: 'No. Hashtags are visible discovery labels. Studio tags are separate metadata. Use both thoughtfully — see the Tags Extractor for competitor Studio tags and this tool for public hashtag ideas.',
  },
  {
    q: 'Should every hashtag include spaces or camel case?',
    a: 'Prefer clear multi-word hashtags without spaces (#EmailMarketing). Avoid stuffing illegible strings. Trademark and banned terms can be filtered or hurt trust.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the AI Hashtag Generator is for</h2>
      <p>
        This free AI YouTube Hashtag Generator produces broad, niche, and trending hashtags for video
        discovery—not Instagram or TikTok tags. Enter a topic, generate ideas, then trim to YouTube’s
        hard <strong>15-hashtag</strong> maximum before publishing.
      </p>
      <p>
        Hashtags are not a substitute for a strong title or thumbnail. They help categorized browsing
        and reinforce topical labels, especially when the first few surface above the video title.
      </p>

      <h2>How to generate YouTube hashtags</h2>
      <ol>
        <li>
          <strong>Enter your video topic</strong> — Include niche, format, and audience when possible.
        </li>
        <li>
          <strong>Choose a count</strong> — Generate a brainstorming list (commonly 5–50), knowing you
          will publish at most 15.
        </li>
        <li>
          <strong>Review broad, niche, and trending groups</strong> — Keep a balanced mix.
        </li>
        <li>
          <strong>Copy and trim</strong> — Place the best 3 first, then complete a focused set under the
          15-tag cap.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>AI hashtags contextualized to your topic</li>
        <li>Grouped output: broad, niche, and trending</li>
        <li>Configurable generation counts for ideation</li>
        <li>One-click copy per group or entire list</li>
        <li>No login required</li>
      </ul>

      <h2>How to choose hashtags that help instead of clutter</h2>
      <h3>Lead with accuracy</h3>
      <p>
        The hashtags that appear above the title should describe the video precisely. A cooking Short
        about cast-iron steaks should not lead with a mega-generic tag that attracts the wrong audience
        and hurts early retention.
      </p>
      <h3>Balance reach and specificity</h3>
      <p>
        Broad tags increase potential impressions but face heavy competition. Niche tags reach fewer
        people who are more likely to watch. Trending tags add timely discovery when they truly fit —
        forcing a trend tag onto unrelated content backfires.
      </p>
      <h3>Stay inside platform rules</h3>
      <p>
        Cap published hashtags at <strong>15</strong>. Our SEO scoring treats roughly{' '}
        <strong>3–15</strong> well-formed hashtags as a healthy range. More is not better once you
        cross the limit.
      </p>

      <h2>Hashtags versus Studio tags</h2>
      <p>
        Studio tags are invisible metadata; hashtags are visible labels. Research both. Extract
        competitor Studio tags with the <Link href="/tags-extractor">Tags Extractor</Link>, scan
        channel-level patterns with <Link href="/channel-tags">Channel Tags</Link>, and use this
        generator for public hashtag copy you will actually paste.
      </p>

      <h2>Why a dedicated generator beats scrolling Explore</h2>
      <p>
        Manually inventing thirty tags invites duplication and off-topic noise. A structured generator
        gives you a categorized shortlist quickly, then your judgment removes anything inaccurate.
        Finish packaging with the{' '}
        <Link href="/description-generator">Description Generator</Link> and validate with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Hashtag stuffing</strong> — Walls of unrelated tags look spammy and may be ignored.
        </li>
        <li>
          <strong>Only mega-competitive tags</strong> — You will be invisible next to giant channels.
        </li>
        <li>
          <strong>Misleading trend hijacking</strong> — Short-term clicks, long-term distrust.
        </li>
        <li>
          <strong>Ignoring the title story</strong> — Hashtags should agree with the title and thumbnail
          promise.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Pair hashtags with stronger titles from the{' '}
        <Link href="/title-generator">Title Generator</Link> and topic expansion via the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>. For Shorts-led campaigns, brainstorm
        concepts in the <Link href="/shorts-ideas">Shorts Idea Generator</Link> first, then label them.
      </p>
    </>
  );
}
