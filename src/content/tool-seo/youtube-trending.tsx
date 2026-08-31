import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How is the YouTube trending list decided?',
    a: 'YouTube ranks trending (most popular) videos using signals like view count, view velocity, where views come from, and video age — balanced to surface a range of content rather than only the highest total views. The list is per-country, so it differs by region.',
  },
  {
    q: 'How often does the trending list update?',
    a: 'YouTube refreshes trending periodically through the day. This tool caches results and revalidates them a few times daily, so you see a current snapshot without hammering the API.',
  },
  {
    q: 'Why do different countries show different trending videos?',
    a: 'Trending is localized. What is popular in India can be completely different from the US or Brazil because of language, culture, and regional creators. Switching countries lets you see each region’s list.',
  },
  {
    q: 'Which countries are supported?',
    a: 'The tool covers 30 countries across North America, Europe, Asia, Latin America, the Middle East, and Africa — including the US, UK, India, Canada, Germany, Brazil, Japan, and more. Use the country selector to switch.',
  },
  {
    q: 'Can I use trending to plan my content?',
    a: 'Yes, carefully. Trending shows what is capturing attention right now, which is useful for spotting formats, topics, and cultural moments. But chasing trending directly is risky — it is competitive and fast-moving. Treat it as inspiration, not a guaranteed strategy.',
  },
  {
    q: 'Does trending include Shorts?',
    a: 'The most-popular feed can include a mix of long-form and Shorts depending on the region and the moment. The tool shows whatever YouTube returns for that country’s popular chart.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is YouTube trending by country?</h2>
      <p>
        Trending shows the videos gaining the most traction on YouTube right now, ranked per country.
        This tool lets you browse that most-popular list for 30 regions and switch between them to see how
        attention differs around the world.
      </p>
      <p>
        Because trending is localized and updates through the day, it is a live window into what is
        capturing viewers in each market.
      </p>

      <h2>How to use the trending tool</h2>
      <ol>
        <li>
          <strong>Pick a country</strong> — Use the selector to choose a region.
        </li>
        <li>
          <strong>Scan the list</strong> — See ranked videos with views, likes, and duration.
        </li>
        <li>
          <strong>Open what interests you</strong> — Click through to watch on YouTube, or compare
          regions.
        </li>
      </ol>

      <h2>Why trending differs by region</h2>
      <p>
        Language, culture, local creators, and current events all shape a country’s trending page. A
        music video topping the chart in one country may not appear at all in another. Comparing regions
        reveals which content travels globally and which is purely local — useful context for creators
        eyeing international audiences.
      </p>

      <h2>Using trending responsibly for ideas</h2>
      <p>
        Trending is inspiration, not a formula. It is highly competitive and moves fast, so copying a
        trending topic late rarely works. Instead, study the formats and packaging that trend in your
        niche and region, then apply those lessons to ideas you can execute well.
      </p>

      <h2>Related tools</h2>
      <p>
        Turn trends into video ideas with the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link>, check a trending video’s numbers with{' '}
        <Link href="/video-statistics">Video Statistics</Link>, or track a breakout video live with the{' '}
        <Link href="/live-view-count">Live View Count</Link>.
      </p>
    </>
  );
}
