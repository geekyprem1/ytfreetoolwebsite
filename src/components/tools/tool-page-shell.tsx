import Link from 'next/link';
import { ToolPageSchema } from '@/components/tools/tool-page-schema';
import { ToolFaqSection, type ToolFaq } from '@/components/tools/tool-faq-section';
import { ChevronRight } from 'lucide-react';

interface ToolPageShellProps {
  toolName: string;
  toolDescription: string;
  toolSlug: string;
  title: string;
  description: string;
  /** Two-sentence Answer-First summary shown directly under the H1. */
  answerFirst?: string;
  children: React.ReactNode;
  seo?: React.ReactNode;
  faqs?: ToolFaq[];
  howToSteps?: { name: string; text: string }[];
}

export function ToolPageShell({
  toolName,
  toolDescription,
  toolSlug,
  title,
  description,
  answerFirst,
  children,
  seo,
  faqs = [],
  howToSteps,
}: ToolPageShellProps) {
  return (
    <ToolPageSchema
      toolName={toolName}
      toolDescription={toolDescription}
      toolSlug={toolSlug}
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3.5 opacity-50" />
          </li>
          <li>
            <Link href="/#tools" className="hover:text-foreground transition-colors">
              Tools
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3.5 opacity-50" />
          </li>
          <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
            {toolName}
          </li>
        </ol>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="text-display text-heading-md mb-3 text-balance">{title}</h1>
        {answerFirst ? (
          <aside
            className="answer-first mb-4 rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-sm leading-relaxed"
            aria-label="Answer-First Summary"
          >
            <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
              Answer-First Summary
            </p>
            <p className="text-foreground/90">{answerFirst}</p>
          </aside>
        ) : null}
        <p className="text-lead">{description}</p>
      </header>

      <div className="tool-workspace">{children}</div>

      <section className="mt-10 mb-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
        <h2 className="text-display text-base font-semibold text-foreground mb-2">
          Why creators choose YouTube (YT) Toolkit over VidIQ &amp; TubeBuddy
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-foreground">100% free</strong> - no subscription tiers or hidden
            usage limits on core tools.
          </li>
          <li>
            <strong className="text-foreground">No login / no account</strong> - paste a URL and run
            instantly.
          </li>
          <li>
            <strong className="text-foreground">No browser extension</strong> - full web app on mobile,
            tablet, and desktop.
          </li>
        </ul>
      </section>

      {(seo || faqs.length > 0) && (
        <div className="tool-prose">
          {seo}
          {faqs.length > 0 ? <ToolFaqSection faqs={faqs} /> : null}
        </div>
      )}
    </ToolPageSchema>
  );
}
