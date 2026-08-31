import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How does the channel name generator work?',
    a: 'Describe your niche, optionally add keywords, choose a style, and the AI generates a list of brandable channel names. Each idea comes with a suggested @handle and a short reason it works. You can then check which handles look available.',
  },
  {
    q: 'How does the handle availability check work?',
    a: 'For any suggested handle, the tool looks it up against public YouTube channels. If a channel already uses that handle, it shows as taken; if none is found, it shows as likely available. Always confirm inside YouTube before finalizing, since reserved or very recently claimed handles can differ.',
  },
  {
    q: 'What makes a good YouTube channel name?',
    a: 'A strong name is easy to say, spell, and remember, hints at your niche without being generic, and is short enough to fit a handle. Avoid numbers and hyphens where possible, and check that the matching @handle and ideally a domain are free.',
  },
  {
    q: 'Can I change my channel name later?',
    a: 'Yes. YouTube lets you change your display name and handle, though changing a handle can break existing links and hurt recognition once you have an audience. It is worth choosing carefully up front.',
  },
  {
    q: 'Should the name match my handle exactly?',
    a: 'Ideally they are close, so people can find you easily. A display name can have spaces and capitalization (My Cool Channel) while the handle is compact (@mycoolchannel). Keeping them aligned reduces confusion.',
  },
  {
    q: 'Are the generated names trademark-safe?',
    a: 'The AI avoids obvious brand names, but it cannot guarantee a name is free of trademarks. Before committing, do a quick trademark and search-engine check for the name in your country.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube channel name generator?</h2>
      <p>
        A channel name generator brainstorms brandable names for a new YouTube channel based on your
        niche and style. Each idea includes a suggested <code>@handle</code> and a short rationale, and
        you can check which handles look available before you claim one.
      </p>
      <p>
        Naming is one of the first decisions a new creator makes, and a good name is memorable, easy to
        find, and available as a handle. This tool speeds up that search.
      </p>

      <h2>How to generate channel names</h2>
      <ol>
        <li>
          <strong>Describe your niche</strong> — For example “budget travel” or “indie game dev”.
        </li>
        <li>
          <strong>Add keywords and pick a style</strong> — Brandable, descriptive, fun, personal, or
          one-word.
        </li>
        <li>
          <strong>Generate and check</strong> — Review ideas and check the @handle availability of your
          favorites.
        </li>
      </ol>

      <h2>What makes a strong channel name</h2>
      <ul>
        <li>
          <strong>Memorable</strong> — Easy to say and recall after hearing it once.
        </li>
        <li>
          <strong>Spellable</strong> — People can type it without seeing it written.
        </li>
        <li>
          <strong>On-niche</strong> — Hints at your topic without boxing you in forever.
        </li>
        <li>
          <strong>Available</strong> — The matching @handle (and ideally a domain) is free.
        </li>
      </ul>

      <h2>Choosing between names</h2>
      <p>
        Shortlist three or four, say each out loud, and imagine it in a thumbnail and a URL. Check the
        handle and a quick web search for conflicts. Favor names that leave room to grow — a name tied
        too tightly to one topic can limit you if your content evolves. Once you decide, claim the handle
        promptly.
      </p>

      <h2>Related tools</h2>
      <p>
        Once you have a channel, plan content with the{' '}
        <Link href="/youtube-video-ideas-generator">Video Ideas Generator</Link>, package videos with the{' '}
        <Link href="/title-generator">Title Generator</Link>, and find your channel’s ID later with the{' '}
        <Link href="/channel-id-finder">Channel ID Finder</Link>.
      </p>
    </>
  );
}
