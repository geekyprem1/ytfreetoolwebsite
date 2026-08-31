import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How does the YouTube script generator work?',
    a: 'Enter your topic, pick a target length and tone, and the AI writes a full script structured into a hook, intro, body sections, and a call-to-action. You can copy or download it and edit before recording.',
  },
  {
    q: 'What length options are available?',
    a: 'You can target a 30-60 second Short, roughly 5, 8, or 15 minutes, or a 20+ minute long-form video. The AI paces the script and the number of sections to fit the length you choose.',
  },
  {
    q: 'Should I use the script word for word?',
    a: 'Treat it as a strong first draft. The structure, hook, and flow save you time, but your own voice, examples, and personality are what make a video work. Edit it to sound like you.',
  },
  {
    q: 'Does it write camera directions or just what I say?',
    a: 'It writes the spoken lines — what you actually say on camera — organized by section. It does not fill the script with stage directions, so it reads naturally when you record.',
  },
  {
    q: 'Why does the hook come first?',
    a: 'The first few seconds decide whether viewers stay. The generator always opens with a 3-5 second hook because retention early in a video strongly influences how far it reaches. You can regenerate to try different hook angles.',
  },
  {
    q: 'Can I generate a script for Shorts?',
    a: 'Yes. Choose the Short (30-60s) length and the AI writes a tight, fast-paced script suited to vertical short-form, leading with an immediate hook.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube script generator?</h2>
      <p>
        A script generator turns a topic into a ready-to-film YouTube script. You choose the length and
        tone, and AI writes a structured script: a strong hook, an intro that sets up the value, body
        sections that deliver it, and a closing call-to-action.
      </p>
      <p>
        It removes the blank-page problem. Instead of staring at an empty doc, you start from a solid
        draft and spend your energy on delivery, examples, and editing.
      </p>

      <h2>How to generate a video script</h2>
      <ol>
        <li>
          <strong>Enter your topic</strong> — Be specific; “how to start a podcast in 2026” beats
          “podcasting”.
        </li>
        <li>
          <strong>Pick length and tone</strong> — From a 60-second Short to a 20-minute deep dive.
        </li>
        <li>
          <strong>Generate and edit</strong> — Copy or download the script, then make it your own.
        </li>
      </ol>

      <h2>What a good script structure looks like</h2>
      <ul>
        <li>
          <strong>Hook (3-5s)</strong> — A reason to keep watching, delivered immediately.
        </li>
        <li>
          <strong>Intro</strong> — What the video covers and why it is worth the viewer’s time.
        </li>
        <li>
          <strong>Body sections</strong> — The core content, broken into clear, ordered points.
        </li>
        <li>
          <strong>Call-to-action</strong> — What to do next: subscribe, watch another video, or comment.
        </li>
      </ul>

      <h2>Tips for using AI scripts well</h2>
      <p>
        Read the script out loud and cut anything that sounds robotic. Replace generic examples with
        your own stories and data — that is what builds trust and watch time. Regenerate to compare hook
        angles, then commit to the one that best matches your video. The AI handles structure; you supply
        the personality.
      </p>

      <h2>Related tools</h2>
      <p>
        Pair this with the <Link href="/hook-generator">Hook Generator</Link> for extra opening options,
        the <Link href="/title-generator">Title Generator</Link> to package the finished video, and the{' '}
        <Link href="/description-generator">Description Generator</Link> to write the description.
      </p>
    </>
  );
}
