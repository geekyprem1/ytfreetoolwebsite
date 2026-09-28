import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I make a YouTube subscribe link?',
    a: 'Add ?sub_confirmation=1 to the end of your channel URL, for example https://www.youtube.com/@yourhandle?sub_confirmation=1. Paste your channel link or @handle above and the tool builds it for you.',
  },
  {
    q: 'Does the link subscribe people automatically?',
    a: 'No. It opens your channel with a “Subscribe to …?” confirmation. The viewer still has to confirm, and they must be signed in to YouTube. Viewers who are not signed in are asked to sign in first.',
  },
  {
    q: 'Where should I use a subscribe link?',
    a: 'Anywhere outside YouTube where people already know you: your website, link-in-bio pages, email newsletters, email signatures, podcast show notes, Discord or community posts, and QR codes on print material. Inside YouTube, the normal Subscribe button is already visible.',
  },
  {
    q: 'Does it work with /channel/UC… and old /c/ URLs?',
    a: 'Yes. The parameter works on @handle, /channel/UC…, /c/ and /user/ URLs. An @handle link is the shortest and most readable, so use it when you have one.',
  },
  {
    q: 'Can I put the subscribe link in my video description?',
    a: 'Yes. It is a normal YouTube link, so it is allowed in descriptions and pinned comments. Keep calls to action honest — do not promise rewards for subscribing, which YouTube’s policies do not allow.',
  },
  {
    q: 'Is this tool free and private?',
    a: 'Yes. The link is built entirely in your browser from what you type. Nothing is sent to our servers and no login is needed.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What a YouTube subscribe link is</h2>
      <p>
        A subscribe link is your normal channel URL with one extra parameter: <code>?sub_confirmation=1</code>.
        When a signed-in viewer opens it, YouTube loads your channel and immediately asks “Subscribe to [channel]?”.
        One tap confirms. It removes a step for people who arrive from outside YouTube and already want to follow
        you.
      </p>
      <p>
        This generator accepts any common channel format — an @handle, a <code>/channel/UC…</code> link, or older{' '}
        <code>/c/</code> and <code>/user/</code> URLs — and returns the subscribe link plus ready-made HTML and
        Markdown snippets. Everything runs in your browser.
      </p>

      <h2>How to create your subscribe link</h2>
      <ol>
        <li>Open your channel on YouTube and copy the URL, or type your @handle.</li>
        <li>Paste it into the box above. The subscribe link appears instantly.</li>
        <li>Select <strong>Test link</strong> to check the confirmation prompt.</li>
        <li>Copy the link, or the HTML or Markdown snippet, wherever you need it.</li>
      </ol>

      <h2>Best places to use it</h2>
      <ul>
        <li>
          <strong>Websites and blogs</strong> — a “Subscribe on YouTube” button in the header, footer or after
          articles.
        </li>
        <li>
          <strong>Link-in-bio pages</strong> on Instagram, TikTok or X, where visitors are already fans.
        </li>
        <li>
          <strong>Email newsletters and signatures</strong> — a single clear call to action.
        </li>
        <li>
          <strong>QR codes</strong> on merch, packaging, event slides or business cards.
        </li>
        <li>
          <strong>Other video descriptions and community posts</strong> when you mention your channel.
        </li>
      </ul>

      <h2>What it does not do</h2>
      <p>
        The link cannot subscribe anyone without their action, and it does not work for viewers who are signed out
        until they sign in. It also does not change how YouTube counts subscribers. Avoid “sub for sub” schemes or
        rewards for subscribing — they break YouTube’s fake engagement policies and bring in viewers who never watch.
      </p>

      <h2>Related tools</h2>
      <p>
        Need your channel ID instead of the handle? Use the <Link href="/channel-id-finder">Channel ID Finder</Link>.
        Link viewers to an exact moment in a video with the{' '}
        <Link href="/youtube-timestamp-link-generator">Timestamp Link Generator</Link>, embed videos on your site with
        the <Link href="/youtube-embed-code-generator">Embed Code Generator</Link>, and watch new subscribers arrive
        with the <Link href="/live-subscriber-count">Live Subscriber Count</Link>.
      </p>
    </>
  );
}
