import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How does the YouTube comment sentiment analyzer work?',
    a: 'It loads up to 40 public top-level comments in YouTube relevance order, then an AI model labels each as positive, negative, neutral, mixed, or unclear. It groups the short topic labels and selects one high-liked sample comment for each sentiment that appears.',
  },
  {
    q: 'Does this show what every viewer thinks?',
    a: 'No. It summarizes only a small, relevance-ordered sample, not a random or complete sample of viewers. Replies are excluded, and the percentages describe only comments analyzed by this tool.',
  },
  {
    q: 'Can it understand English, Hindi, and Hinglish?',
    a: 'The classifier is prompted to interpret English, Hindi, and Hinglish, but quality has not been independently benchmarked and varies by phrasing and context. Sarcasm, short replies, code-switching, and emoji-only comments can be misread; mixed and unclear labels show some of that uncertainty.',
  },
  {
    q: 'What if comments are disabled or unavailable?',
    a: 'The tool shows an error if YouTube does not allow comments to be fetched. If no readable public comments are returned, it shows an empty state instead of inventing a positive or negative result.',
  },
  {
    q: 'Are replies and every comment included?',
    a: 'No. The analyzer uses up to 40 top-level comments returned by YouTube in relevance order. It does not fetch nested replies or claim to cover every comment on a video.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube comment sentiment analyzer?</h2>
      <p>
        A comment sentiment analyzer gives a quick estimate of how a small group of viewers reacted to a video.
        This tool labels up to 40 public, top-level comments as positive, negative, neutral, mixed, or unclear,
        then groups the topics that appear in that sample. It is a starting point for reading feedback, not a
        poll of the whole audience.
      </p>

      <h2>How to analyze YouTube comments</h2>
      <ol>
        <li><strong>Paste a public video URL</strong> — channel links are not supported.</li>
        <li><strong>Review the sample details</strong> — see how many comments were analyzed and when they were fetched.</li>
        <li><strong>Read the split and themes</strong> — open representative comments to check context before acting on the summary.</li>
        <li><strong>Copy or download the summary</strong> — keep it with your own notes and review the original comments for important decisions.</li>
      </ol>

      <h2>How to interpret the result</h2>
      <p>
        The sample follows the relevance order returned by YouTube and is capped at 40 top-level comments. It is not
        a random sample, and its sentiment percentages describe only the comments shown. YouTube may rank comments
        by signals that do not represent every viewer equally. Replies are not included.
      </p>
      <ul>
        <li><strong>Positive or negative</strong> — a clear favorable or unfavorable reaction in the text.</li>
        <li><strong>Neutral</strong> — a question or factual remark without a clear positive or negative view.</li>
        <li><strong>Mixed</strong> — both favorable and unfavorable views appear in one comment.</li>
        <li><strong>Unclear</strong> — the text is too short, ambiguous, or otherwise hard to classify.</li>
      </ul>
      <p>
        Sentiment models can miss sarcasm, cultural context, emoji meanings, and language switching. The prompt is
        designed to handle English, Hindi, and Hinglish, but language quality has not been independently benchmarked;
        check important conclusions against the original comments. Use the{' '}
        <Link href="/blog/reading-youtube-comment-sentiment">sentiment interpretation guide</Link> to read the sample,
        themes, and representative comments carefully.
      </p>

      <h2>Privacy</h2>
      <p>
        To make this summary, the selected public comment text is sent to our AI provider for classification. Commenter
        names and channel links are not sent with the analysis request. See the <Link href="/privacy">Privacy Policy</Link>
        for how third-party APIs process requests.
      </p>

      <h2>Related creator tools</h2>
      <p>
        Need the underlying comments in a spreadsheet? Use the <Link href="/youtube-comment-exporter">Comment Exporter</Link>.
        Turn recurring viewer questions into topics with the <Link href="/youtube-video-ideas-generator">Video Ideas Generator</Link>,
        or shape a clear opening with the <Link href="/hook-generator">Hook Generator</Link>.
      </p>
    </>
  );
}
