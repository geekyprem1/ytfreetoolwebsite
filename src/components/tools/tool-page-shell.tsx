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
  children: React.ReactNode;
  seo?: React.ReactNode;
  faqs?: ToolFaq[];
}

export function ToolPageShell({
  toolName,
  toolDescription,
  toolSlug,
  title,
  description,
  children,
  seo,
  faqs = [],
}: ToolPageShellProps) {
  return (
    <ToolPageSchema
      toolName={toolName}
      toolDescription={toolDescription}
      toolSlug={toolSlug}
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
        <p className="text-lead">{description}</p>
      </header>

      <div className="tool-workspace">{children}</div>

      {(seo || faqs.length > 0) && (
        <div className="tool-prose">
          {seo}
          {faqs.length > 0 ? <ToolFaqSection faqs={faqs} /> : null}
        </div>
      )}
    </ToolPageSchema>
  );
}
