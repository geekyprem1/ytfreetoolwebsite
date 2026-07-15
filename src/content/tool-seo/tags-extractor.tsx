import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What are YouTube video tags?',
    a: 'Tags are metadata keywords attached to a video in YouTube Studio. They help YouTube understand topical relevance alongside the title, description, and spoken content. Creators typically aim for a focused set rather than stuffing every possible phrase.',
  },
  {
    q: 'How many tags should a video use?',
    a: 'YouTube limits tags by total character budget (commonly cited around 500 characters). In practice, many SEO workflows target roughly 15–30 relevant tags. Our SEO Score Checker rewards the 15–30 range when scoring tag hygiene.',
  },
  {
    q: 'Can I extract tags from any video?',
    a: 'You can extract tags from public videos where tags are exposed through available metadata. Private, unlisted-with-restrictions, or videos that never set tags may return an empty list.',
  },
  {
    q: 'Are tags more important than the title?',
    a: 'No. Title, thumbnail, and content match usually outweigh tags. Tags still help disambiguate synonyms, brand names, and secondary topics that do not fit cleanly in the title.',
  },
  {
    q: 'Can I copy competitor tags into my upload?',
    a: 'You can study them, but blind copying is weak strategy. Keep only tags that truthfully describe your video, mix broad and long-tail phrases, and verify relevance with your own keyword research.',
  },
  {
    q: 'Can I export extracted tags?',
    a: 'Yes. Copy individual tags, copy the full set, or download a TXT file for your upload checklist or spreadsheet.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the YouTube Tags Extractor does</h2>
      <p>
        The Tags Extractor reads the tag list attached to a public YouTube video and shows it in plain
        text. Instead of guessing which phrases a ranking video targets, you see the exact tag strings
        the uploader saved — useful for competitive research, niche mapping, and cleaning up your own
        uploads.
      </p>
      <p>
        Tags are only one signal. Pair them with title language, description keywords, and on-screen
        topics. Still, when a competitor ranks for a phrase you never considered, their tag list is often
        the fastest clue.
      </p>

      <h2>How to extract video tags</h2>
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
          <strong>Copy or download TXT</strong> — Save the set for your research sheet or Studio paste
          workflow.
        </li>
      </ol>

      <h2>Features</h2>
      <ul>
        <li>Full visible tag list for supported public videos</li>
        <li>One-click copy for single tags or the entire set</li>
        <li>TXT export for offline research</li>
        <li>No login required</li>
        <li>Works alongside other toolkit extractors on the same URL</li>
      </ul>

      <h2>How to read a competitor tag list</h2>
      <h3>Separate brand, topic, and intent tags</h3>
      <p>
        Brand tags (channel name, series name) reinforce identity. Topic tags describe the subject.
        Intent tags mirror search phrasing such as “how to,” “review,” or “vs.” Healthy lists usually
        include all three without repeating the same stem ten times.
      </p>
      <h3>Watch the character budget</h3>
      <p>
        YouTube enforces a total character limit across tags (about 500 characters). Long multi-word
        phrases consume budget quickly. If a competitor uses many short tags, they may be optimizing for
        breadth; if they use fewer long phrases, they may be chasing specific queries.
      </p>
      <h3>Cross-check with real search language</h3>
      <p>
        After extraction, run promising phrases through the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link> and validate packaging with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>. Tags that never appear in titles or
        spoken content are weaker than tags reinforced everywhere else.
      </p>

      <h2>Why extracting tags still matters in 2026</h2>
      <p>
        YouTube has repeatedly said tags are a lighter signal than they once were, especially for
        misspellings. That does not make them useless. They remain a structured place to declare
        alternate names, product SKUs, event titles, and language variants that would clutter a title.
      </p>
      <p>
        For agencies and multi-channel managers, tag extraction is also an audit tool: you can spot
        outdated campaign tags, missing brand terms, or copy-paste sets reused across unrelated videos.
      </p>

      <h2>Tips and mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Do not paste 40 unrelated tags</strong> — Relevance beats volume; aim near the 15–30
          relevant range when the topics truly fit.
        </li>
        <li>
          <strong>Do not ignore your own videos</strong> — Extract your top earners and your flops;
          compare which tag patterns correlate with stronger sessions.
        </li>
        <li>
          <strong>Prefer truthful labels</strong> — Misleading tags can confuse recommendation systems
          and frustrate viewers who clicked for a different topic.
        </li>
        <li>
          <strong>Combine with channel-level research</strong> — Use{' '}
          <Link href="/channel-tags">Channel Tags</Link> when you want patterns across recent uploads,
          not just one video.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        After you collect competitor tags, draft stronger titles with the{' '}
        <Link href="/title-generator">Title Generator</Link> and flesh out descriptions with the{' '}
        <Link href="/description-generator">Description Generator</Link>. For on-page keyword evidence
        inside the spoken content, pull text with the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link>.
      </p>
    </>
  );
}
