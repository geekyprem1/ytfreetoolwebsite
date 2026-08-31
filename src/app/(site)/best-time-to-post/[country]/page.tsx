import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, breadcrumbNode } from '@/lib/seo/schema-graph';
import { postingRegions, getPostingRegion } from '@/content/best-time-to-post';

export function generateStaticParams() {
  return postingRegions.map((r) => ({ country: r.slug }));
}

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const r = getPostingRegion(country);
  if (!r) return {};
  const title = `Best Time to Post on YouTube in ${r.name} (2026) | yttools.pro`;
  const description = `General best-time-to-post windows for YouTube in ${r.name} (${r.timezone}). Best-practice guidance to test against your own analytics.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/best-time-to-post/${r.slug}` },
    openGraph: { title, description },
  };
}

const SCHEDULE = [
  { day: 'Weekdays (Mon–Fri)', window: '2:00 PM – 4:00 PM', note: 'Ahead of the evening viewing peak' },
  { day: 'Weekends (Sat–Sun)', window: '9:00 AM – 11:00 AM', note: 'Morning leisure browsing' },
  { day: 'Best single day', window: 'Friday afternoon', note: 'Leads into high weekend watch time' },
  { day: 'Avoid', window: 'Early mornings on weekdays', note: 'Lower discovery before the peak' },
];

export default async function BestTimeCountryPage({ params }: PageProps) {
  const { country } = await params;
  const r = getPostingRegion(country);
  if (!r) notFound();

  return (
    <ContentPageShell
      breadcrumbLabel={`Best time — ${r.name}`}
      title={`Best Time to Post on YouTube in ${r.name}`}
      description={`General posting windows in local time (${r.timezone}) for ${r.name}. Use these as a starting point and confirm with your own YouTube Studio analytics.`}
    >
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Best time to post', path: '/best-time-to-post' },
            { name: r.name, path: `/best-time-to-post/${r.slug}` },
          ]),
        ])}
      />

      <aside
        className="mb-4 rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-sm leading-relaxed not-prose"
        aria-label="Answer-First Summary"
      >
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
          Answer-First Summary
        </p>
        <p className="text-foreground/90">
          For {r.name} ({r.timezone}), a good general window is weekday afternoons around 2–4 PM local
          time and weekend mornings around 9–11 AM, aiming to publish a few hours before your audience’s
          evening peak. These are best-practice starting points — your own analytics are the real guide.
        </p>
      </aside>

      <h2>Recommended posting windows ({r.timezone})</h2>
      <div className="not-prose overflow-x-auto rounded-lg border">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-2.5 font-medium border-b">When</th>
              <th className="text-left p-2.5 font-medium border-b">Window</th>
              <th className="text-left p-2.5 font-medium border-b">Why</th>
            </tr>
          </thead>
          <tbody>
            {SCHEDULE.map((s, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2.5 font-medium">{s.day}</td>
                <td className="p-2.5">{s.window}</td>
                <td className="p-2.5">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to find your real best time</h2>
      <p>
        These windows are general guidance, not measured data for {r.name}. Your actual best time depends
        on your specific audience. In YouTube Studio, open Analytics, then Audience, and check “When your
        viewers are on YouTube.” Publish a few hours before those peaks so the video has time to be
        indexed and start gaining traction.
      </p>

      <h2>Plan your uploads</h2>
      <p>
        Consistency matters more than the exact minute. Use the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link> to plan a
        sustainable schedule, and see what is popular now with{' '}
        <Link href="/youtube-trending">trending videos by country</Link>.
      </p>

      <h2>Other countries</h2>
      <ul>
        {postingRegions
          .filter((x) => x.slug !== r.slug)
          .slice(0, 10)
          .map((x) => (
            <li key={x.slug}>
              <Link href={`/best-time-to-post/${x.slug}`}>Best time to post in {x.name}</Link>
            </li>
          ))}
      </ul>
    </ContentPageShell>
  );
}
