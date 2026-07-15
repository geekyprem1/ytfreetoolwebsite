import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What thumbnail resolutions can I download?',
    a: 'YouTube serves several CDN sizes. maxresdefault is typically 1280×720 when available. sddefault is 640×480, hqdefault is 480×360, and mqdefault is 320×180. Our tool surfaces these quality options so you can pick the largest available file.',
  },
  {
    q: 'Why is Max (1280×720) sometimes missing?',
    a: 'Not every upload has a maxresdefault file. Older videos, some Shorts, and certain custom uploads only publish smaller frames such as hqdefault (480×360). When Max is unavailable, choose HD/HQ or SD instead.',
  },
  {
    q: 'Do I need to log in to download a thumbnail?',
    a: 'No. Paste a public video URL or ID and download directly. No Google account, browser extension, or signup is required.',
  },
  {
    q: 'Is downloading thumbnails allowed for competitor research?',
    a: 'Using a published thumbnail for private design research and inspiration is common practice. Re-uploading someone else’s exact artwork as your own cover, or using it commercially without permission, can violate copyright. Study patterns; do not clone protected assets.',
  },
  {
    q: 'Does this work with YouTube Shorts and live VODs?',
    a: 'Yes for public Shorts and finished live recordings that have a standard video ID. Private, age-restricted, or region-blocked videos may not return thumbnail URLs through the public CDN paths.',
  },
  {
    q: 'What file format are the downloads?',
    a: 'YouTube thumbnail endpoints return JPEG images. Filenames typically include the video ID and quality label so you can keep Max, SD, and HQ versions organized.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What a YouTube thumbnail downloader does</h2>
      <p>
        A YouTube thumbnail downloader fetches the cover image YouTube already hosts for a video — not a
        browser screenshot. You paste a URL, the tool resolves the video ID, and it requests known CDN
        paths such as <code>maxresdefault.jpg</code> (up to 1280×720) and <code>hqdefault.jpg</code>{' '}
        (480×360). That gives you the original frame creators uploaded or that YouTube auto-generated.
      </p>
      <p>
        Creators use this for mood boards, A/B inspiration, brand audits, and blog embeds. Marketers use
        it to document how top videos in a niche present faces, contrast, and text overlays without
        scrubbing the player timeline.
      </p>

      <h2>How to download a YouTube thumbnail</h2>
      <ol>
        <li>
          <strong>Copy the video URL</strong> — Any watch, Shorts, or share link that contains the video
          ID works.
        </li>
        <li>
          <strong>Paste it above</strong> — Submit the URL to load available qualities.
        </li>
        <li>
          <strong>Preview each size</strong> — Compare Max (1280×720), SD (640×480), HQ (480×360), and
          MQ (320×180) before saving.
        </li>
        <li>
          <strong>Download the quality you need</strong> — Prefer Max for decks and print; HQ or MQ for
          quick references and social drafts.
        </li>
      </ol>

      <h2>Thumbnail quality options explained</h2>
      <h3>Max / maxresdefault (1280×720)</h3>
      <p>
        This is the largest common public thumbnail. Use it when you need readable text overlays or want
        to inspect composition at near-player scale. If Max fails to load, the video simply never received
        a maxres asset.
      </p>
      <h3>SD / sddefault (640×480)</h3>
      <p>
        A solid middle ground for presentations and Notion boards. It is larger than HQ but still compact
        enough for galleries of many competitor covers.
      </p>
      <h3>HQ / hqdefault (480×360)</h3>
      <p>
        Almost always present. Useful when Max is missing or when you only need a clear reference of
        color and subject framing.
      </p>
      <h3>MQ / mqdefault (320×180)</h3>
      <p>
        Best for grids and wireframes. At this size you judge silhouette and contrast more than fine
        typography.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Multiple quality endpoints from YouTube’s public thumbnail CDN</li>
        <li>Instant preview before you save a file</li>
        <li>Works without login or browser extensions</li>
        <li>Accepts standard watch URLs, Shorts URLs, and bare video IDs</li>
        <li>Mobile-friendly workflow for saving references on the go</li>
      </ul>

      <h2>Why original CDN thumbnails beat screenshots</h2>
      <p>
        Screenshots capture UI chrome, progress bars, and compression artifacts from your display.
        CDN files are the same images YouTube serves in search and suggested rails. That matters when
        you are measuring how bold a title treatment is, or whether a face fills enough of the 16:9
        safe area.
      </p>
      <p>
        Pair thumbnail research with metadata research. After you save a cover, open the{' '}
        <Link href="/tags-extractor">Tags Extractor</Link> on the same URL to see which keywords the
        upload targets, then score your own packaging with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>

      <h2>Practical tips and common mistakes</h2>
      <ul>
        <li>
          <strong>Do not assume Max always exists</strong> — Fall back to SD or HQ instead of forcing a
          stretched small image.
        </li>
        <li>
          <strong>Study patterns, not pixels to clone</strong> — Note face scale, contrast, and limited
          text; redraw in your brand system.
        </li>
        <li>
          <strong>Check mobile crop</strong> — YouTube often crops toward the center on small screens;
          important text near the edges can disappear.
        </li>
        <li>
          <strong>Keep a dated swipe file</strong> — Niches change seasonally; dated folders beat a
          single messy downloads directory.
        </li>
        <li>
          <strong>Verify your own uploads</strong> — Download Max after publishing to confirm the live
          asset matches what you uploaded in Studio.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Build a full packaging loop: generate title options with the{' '}
        <Link href="/title-generator">AI Title Generator</Link>, write the description with the{' '}
        <Link href="/description-generator">Description Generator</Link>, then revisit this downloader
        when you audit competitors that already rank for your keyword.
      </p>
    </>
  );
}
