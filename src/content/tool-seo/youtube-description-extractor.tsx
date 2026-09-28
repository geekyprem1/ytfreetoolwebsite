import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I copy a YouTube video description?',
    a: 'Paste the video URL above and the tool loads the full description. Use the Copy button for the whole text, or Download to save it as a .txt file. It also lists the links, hashtags and chapter timestamps found in the description.',
  },
  {
    q: 'Can I extract the description from any video?',
    a: 'From any public or unlisted video that you have the link to. Private and age-restricted videos, or videos removed by the uploader, cannot be read. The description is exactly what the creator wrote, straight from the YouTube Data API.',
  },
  {
    q: 'Does it show the links and chapters in the description?',
    a: 'Yes. The tool detects URLs, hashtags (#likethis), and chapter timestamps (lines that start with a time such as 0:00 or 1:02:33) and lists them separately so you can scan or reuse them quickly.',
  },
  {
    q: 'Why is a link in the description not clickable here?',
    a: 'For safety, links open in a new tab and are marked nofollow. Always check where a link goes before clicking — descriptions can contain promotional or affiliate links.',
  },
  {
    q: 'Can I use this for competitor research?',
    a: 'Yes. Comparing how similar channels structure descriptions — keywords in the first lines, chapter lists, link placement, hashtag choices — is a good way to improve your own. Write your own descriptions rather than copying theirs.',
  },
  {
    q: 'Is the Description Extractor free?',
    a: 'Yes. It is free, needs no login, and reads only public video data.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the Description Extractor does</h2>
      <p>
        Paste a YouTube video link and this tool returns the video’s full description as plain text you can copy or
        download. It also scans the description and pulls out three things separately: every{' '}
        <strong>link</strong>, every <strong>hashtag</strong>, and every <strong>chapter timestamp</strong> (lines
        that begin with a time like <code>0:00</code>). That makes it easy to grab references, check a chapter list,
        or study how other creators lay out their descriptions.
      </p>

      <h2>How to extract a description</h2>
      <ol>
        <li>Copy the URL of the YouTube video.</li>
        <li>Paste it above and select <strong>Extract</strong>.</li>
        <li>Copy the full text, download it as a file, or scan the detected links, hashtags and chapters.</li>
      </ol>

      <h2>Why extract a description?</h2>
      <ul>
        <li>
          <strong>Research and references.</strong> Save the sources, tools and links a video cites without pausing
          and squinting at the description box.
        </li>
        <li>
          <strong>Competitor analysis.</strong> See how top videos in your niche open their descriptions, place
          keywords, and structure chapters.
        </li>
        <li>
          <strong>Repurposing your own work.</strong> Pull an old description to reuse links and chapters in a new
          upload.
        </li>
        <li>
          <strong>Accessibility and notes.</strong> Read the description as text alongside the transcript.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Get just the title with the <Link href="/youtube-title-extractor">Title Extractor</Link>, the tags with the{' '}
        <Link href="/tags-extractor">Tags Extractor</Link>, and the spoken text with the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link>. For views, likes and full metadata, use{' '}
        <Link href="/video-statistics">Video Statistics</Link>. Writing your own description? Try the{' '}
        <Link href="/description-generator">AI Description Generator</Link>.
      </p>
    </>
  );
}
