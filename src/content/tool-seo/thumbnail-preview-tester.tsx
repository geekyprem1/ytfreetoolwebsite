import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I preview my YouTube thumbnail before uploading?',
    a: 'Upload your thumbnail image (or drop it in), then view it in the home grid, sidebar, search, and mobile layouts. This shows how it will actually appear to viewers at real sizes, so you can catch problems before publishing.',
  },
  {
    q: 'Can I compare two thumbnails A/B?',
    a: 'Yes. Turn on A/B mode and upload a second thumbnail. Both render side by side in the same layout so you can judge which grabs attention and reads more clearly at a glance.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. Everything happens in your browser using local object URLs. Your thumbnails are never sent to or stored on a server, which keeps unpublished designs private.',
  },
  {
    q: 'What thumbnail size should I use?',
    a: 'YouTube recommends 1280×720 pixels (16:9), under 2 MB, in JPG, PNG, or GIF. The preview uses the 16:9 ratio, so upload at that aspect to see an accurate result.',
  },
  {
    q: 'Why does my thumbnail look different on mobile?',
    a: 'Mobile shows thumbnails much smaller, so fine detail and small text disappear. The mobile layout in this tool reveals that — if your text is unreadable there, simplify it. Most YouTube watch time comes from mobile.',
  },
  {
    q: 'Does this predict click-through rate?',
    a: 'No. It is a visual preview and comparison tool, not a CTR predictor. Use it to judge legibility and contrast across layouts; real CTR still depends on your audience and the actual test on YouTube.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube thumbnail preview and A/B tester?</h2>
      <p>
        This tool shows how your thumbnail will look on YouTube before you publish. Upload an image and
        preview it in the real surfaces where viewers see it — the home grid, sidebar suggestions, search
        results, and the mobile feed — and compare two thumbnails side by side to pick the stronger one.
      </p>
      <p>
        A thumbnail that looks great full-screen in your editor can fall apart at the small sizes YouTube
        actually uses. Previewing in context is the fastest way to catch that.
      </p>

      <h2>How to preview and compare thumbnails</h2>
      <ol>
        <li>
          <strong>Upload a thumbnail</strong> — Click or drop a 16:9 image. It stays in your browser.
        </li>
        <li>
          <strong>Switch layouts</strong> — Check the grid, sidebar, search, and mobile views, in light
          or dark mode.
        </li>
        <li>
          <strong>Turn on A/B mode</strong> — Add a second thumbnail and compare them in the same layout.
        </li>
      </ol>

      <h2>What to look for</h2>
      <ul>
        <li>
          <strong>Mobile legibility</strong> — If text is unreadable at mobile size, cut or enlarge it.
        </li>
        <li>
          <strong>Contrast</strong> — The subject should pop against the background in both light and dark
          mode.
        </li>
        <li>
          <strong>Focal point</strong> — One clear subject reads better than a busy composition at small
          sizes.
        </li>
        <li>
          <strong>Consistency</strong> — Compare against how it sits next to other videos in the grid.
        </li>
      </ul>

      <h2>Designing thumbnails that work small</h2>
      <p>
        The built-in readability checks count the words you plan to show, estimate contrast from the uploaded
        image&apos;s average brightness, and remind you to test the result at a mobile size. They do not read baked-in
        text from the image or pretend to predict click-through rate.
      </p>
      <p>
        Since most viewing happens on mobile, design for the smallest size first: big subject, minimal
        text (three or four words max), strong contrast, and a single focal point. Preview here, tweak,
        and only commit once it reads clearly in the mobile layout. The A/B view helps you choose between
        two strong options rather than guessing.
      </p>

      <h2>Related tools</h2>
      <p>
        Grab an existing thumbnail to study with the{' '}
        <Link href="/thumbnail-downloader">Thumbnail Downloader</Link>, then package the video with the{' '}
        <Link href="/title-generator">Title Generator</Link> and score it with the{' '}
        <Link href="/seo-score-checker">SEO Score Checker</Link>.
      </p>
    </>
  );
}
