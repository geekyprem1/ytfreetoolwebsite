import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How does the video ideas generator work?',
    a: 'Enter your niche and audience, pick a format, and the AI returns a list of specific video ideas. Each idea includes a suggested title, the search intent it satisfies, a ranking difficulty, and a one-line angle so you know exactly what to film.',
  },
  {
    q: 'Are the ideas actually searchable?',
    a: 'The generator aims for concrete, searchable angles rather than vague topics — for example “How I saved $5,000 in 6 months on a low income” instead of “saving money”. Specific ideas are easier to rank and more compelling to click.',
  },
  {
    q: 'What does ranking difficulty mean here?',
    a: 'It is an AI estimate of how competitive an idea is to rank for, from easy to hard. Newer channels usually win faster with easy and medium ideas that larger channels overlook. Treat it as guidance, not a guarantee.',
  },
  {
    q: 'Can I get ideas for Shorts specifically?',
    a: 'Yes. Choose the Shorts format and the ideas skew toward fast, hook-first concepts that suit vertical short-form. Pick Tutorial or Listicle to bias toward those structures instead.',
  },
  {
    q: 'How many ideas do I get?',
    a: 'Each run returns around 20 ideas. You can regenerate for a fresh batch, and copy or download the whole list to build a content calendar.',
  },
  {
    q: 'Should I make every idea?',
    a: 'No. Use the list to spot the two or three angles that fit your strengths and audience best. Quality and consistency beat volume, so pick ideas you can execute well.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube video ideas generator?</h2>
      <p>
        A video ideas generator turns your niche into a list of specific, filmable video concepts. For
        each idea you get a suggested title, the search intent it serves, a ranking-difficulty estimate,
        and a one-line angle — enough to decide quickly what to make next.
      </p>
      <p>
        It is the cure for creative block and the blank content calendar. Instead of guessing, you start
        from concrete angles and choose the ones that fit you.
      </p>

      <h2>How to generate video ideas</h2>
      <ol>
        <li>
          <strong>Describe your niche</strong> — Be specific about the topic and sub-topic.
        </li>
        <li>
          <strong>Set audience and format</strong> — Who it is for, and long-form, Shorts, tutorial, or
          listicle.
        </li>
        <li>
          <strong>Generate and shortlist</strong> — Copy the list and pick the strongest few to film.
        </li>
      </ol>

      <h2>How to choose which ideas to make</h2>
      <ul>
        <li>
          <strong>Match your strengths</strong> — Pick angles you can execute better than most.
        </li>
        <li>
          <strong>Favor easy/medium difficulty early</strong> — Newer channels rank faster on
          lower-competition ideas.
        </li>
        <li>
          <strong>Check intent</strong> — How-to and informational ideas often have durable search
          demand.
        </li>
        <li>
          <strong>Cluster related ideas</strong> — A series around one theme builds authority faster than
          scattered one-offs.
        </li>
      </ul>

      <h2>Turning ideas into a plan</h2>
      <p>
        Export the batch and drop the best ideas into a simple calendar. Group similar topics so your
        channel builds a recognizable focus, and revisit the generator whenever you need a fresh angle.
        Ideas are a starting point — your research, packaging, and delivery decide how they perform.
      </p>

      <h2>Related tools</h2>
      <p>
        Validate demand with the <Link href="/keyword-generator">Keyword Generator</Link>, write the
        video with the <Link href="/youtube-script-generator">Script Generator</Link>, and package it
        with the <Link href="/title-generator">Title Generator</Link>.
      </p>
    </>
  );
}
