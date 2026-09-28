import Link from 'next/link';

export function DownloadThumbnailsArticle() {
  return (
    <>
      <p>
        <strong>Paste the video link, then save a size that actually exists.</strong> A YouTube
        thumbnail may be available in several versions. For a quick reference image, try the
        largest option in our <Link href="/thumbnail-downloader">Thumbnail Downloader</Link>;
        if the preview is unavailable, choose a smaller option. The image you get cannot contain
        more detail than the version YouTube made available for that video.
      </p>
      <p>
        This guide is for a video’s cover image, not the video or audio itself. It covers common
        CDN sizes our tool offers and the higher-resolution variants documented by YouTube’s API.
        A creator’s uploaded thumbnail canvas and the public version retrieved later are not
        necessarily the same file or resolution.
      </p>

      <h2>Download a thumbnail in three steps</h2>
      <ol>
        <li>Copy the URL of a public YouTube video.</li>
        <li>Paste it into the <Link href="/thumbnail-downloader">Thumbnail Downloader</Link>.</li>
        <li>Preview an available size, then use its Download button to save the image.</li>
      </ol>
      <p>
        Start with Max for a large reference image. Choose SD or HQ if the high-resolution version
        is missing or you need a smaller file. The tool uses the video ID to look up thumbnail
        images; it does not alter the original thumbnail or create missing resolutions.
      </p>

      <h2>Common thumbnail sizes</h2>
      <table>
        <thead><tr><th scope="col">Name</th><th scope="col">Typical video size</th><th scope="col">When to use it</th></tr></thead>
        <tbody>
          <tr><td>Max resolution</td><td>1280 × 720</td><td>Large reference or audit, when available</td></tr>
          <tr><td>Standard</td><td>640 × 480</td><td>Medium preview</td></tr>
          <tr><td>High</td><td>480 × 360</td><td>Smaller preview</td></tr>
          <tr><td>Medium</td><td>320 × 180</td><td>Compact list preview</td></tr>
          <tr><td>Default</td><td>120 × 90</td><td>Small reference only</td></tr>
        </tbody>
      </table>
      <p>
        YouTube’s video API documents these dimensions, but says some sizes are available only for
        certain videos. A label is not proof that every video has that image. Also note the aspect
        ratios: Standard and High are commonly 4:3, while Max and Medium are 16:9. Compare the
        actual preview before using one in a layout.
      </p>

      <h2>What about 1080p, 2K, and 4K?</h2>
      <p>
        YouTube’s current video API documentation also lists optional <code>fhd</code> (1920 ×
        1080), <code>qhd</code> (2560 × 1440), and <code>uhd</code> (3840 × 2160) thumbnail
        resources for some videos. Our downloader currently offers the common CDN set up to
        1280 × 720; it does not promise those higher API variants. Do not assume a video has a 4K
        cover merely because it plays in 4K.
      </p>
      <p>
        If you are designing your <em>own</em> cover, follow YouTube’s current custom-thumbnail
        upload recommendations instead of inferring an upload canvas from a downloaded CDN copy.
        The recommended upload size can change independently of the resolution returned by a
        thumbnail URL.
      </p>

      <h2>Use the image responsibly</h2>
      <p>
        Downloading a public cover for analysis does not transfer its copyright or make it your
        artwork. Use other creators’ thumbnails as references for framing, contrast, and title
        clarity; make an original cover for your own upload. To check how that cover will read in
        context, use the <Link href="/thumbnail-preview-tester">Thumbnail Preview Tester</Link>.
        For more dimensions and design context, read the{' '}
        <Link href="/blog/youtube-thumbnail-dimensions-guide">thumbnail dimensions guide</Link>.
      </p>

      <h2>Official sources</h2>
      <p>
        Sizes and availability checked 28 September 2026: YouTube’s{' '}
        <a href="https://developers.google.com/youtube/v3/docs/videos" target="_blank" rel="noopener noreferrer">video thumbnail fields</a>,{' '}
        <a href="https://developers.google.com/youtube/v3/docs/thumbnails" target="_blank" rel="noopener noreferrer">thumbnail resource guide</a>, and{' '}
        <a href="https://support.google.com/youtube/answer/72431?hl=en" target="_blank" rel="noopener noreferrer">custom thumbnail upload help</a>.
      </p>
    </>
  );
}
