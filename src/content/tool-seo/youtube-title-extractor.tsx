import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I get the title of a YouTube video?',
    a: 'Paste the video URL above and the tool returns the exact title as plain text, with a copy button. It reads the title from the YouTube Data API, so it matches the video exactly — no manual retyping.',
  },
  {
    q: 'Why not just copy the title from the page?',
    a: 'You can, but the page title often includes extra text like “- YouTube” or the channel name, and copying from the player can add stray characters. This tool gives you the clean title on its own, plus its character count.',
  },
  {
    q: 'Does it work for Shorts and live streams?',
    a: 'Yes. Any public YouTube video, Short or past live stream with a standard URL works. Private, deleted or age-restricted videos cannot be read.',
  },
  {
    q: 'Can I extract several titles at once?',
    a: 'This tool handles one video at a time. For a full breakdown of a single video — title, description, tags and stats — use the Video Statistics and Description Extractor tools.',
  },
  {
    q: 'Is the extracted title accurate?',
    a: 'Yes. It is the current title straight from YouTube. If the creator changes the title later, extracting again returns the updated version.',
  },
  {
    q: 'Is the Title Extractor free?',
    a: 'Yes. It is free, instant, needs no login, and reads only public video data.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the Title Extractor does</h2>
      <p>
        Paste a YouTube video link and this tool returns the video’s exact title as clean, copyable text — without
        the “- YouTube” suffix or channel name that gets copied from the browser tab. It also shows the title’s
        character count against YouTube’s <strong>100-character limit</strong>, so you can see at a glance whether a
        title you are studying is short or long.
      </p>

      <h2>How to extract a title</h2>
      <ol>
        <li>Copy the URL of the YouTube video, Short or stream.</li>
        <li>Paste it above and select <strong>Extract</strong>.</li>
        <li>Copy the clean title with one click.</li>
      </ol>

      <h2>When it helps</h2>
      <ul>
        <li>Citing or referencing a video accurately in an article, script or bibliography.</li>
        <li>Collecting competitor titles to study patterns before writing your own.</li>
        <li>Building playlists, spreadsheets or show notes without retyping.</li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Check whether a title fits with the <Link href="/youtube-title-length-checker">Title Length Checker</Link>,
        tidy its casing with the <Link href="/youtube-title-capitalizer">Title Capitalizer</Link>, pull the full
        description with the <Link href="/youtube-description-extractor">Description Extractor</Link>, or see all
        metadata with <Link href="/video-statistics">Video Statistics</Link>. Need new title ideas? Use the{' '}
        <Link href="/title-generator">AI Title Generator</Link>.
      </p>
    </>
  );
}
