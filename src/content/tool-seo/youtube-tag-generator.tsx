import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How many characters can YouTube tags have?',
    a: 'The Tags field in YouTube Studio accepts up to 500 characters in total. Commas between tags count toward the limit, and a tag that contains a space is counted with two extra characters, as if it were in quotes. This tool counts the same way and warns you before you go over.',
  },
  {
    q: 'Do YouTube tags still matter for ranking?',
    a: 'Only a little. YouTube says tags play a minimal role in discovery and are most useful when your topic is commonly misspelled. Your title, thumbnail, description and how viewers respond matter far more. Use tags to reinforce the topic and catch spelling variations, not as a ranking shortcut.',
  },
  {
    q: 'What is the difference between tags and hashtags?',
    a: 'Tags are hidden metadata you add in the Studio Tags field. Hashtags (#like-this) are public, appear in the description or above the title, and are clickable. This tool makes Studio tags; for hashtags use the Hashtag Generator.',
  },
  {
    q: 'How many tags should I use?',
    a: 'There is no fixed number. A focused list of roughly 10–20 relevant tags is usually enough. Put the most accurate tags first, and avoid stuffing unrelated or misleading tags — YouTube’s spam policies prohibit tags that do not describe the video.',
  },
  {
    q: 'What are primary, related and long-tail tags?',
    a: 'Primary tags are your exact topic and close variations. Related tags cover broader or adjacent topics your viewers also search. Long-tail tags are specific 3–6 word phrases, such as “budget travel tips for japan”, that match detailed searches.',
  },
  {
    q: 'Can I use tags from other creators’ videos?',
    a: 'You can look at them for research with the Tags Extractor, but copy only tags that genuinely describe your own video. Adding other channels’ names or unrelated popular terms is misleading metadata and can break YouTube’s spam policies.',
  },
  {
    q: 'Is the YouTube Tag Generator free?',
    a: 'Yes. It is free, needs no login or extension, and you can regenerate as many times as the fair-use rate limit allows.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the YouTube Tag Generator does</h2>
      <p>
        This free tool turns a video topic into a ready-to-paste list of YouTube Studio tags. You describe the
        video, optionally add focus keywords, and the AI returns tags in three groups: <strong>primary</strong>{' '}
        (your exact topic), <strong>related</strong> (adjacent searches) and <strong>long-tail</strong> (specific
        multi-word phrases). You can switch individual tags off, watch a live character counter, and copy the
        final list in the comma-separated format the Tags field expects.
      </p>
      <p>
        The counter follows YouTube Studio’s rules: the whole list must stay within <strong>500 characters</strong>,
        commas count, and tags that contain spaces count two extra characters. If you go over, one click trims the
        list from the bottom so the most relevant tags stay.
      </p>

      <h2>How to generate YouTube tags</h2>
      <ol>
        <li>
          <strong>Describe the video.</strong> Use your working title or a one-line summary. Specific input gives
          better tags — “beginner watercolor landscape tutorial” beats “painting”.
        </li>
        <li>
          <strong>Add focus keywords (optional).</strong> List words you want covered, such as a product name,
          location or format.
        </li>
        <li>
          <strong>Pick how many tags to brainstorm.</strong> Generate 10–40 ideas, then keep the best.
        </li>
        <li>
          <strong>Review and trim.</strong> Click tags to exclude anything inaccurate. Keep the counter under 500.
        </li>
        <li>
          <strong>Copy into YouTube Studio.</strong> Open the video’s Details page, select “Show more”, and paste
          into the Tags field.
        </li>
      </ol>

      <h2>How much do tags help?</h2>
      <p>
        Honestly, not much on their own. YouTube’s own guidance is that tags play a minimal role in discovery and
        are mainly useful when viewers often misspell your topic. Titles, thumbnails, descriptions and audience
        response carry far more weight. Treat tags as a tidy finishing step: they confirm what the video is about,
        cover spelling variations, and cost you nothing when they are accurate.
      </p>
      <p>
        What you should avoid is tag stuffing. Long lists of loosely related or trending terms, other creators’
        names, or misleading keywords can count as misleading metadata under YouTube’s spam policies. A shorter,
        accurate list is safer and just as effective.
      </p>

      <h2>Writing good tags</h2>
      <ul>
        <li>Put your most accurate tag first, usually the main keyword of your title.</li>
        <li>Include one or two common variations or misspellings if people genuinely search them.</li>
        <li>Add a few long-tail phrases that match how people type questions.</li>
        <li>Mix specific and broader tags, but keep every tag true to the video.</li>
        <li>Skip hashtags, emojis and the characters &lt; and &gt; — Studio rejects them.</li>
      </ul>

      <h2>Research and related tools</h2>
      <p>
        To see what similar videos use, paste a video link into the{' '}
        <Link href="/tags-extractor">YouTube Tags Extractor</Link>, or check a whole channel with{' '}
        <Link href="/channel-tags">Channel Tags</Link>. For search-phrase ideas beyond tags, try the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>. Public, clickable labels come from the{' '}
        <Link href="/hashtag-generator">Hashtag Generator</Link>, and ready-made lists by niche live in{' '}
        <Link href="/tags-for">YouTube tags by niche</Link>. When the metadata is done, run the full upload through
        the <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>

      <h2>Privacy</h2>
      <p>
        The topic and keywords you type are sent to our AI provider only to generate the tags. We do not need your
        YouTube account, and no login is required.
      </p>
    </>
  );
}
