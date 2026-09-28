import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RankingsTab = 'hub' | 'most-subscribed' | 'fastest-growing' | 'trending';

const tabs: { id: RankingsTab; href: string; label: string }[] = [
  { id: 'hub', href: '/youtube-rankings', label: 'All rankings' },
  { id: 'most-subscribed', href: '/youtube-rankings/most-subscribed', label: 'Most subscribed' },
  { id: 'fastest-growing', href: '/youtube-rankings/fastest-growing', label: 'Fastest growing' },
  { id: 'trending', href: '/youtube-trending', label: 'Trending videos' },
];

interface Crumb {
  name: string;
  href?: string;
}

interface RankingsShellProps {
  breadcrumbs: Crumb[];
  title: string;
  description: string;
  activeTab: RankingsTab;
  /** ISO timestamp of the underlying data, shown as "Updated …". */
  updatedAt?: string;
  updatedLabel?: string;
  /** One-paragraph direct answer (AEO/GEO). */
  answerFirst?: React.ReactNode;
  children: React.ReactNode;
}

export function RankingsShell({
  breadcrumbs,
  title,
  description,
  activeTab,
  updatedAt,
  updatedLabel,
  answerFirst,
  children,
}: RankingsShellProps) {
  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          {breadcrumbs.map((c, i) => (
            <li key={c.name} className="flex items-center gap-1.5">
              <ChevronRight aria-hidden className="size-3.5 opacity-50" />
              {c.href && i < breadcrumbs.length - 1 ? (
                <Link href={c.href} className="hover:text-foreground transition-colors">
                  {c.name}
                </Link>
              ) : (
                <span className="text-foreground font-medium" aria-current="page">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="mb-6 max-w-3xl">
        <h1 className="text-display text-heading-md mb-3 text-balance">{title}</h1>
        <p className="text-lead">{description}</p>
        {updatedAt ? (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
              {updatedLabel ?? 'Updated'}{' '}
              <time dateTime={updatedAt}>
                {new Date(updatedAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC',
                  timeZoneName: 'short',
                })}
              </time>
            </span>
          </p>
        ) : null}
      </header>

      <nav aria-label="Rankings" className="mb-6 -mx-1 overflow-x-auto">
        <ul className="flex gap-1.5 px-1 pb-1 w-max">
          {tabs.map((t) => (
            <li key={t.id}>
              <Link
                href={t.href}
                aria-current={t.id === activeTab ? 'page' : undefined}
                className={cn(
                  'inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors whitespace-nowrap',
                  t.id === activeTab
                    ? 'bg-foreground text-background border-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                )}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {answerFirst ? (
        <aside
          className="answer-first mb-8 max-w-3xl rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-sm leading-relaxed"
          aria-label="Answer-First Summary"
        >
          <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
            Answer-First Summary
          </p>
          <p className="text-foreground/90">{answerFirst}</p>
        </aside>
      ) : null}

      {children}
    </div>
  );
}

/** Pill links to related ranking pages (countries, categories). Crawlable plain links. */
export function RankingPills({
  label,
  items,
  activeHref,
}: {
  label: string;
  items: { href: string; label: string }[];
  activeHref?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">{label}</span>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          aria-current={it.href === activeHref ? 'page' : undefined}
          className={cn(
            'inline-flex h-8 items-center rounded-lg border px-3 text-sm transition-colors',
            it.href === activeHref
              ? 'border-primary text-primary bg-primary/5 font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
          )}
        >
          {it.label}
        </Link>
      ))}
    </div>
  );
}
