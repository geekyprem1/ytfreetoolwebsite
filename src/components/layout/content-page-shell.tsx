import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ContentPageShellProps {
  title: string;
  description?: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
  /** Wider measure for contact-style pages */
  wide?: boolean;
}

export function ContentPageShell({
  title,
  description,
  breadcrumbLabel,
  children,
  wide = false,
}: ContentPageShellProps) {
  return (
    <div className={wide ? 'max-w-3xl' : 'max-w-2xl'}>
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
          <li className="text-foreground font-medium">{breadcrumbLabel}</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-display text-heading-md mb-3 text-balance">
          {title}
        </h1>
        {description ? (
          <p className="text-lead">
            {description}
          </p>
        ) : null}
      </header>

      <div className="tool-prose mt-0">{children}</div>
    </div>
  );
}
