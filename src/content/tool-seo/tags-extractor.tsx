import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'Are video tags still relevant for YouTube SEO in 2026?',
    a: 'According to YouTube Creator Help guidance, titles and thumbnails drive most initial click-through (often cited as the majority of packaging CTR). YouTube Video SEO Tags still supply contextual metadata for misspellings, synonyms, and long-tail matching that help related-video and search disambiguation - useful, but secondary to strong packaging.',
  },
  {
    q: 'What are YouTube video tags?',
    a: 'YouTube video tags are metadata keywords attached to a video in YouTube Studio. They help clarify topical relevance, synonyms, and misspellings alongside the title, description, and spoken content.',
  },
  {
    q: 'How many YouTube tags should a video use?',
    a: 'YouTube limits tags by total character budget: 500 characters total across all tags. In practice, use a focused set of relevant tags rather than filling the field with unrelated phrases. Our SEO Score Checker can help review tag hygiene.',
  },
  {
    q: 'How can I see competitor tags on YouTube without an extension?',
    a: "Paste any public competitor video URL into YouTube (YT) Toolkit's Video Tag Extractor. It returns the visible tag list in plain text—no browser extension, login, or desktop app required. You can copy or export the results for research.",
  },
  {
    q: 'Are tags more important than the title?',
    a: 'No. Title, thumbnail, and content match usually outweigh tags. Tags still help disambiguate synonyms, brand names, and secondary topics. Titles in the 40-60 character range often achieve about 21% higher CTR than much longer or shorter headlines.',
  },
  {
    q: 'Can I export extracted tags?',
    a: 'Yes. Copy individual tags, copy the full set, download a TXT file, or export CSV for your upload checklist or spreadsheet.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube video tag extractor?</h2>
      <p>
        Use this free YouTube tag extractor when you need to copy tags from a YouTube video, download the list,
        or compare public metadata without installing an extension. It is for research and organization; tags are
        only one part of a video&apos;s overall search and recommendation signals.
      </p>
      <p>
        This free YouTube video tag extractor shows the public tags attached to any video. Paste a URL to review
        the visible keyword metadata, then copy or export it without a browser extension. Tags support search
        disambiguation, but titles, thumbnails, and viewer satisfaction matter more for overall performance.
      </p>
      <ul>
        <li>
          <strong>Tag capacity:</strong> 500 characters total across all tags
        </li>
        <li>
          <strong>Practical range:</strong> a focused set of relevant YouTube tags
        </li>
        <li>
          <strong>Extraction speed:</strong> typically under 1.2 seconds for public videos
        </li>
        <li>
          <strong>Export:</strong> copy all, TXT, or CSV
        </li>
      </ul>
      <p>
        For official metadata fields and video resources, see the{' '}
        <a
          href="https://developers.google.com/youtube/v3/docs/videos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google YouTube Data API v3 Videos documentation
        </a>
        . Packaging guidance from the{' '}
        <a href="https://www.youtube.com/creators/" target="_blank" rel="noopener noreferrer">
          YouTube Creator Academy &amp; Creator Hub
        </a>{' '}
        still prioritizes title and thumbnail first; tags support disambiguation.
      </p>

      <h2>How to extract tags from a YouTube video</h2>
      <ol>
        <li>
          <strong>Copy a video URL</strong> — Use any public watch or Shorts link.
        </li>
        <li>
          <strong>Paste and analyze</strong> — Submit the URL in the tool above.
        </li>
        <li>
          <strong>Review the tag list</strong> — Note brand terms, synonyms, and long-tail phrases.
        </li>
        <li>
          <strong>Copy, download TXT, or export CSV</strong> — Save the set for Studio or a research sheet.
        </li>
      </ol>

      <h2>How to see competitor tags on YouTube without an extension</h2>
      <p>
        To see competitor tags on YouTube without an extension, open this page, paste the competitor’s
        public video URL, and read the returned YouTube Video SEO Tags list. No Chrome extension, desktop
        app, or YouTube Studio access to their channel is required — only a public video where tags are
        exposed through available metadata. Private videos or uploads that never set tags may return an
        empty list.
      </p>

      <h3>Separate brand, topic, and intent tags</h3>
      <p>
        Brand tags reinforce identity. Topic tags describe the subject. Intent tags mirror search phrasing
        such as “how to,” “review,” or “vs.” Healthy lists usually include all three without repeating the
        same stem ten times.
      </p>
      <h3>Watch the 500-character budget</h3>
      <p>
        Long multi-word phrases consume the 500-character total quickly. If a competitor uses many short
        tags, they may optimize for breadth; fewer long phrases often chase specific queries.
      </p>

      <h2>Why extracting YouTube Video SEO Tags still matters in 2026</h2>
      <p>
        YouTube has repeatedly said tags are a lighter signal than they once were, especially for
        misspellings. They remain a structured place to declare alternate names, product SKUs, event
        titles, and language variants that would clutter a title. For agencies, tag extraction is also an
        audit tool for outdated campaign tags or copy-paste sets reused across unrelated videos.
      </p>

      <h2>Related tools</h2>
      <p>
        After you collect competitor tags, draft titles with the{' '}
        <Link href="/title-generator">AI Title Generator</Link>, use{' '}
        <Link href="/channel-tags">Channel Tags</Link> for patterns across uploads, and pull spoken
        keywords with the{' '}
        <Link href="/transcript-extractor">YouTube Video Transcript &amp; Subtitles Extractor</Link>.
      </p>
    </>
  );
}
