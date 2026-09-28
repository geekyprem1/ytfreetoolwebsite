import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbNode, graphJsonLd } from '@/lib/seo/schema-graph';

export const metadata: Metadata = {
  title: 'YouTube Study Tools for Students | Lecture Transcripts & Summaries',
  description:
    'Turn captioned YouTube lectures into study notes. Extract a transcript with timestamps, get an AI summary, and find the moments you need to review. Free, no login.',
  alternates: { canonical: '/for-students' },
  openGraph: {
    title: 'YouTube Study Tools for Students | YT Toolkit',
    description:
      'A simple workflow for studying from captioned YouTube lectures: transcript, summary, and timestamps.',
  },
};

const steps = [
  {
    number: '01',
    label: 'Keep the source',
    title: 'Get the lecture transcript',
    description:
      'Paste a public YouTube lecture URL. Read the spoken text with timestamps, switch caption language when the video offers more than one, and copy or download a TXT file for your notes.',
    href: '/transcript-extractor',
    action: 'Extract a transcript',
  },
  {
    number: '02',
    label: 'Find the main ideas',
    title: 'Summarize the lecture',
    description:
      'Use the same video URL to get a short AI summary and key takeaways. Treat it as a starting outline, then check names, formulas, and claims against the lecture itself.',
    href: '/youtube-video-summarizer',
    action: 'Summarize a video',
  },
  {
    number: '03',
    label: 'Return to the right moment',
    title: 'Use timestamps to review',
    description:
      'Keep timestamps visible in the transcript so you can jump back to a difficult explanation. If you want a chapter-style outline, paste the transcript into the timestamp generator and check its suggested times against the video.',
    href: '/timestamp-generator',
    action: 'Make a timestamp outline',
  },
] as const;

export default function ForStudentsPage() {
  return (
    <>
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'For students', path: '/for-students' }]),
        ])}
      />

      <nav aria-label="Breadcrumb" className="mb-9">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-3.5 opacity-50" /></li>
          <li className="font-medium text-foreground">For students</li>
        </ol>
      </nav>

      <header className="grid items-center gap-10 border-b border-border pb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-16 md:pb-20">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Study from YouTube</p>
          <h1 className="max-w-xl text-balance font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Turn a lecture into notes you can actually review.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Extract the transcript, get the main ideas, and keep the moments worth revisiting. A simple study workflow for captioned YouTube lectures, with no account required.
          </p>
          <Link
            href="/transcript-extractor"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Start with a lecture transcript <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">Works when a public video has captions available.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" aria-label="Example study note layout">
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Study sheet · example</span>
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
          </div>
          <div className="space-y-5 px-5 py-6 sm:px-7">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Lecture question</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">What is the main idea?</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="font-mono text-xs text-primary">04:18 · transcript</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">Keep the lecturer’s own explanation next to your notes.</p>
            </div>
            <div className="border-t border-dashed border-border pt-4">
              <p className="text-xs font-medium text-muted-foreground">Your takeaway</p>
              <p className="mt-1 text-sm leading-relaxed">Write the concept in your own words, then return to 04:18 if you need to check it.</p>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="workflow-heading" className="py-14 md:py-20">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">A three-step workflow</p>
          <h2 id="workflow-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">From video to usable notes</h2>
          <p className="mt-4 text-muted-foreground">Use the parts you need. Every step works as a separate free tool.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="flex flex-col rounded-xl border border-border p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <span className="font-mono text-sm text-primary">{step.number}</span>
                <span className="text-xs font-medium text-muted-foreground">{step.label}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              <Link href={step.href} className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {step.action} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="study-tips-heading" className="grid gap-8 border-t border-border py-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-16 md:py-20">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Study well</p>
          <h2 id="study-tips-heading" className="text-3xl font-semibold tracking-tight">Make the notes your own</h2>
        </div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>Start with one question you want the lecture to answer. Scan the transcript for relevant sections, then use the summary to identify what you may have missed. Write your final notes in your own words instead of copying the whole transcript.</p>
          <p>Captions can mishear technical terms, names, and equations. AI summaries can leave out context. Check important details in the original video, especially before citing a lecture or using it in an assignment.</p>
          <p>For a quick revision sheet, save the video link, your key takeaway, and two or three timestamps that lead back to the explanation. That gives you a short route back to the source when you study later.</p>
        </div>
      </section>

      <section aria-labelledby="questions-heading" className="border-t border-border py-14 md:py-20">
        <h2 id="questions-heading" className="mb-8 text-3xl font-semibold tracking-tight">Common questions</h2>
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">Can I use a lecture without captions?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The transcript and AI summary need an available caption track. If the video has no captions, these tools cannot extract its spoken text.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I study a lecture in another language?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The transcript extractor lets you choose among the caption languages available on that video. Language options depend on what the video provides.</p>
          </div>
          <div>
            <h3 className="font-semibold">Does the summary replace watching the lecture?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Use it to orient yourself or review, then check the lecture for examples, diagrams, equations, and context that text or a short summary may miss.</p>
          </div>
          <div>
            <h3 className="font-semibold">How do I keep a time-linked note?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Keep timestamps visible in the transcript and record the time beside your note. Open the original video at that point when you need to revisit the explanation.</p>
          </div>
        </div>
      </section>
    </>
  );
}
