import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I embed a YouTube video on my website?',
    a: 'Paste the video URL above, choose your options, and copy the generated iframe code. Paste that code into your page’s HTML where you want the player to appear. The responsive option keeps the video sized correctly on phones, tablets, and desktops without extra CSS.',
  },
  {
    q: 'What is youtube-nocookie.com and should I use it?',
    a: 'youtube-nocookie.com is YouTube’s privacy-enhanced embed domain. It delays setting tracking cookies until the visitor actually plays the video, which helps with privacy and consent requirements such as GDPR. The tool enables it by default; you can turn it off if you specifically need standard youtube.com embeds.',
  },
  {
    q: 'How do I make a YouTube embed responsive?',
    a: 'Keep the Responsive option on. It wraps the iframe in a container with a 56.25% bottom padding (the 16:9 aspect ratio) and absolutely positions the player to fill it. The video then scales to the width of its parent element on any screen size.',
  },
  {
    q: 'Can I set a start and end time for the embedded video?',
    a: 'Yes. Enter a start time and optional end time in seconds. The tool adds start= and end= parameters to the embed URL, so the player begins and stops at those points.',
  },
  {
    q: 'Why does autoplay only work when the video is muted?',
    a: 'Most browsers block autoplay with sound to protect users. When you enable autoplay, the tool automatically adds mute=1 so the video can start on load. Viewers can unmute manually.',
  },
  {
    q: 'How do I loop a YouTube embed?',
    a: 'Turn on Loop. For a single video, YouTube requires both loop=1 and playlist=VIDEOID, which the tool adds for you automatically so the video restarts when it ends.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube embed code generator?</h2>
      <p>
        This tool builds the <code>&lt;iframe&gt;</code> code you paste into a web page to display a
        YouTube video. Instead of memorizing player parameters, you toggle options — responsive sizing,
        start and end time, autoplay, mute, loop, controls, privacy mode — and copy ready-to-use code
        with a live preview.
      </p>
      <p>
        The default output is responsive and privacy-friendly: it scales to any screen and uses the{' '}
        <code>youtube-nocookie.com</code> domain so tracking cookies are not set until a visitor plays
        the video.
      </p>

      <h2>How to generate YouTube embed code</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — Any watch, <code>youtu.be</code>, or shorts link.
        </li>
        <li>
          <strong>Pick your options</strong> — Responsive or fixed size, start/end time, autoplay, mute,
          loop, controls, privacy mode, and whether to hide related videos.
        </li>
        <li>
          <strong>Preview and copy</strong> — Confirm the player looks right in the live preview, then
          copy the iframe or download it as an HTML snippet.
        </li>
      </ol>

      <h2>Embed options explained</h2>
      <ul>
        <li>
          <strong>Responsive</strong> — Wraps the player in a 16:9 container so it fills its parent width
          on every device.
        </li>
        <li>
          <strong>Privacy (nocookie)</strong> — Uses <code>youtube-nocookie.com</code> to defer cookies
          until playback, useful for consent and GDPR.
        </li>
        <li>
          <strong>Start / end time</strong> — Adds <code>start=</code> and <code>end=</code> in seconds to
          play only a segment.
        </li>
        <li>
          <strong>Autoplay &amp; mute</strong> — Autoplay is paired with mute automatically because
          browsers block unmuted autoplay.
        </li>
        <li>
          <strong>Loop</strong> — Restarts the video using the required <code>loop=1</code> plus{' '}
          <code>playlist=VIDEOID</code> combination.
        </li>
        <li>
          <strong>Controls &amp; related</strong> — Hide the control bar or reduce related-video
          suggestions with <code>rel=0</code>.
        </li>
      </ul>

      <h2>Tips for embedding responsibly</h2>
      <p>
        Use privacy mode on sites that show a cookie banner. Avoid autoplay with sound — it frustrates
        visitors and hurts engagement. For a segment rather than the whole video, set a start and end
        time; if you only need to link (not embed) to a moment, use the{' '}
        <Link href="/youtube-timestamp-link-generator">Timestamp Link Generator</Link> instead.
      </p>

      <h2>Related tools</h2>
      <p>
        Combine this with the{' '}
        <Link href="/youtube-timestamp-link-generator">Timestamp Link Generator</Link> for shareable
        jump links, the <Link href="/thumbnail-downloader">Thumbnail Downloader</Link> to grab the
        poster image, and <Link href="/video-statistics">Video Statistics</Link> to check a video before
        you feature it.
      </p>
    </>
  );
}
