import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How many elements can I put on a YouTube end screen?',
    a: 'For a video with standard 16:9 aspect ratio, YouTube allows up to four end-screen elements. Other video aspect ratios may have a lower limit.',
  },
  {
    q: 'How long can a YouTube end screen be?',
    a: 'YouTube end screens can appear in the final 5 to 20 seconds of a video. The video itself must be at least 25 seconds long.',
  },
  {
    q: 'What end-screen elements can I add?',
    a: 'YouTube Studio supports video, playlist, subscribe, channel, and link elements. External website links require eligibility in the YouTube Partner Program.',
  },
  {
    q: 'Does this planner upload my final-frame image?',
    a: 'No. The selected image stays in your browser. It is used locally as the canvas background and never sent to yttools.pro.',
  },
  {
    q: 'Is this a YouTube Studio end-screen editor?',
    a: 'No. It is a layout reference planner. Exported PNGs include guides so you can recreate the arrangement manually in YouTube Studio or your video editor.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>YouTube end screen safe-zone template: 1280×720 planning canvas</h2>
      <p>
        A YouTube end screen appears only at the end of a video, so the last frame needs room for calls to
        action before you open YouTube Studio. This planner uses a 16:9, 1280×720 reference canvas: add a
        final-frame image or begin with the blank guide, then place up to four elements for a standard 16:9
        video.
      </p>
      <p>
        The exported image is intentionally a <strong>layout guide</strong>, not a fake YouTube Studio
        screen. It preserves your background and overlays clear boxes, labels, and grid lines for the edit
        handoff.
      </p>

      <h2>YouTube end screen requirements at a glance</h2>
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Rule for standard 16:9 videos</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Timing window</td><td>Last 5–20 seconds</td></tr>
          <tr><td>Minimum video length</td><td>25 seconds</td></tr>
          <tr><td>Maximum element count</td><td>4 elements</td></tr>
          <tr><td>Available element types</td><td>Video, playlist, subscribe, channel, link</td></tr>
        </tbody>
      </table>
      <p>
        YouTube lets you change an element&apos;s placement and timing in the Studio editor; its own editor
        also offers grid and snap controls. This tool uses the same practical workflow to plan the screen,
        but YouTube Studio remains the final editor and can adapt a layout for viewers, devices, and
        context.
      </p>

      <h2>How to plan the last 20 seconds of a YouTube video</h2>
      <ol>
        <li>Enter the complete video duration and choose a 5–20 second end-screen window.</li>
        <li>Upload the final frame if you have one; otherwise use the blank 16:9 canvas.</li>
        <li>Place only the next action a viewer should take: another video, a playlist, or subscribe.</li>
        <li>Use the grid and snap option to align the boxes without covering the important subject.</li>
        <li>Export the PNG guide, then recreate and preview the arrangement in YouTube Studio.</li>
      </ol>

      <h2>Choose end-screen elements deliberately</h2>
      <p>
        YouTube supports video, playlist, subscribe, channel, and link elements. A link element has
        separate YouTube Partner Program eligibility requirements, so do not promise an external link in
        your edit before confirming it is available to your channel. Keep text and faces away from the
        draggable boxes; the last 20 seconds should give the viewer room and time to act.
      </p>
      <p>
        If you are trying to build long-form watch time, pair a relevant next-video element with a strong
        opening on that destination video. The{' '}
        <Link href="/youtube-watch-time-calculator">YouTube Watch Time Calculator</Link> helps model the
        watch-hour route, while the{' '}
        <Link href="/youtube-monetization-progress-calculator">Monetization Progress Calculator</Link>
        keeps that work connected to your YPP goal.
      </p>

      <h2>Official YouTube guidance</h2>
      <p>
        Last verified 18 September 2026 against YouTube&apos;s{' '}
        <a
          href="https://support.google.com/youtube/answer/6388789?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          end-screen documentation
        </a>
        . End screens are unavailable on some surfaces and for videos set as made for kids, so verify the
        final setup in Studio before publishing.
      </p>
    </>
  );
}
