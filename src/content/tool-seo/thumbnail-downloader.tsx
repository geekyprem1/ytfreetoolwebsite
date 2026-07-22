import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What thumbnail resolutions can I download with this YouTube Video Thumbnail Downloader (HD maxresdefault)?',
    a: 'YouTube’s public CDN (i.ytimg.com) serves maxresdefault at 1280×720 when available, plus 640×480 (sddefault), 480×360 (hqdefault), 320×180 (mqdefault), and 120×90 (default). This tool is for YouTube video covers — not Windows thumbs.db system files.',
  },
  {
    q: 'Why is Max (1280×720) sometimes missing?',
    a: 'Not every upload has a maxresdefault.jpg file. Older videos, some Shorts, and certain custom uploads only publish smaller frames such as hqdefault (480×360). When Max is unavailable, choose HD/HQ or SD instead.',
  },
  {
    q: 'Do I need to log in to download a YouTube video thumbnail?',
    a: 'No. Paste a public video URL or ID and download directly. Typical fetches complete in under 0.8 seconds. No Google account, browser extension, or signup is required.',
  },
  {
    q: 'Is downloading YouTube thumbnails legal under US Fair Use?',
    a: 'Using a published thumbnail for private design research and inspiration is common practice and may qualify as fair use under 17 U.S. Code § 107 depending on purpose and amount used. Re-uploading someone else’s exact artwork as your own cover, or using it commercially without permission, can violate copyright. Study patterns; do not clone protected assets.',
  },
  {
    q: 'Can I download maxresdefault HD thumbnails from unlisted YouTube videos?',
    a: 'If you have the unlisted URL and YouTube still serves the public CDN thumbnail paths for that video ID, Max (1280×720) and other sizes can usually be fetched the same way as public videos. Private, age-restricted, or region-blocked videos may not return thumbnail URLs.',
  },
  {
    q: 'What file format are the downloads?',
    a: 'YouTube thumbnail endpoints return JPEG images via the i.ytimg.com CDN documented in the Google YouTube Data API v3 resources. Filenames typically include the video ID and quality label.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>Key specs for YouTube Video Thumbnail Downloader (HD maxresdefault)</h2>
      <p>
        This free YouTube Video Thumbnail Downloader (HD maxresdefault) pulls original cover images from
        YouTube’s CDN — not browser screenshots or Windows <code>thumbs.db</code> files. Paste any public
        or accessible unlisted video URL to preview and save JPEG frames in under 0.8 seconds.
      </p>
      <table>
        <thead>
          <tr>
            <th>Quality label</th>
            <th>Filename</th>
            <th>Dimensions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max</td>
            <td>
              <code>maxresdefault.jpg</code>
            </td>
            <td>1280×720</td>
          </tr>
          <tr>
            <td>SD</td>
            <td>
              <code>sddefault.jpg</code>
            </td>
            <td>640×480</td>
          </tr>
          <tr>
            <td>HQ</td>
            <td>
              <code>hqdefault.jpg</code>
            </td>
            <td>480×360</td>
          </tr>
          <tr>
            <td>MQ</td>
            <td>
              <code>mqdefault.jpg</code>
            </td>
            <td>320×180</td>
          </tr>
          <tr>
            <td>Default</td>
            <td>
              <code>default.jpg</code>
            </td>
            <td>120×90</td>
          </tr>
        </tbody>
      </table>
      <p>
        CDN endpoints follow patterns documented in the{' '}
        <a
          href="https://developers.google.com/youtube/v3/docs/thumbnails"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google YouTube Data API v3 Thumbnails documentation
        </a>{' '}
        (<code>i.ytimg.com</code>). YouTube Creator Academy guidance stresses clear faces, high contrast,
        and readable text for click-through — thumbnails remain one of the strongest packaging signals.
      </p>

      <h2>How to download a YouTube video thumbnail</h2>
      <ol>
        <li>
          <strong>Copy the video URL</strong> — Any watch, Shorts, share, or unlisted link that contains
          the video ID works.
        </li>
        <li>
          <strong>Paste it above</strong> — Submit the URL to load available qualities.
        </li>
        <li>
          <strong>Preview each size</strong> — Compare Max (1280×720), SD (640×480), HQ (480×360), and MQ
          (320×180) before saving.
        </li>
        <li>
          <strong>Download the quality you need</strong> — Prefer Max for decks and print; HQ or MQ for
          quick references.
        </li>
      </ol>

      <h2>Download maxresdefault HD thumbnail from an unlisted YouTube video</h2>
      <p>
        To download a maxresdefault HD thumbnail from an unlisted YouTube video, paste the full unlisted
        watch URL (the one with the video ID). If YouTube still hosts{' '}
        <code>maxresdefault.jpg</code> for that ID on <code>i.ytimg.com</code>, this tool surfaces Max at
        1280×720 alongside smaller fallbacks. Unlisted is not private — anyone with the link can often
        fetch the same CDN paths. Age-restricted or truly private uploads may block public thumbnail URLs.
      </p>

      <h3>Max / maxresdefault (1280×720)</h3>
      <p>
        Largest common public thumbnail. Use it when you need readable text overlays or want to inspect
        composition at near-player scale. If Max fails to load, the video never received a maxres asset.
      </p>
      <h3>Why original CDN thumbnails beat screenshots</h3>
      <p>
        Screenshots capture UI chrome and display compression. CDN files are the same images YouTube
        serves in search and suggested rails — critical when measuring face scale and 16:9 safe area per
        Creator Academy packaging advice.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Multiple quality endpoints from YouTube’s public thumbnail CDN</li>
        <li>Instant preview before you save a file (typically under 0.8 seconds)</li>
        <li>Works without login or browser extensions</li>
        <li>Accepts standard watch URLs, Shorts URLs, unlisted links, and bare video IDs</li>
        <li>Mobile-friendly workflow for saving references on the go</li>
      </ul>

      <h2>Legal note (US Fair Use Doctrine)</h2>
      <p>
        Under{' '}
        <a
          href="https://www.law.cornell.edu/uscode/text/17/107"
          target="_blank"
          rel="noopener noreferrer"
        >
          17 U.S. Code § 107
        </a>
        , limited use of copyrighted material for criticism, comment, research, or education may be fair
        use. Downloading a YouTube video thumbnail for private design research is different from
        republishing the exact artwork as your own cover. When in doubt, redraw in your brand system.
      </p>

      <h2>Related tools</h2>
      <p>
        Pair thumbnail research with the <Link href="/tags-extractor">YouTube Video SEO Tags Extractor</Link>,
        then score packaging with the <Link href="/seo-score-checker">SEO Score Checker</Link>. Draft
        titles with the <Link href="/title-generator">AI Title Generator</Link> after you study competitor
        covers.
      </p>
    </>
  );
}
