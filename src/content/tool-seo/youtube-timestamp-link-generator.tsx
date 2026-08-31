import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I make a YouTube link start at a specific time?',
    a: 'Add the ?t= parameter to the URL followed by the number of seconds. For example, https://youtu.be/VIDEOID?t=90 starts playback at 1 minute 30 seconds. This tool builds that link for you from hours, minutes, and seconds so you do not have to convert to seconds by hand.',
  },
  {
    q: 'What is the difference between ?t= and &t= in a YouTube link?',
    a: 'Use ?t= when the time is the first parameter in the URL (as with youtu.be short links) and &t= when the URL already has a parameter such as ?v=VIDEOID. Both set the start time. This tool uses the youtu.be short format with ?t=, which works everywhere.',
  },
  {
    q: 'Does the timestamp work on mobile and in embeds?',
    a: 'Yes. The ?t= start time works in the YouTube app, mobile browsers, and desktop. For embedded players the equivalent parameter is start= (in seconds); the shareable youtu.be link this tool generates works for normal viewing and sharing.',
  },
  {
    q: 'Can I generate links for a whole list of chapters at once?',
    a: 'Yes. Switch to bulk mode and paste one timestamp per line, optionally followed by a label (for example "1:30 First point"). The tool creates a jump link for each line and lets you copy or download them together.',
  },
  {
    q: 'What time formats can I paste in bulk mode?',
    a: 'You can use seconds (90), minutes:seconds (1:30), or hours:minutes:seconds (1:05:30). Any text after the timestamp on the same line becomes the chapter label.',
  },
  {
    q: 'Is this the same as adding chapters to my video?',
    a: 'No. Chapters are created by putting timestamps in your video description starting at 0:00. This tool makes shareable links that jump to a moment — useful in comments, community posts, and messages. To generate the description timestamps themselves, use the AI Timestamp Generator.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube timestamp link?</h2>
      <p>
        A timestamp link is a normal YouTube URL with a start time attached, so the video begins playing
        at an exact moment instead of the beginning. It works by appending <code>?t=</code> and the
        number of seconds — for example <code>https://youtu.be/VIDEOID?t=90</code> opens at 1:30.
      </p>
      <p>
        Rather than telling someone “skip to about 3 minutes in,” you send a link that lands them there
        instantly. This tool converts hours, minutes, and seconds into the correct link for you, and can
        turn a full chapter list into a set of jump links in one step.
      </p>

      <h2>How to create a timestamp link</h2>
      <ol>
        <li>
          <strong>Paste the video URL</strong> — Any watch, <code>youtu.be</code>, or shorts link works.
        </li>
        <li>
          <strong>Set the start time</strong> — Enter hours, minutes, and seconds, or switch to bulk mode
          for a list of chapters.
        </li>
        <li>
          <strong>Copy the link</strong> — Click to copy a single link, or export the whole set as text.
        </li>
      </ol>

      <h2>When timestamp links are useful</h2>
      <ul>
        <li>
          <strong>Answering comments</strong> — Point viewers to the exact part of a video that answers
          their question.
        </li>
        <li>
          <strong>Sharing highlights</strong> — Send the best 20 seconds of a long stream or podcast.
        </li>
        <li>
          <strong>Documentation &amp; support</strong> — Link to the precise step in a tutorial.
        </li>
        <li>
          <strong>Show notes</strong> — Build a clickable chapter index for podcasts and interviews.
        </li>
      </ul>

      <h2>Timestamp link vs video chapters</h2>
      <p>
        A timestamp link is for sharing — it jumps a viewer to a moment. Video chapters are for
        navigation inside your own video and are created by listing timestamps (starting at{' '}
        <code>0:00</code>) in the description. If you want the chapter timestamps for your description,
        generate them with the{' '}
        <Link href="/timestamp-generator">AI Timestamp Generator</Link>, then use this tool to turn any
        of them into shareable jump links.
      </p>

      <h2>Related tools</h2>
      <p>
        Pair this with the <Link href="/timestamp-generator">Timestamp Generator</Link> for description
        chapters, the <Link href="/youtube-embed-code-generator">Embed Code Generator</Link> to embed a
        clip that starts at a set time, and the{' '}
        <Link href="/transcript-extractor">Transcript Extractor</Link> to find the exact moments worth
        linking.
      </p>
    </>
  );
}
