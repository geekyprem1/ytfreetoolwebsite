'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { searchTools } from '@/content/tool-search';
import type { ToolCategory, ToolMetadata } from '@/content/tools-metadata';
import { categoryDesc, categoryLabelsLong, FallbackToolIcon, iconMap } from '@/lib/utils/tool-icons';

const categories: ToolCategory[] = [
  'downloader', 'extractor', 'ai-generator', 'analytics', 'seo', 'calculator',
];

export function ToolDirectory({ tools }: { tools: readonly ToolMetadata[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory | 'all'>('all');
  const filtered = useMemo(() => searchTools(tools, query, category), [tools, query, category]);
  const visibleCategories = categories.filter((item) => filtered.some((tool) => tool.category === item));

  return (
    <div className="border-t border-border/70 pt-6">
      <div className="relative mb-7">
        <label htmlFor="tool-directory-search" className="sr-only">Search YouTube tools</label>
        <Search aria-hidden className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          id="tool-directory-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “comment finder” or “thumbnail viewer”"
          className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear tool search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-[190px_minmax(0,1fr)] md:gap-10">
        <aside aria-label="Tool categories">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Browse by category</p>
          <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
            <CategoryButton label="All tools" count={tools.length} selected={category === 'all'} onClick={() => setCategory('all')} />
            {categories.map((item) => (
              <CategoryButton
                key={item}
                label={categoryLabelsLong[item]}
                count={tools.filter((tool) => tool.category === item).length}
                selected={category === item}
                onClick={() => setCategory(item)}
              />
            ))}
          </div>
        </aside>

        <div>
          <p role="status" aria-live="polite" className="mb-5 border-b border-border/70 pb-3 font-mono text-xs text-muted-foreground">
            Showing {filtered.length} of {tools.length} tools
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center">
              <h2 className="text-display text-lg font-semibold">No tools match that search.</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try a broader task name or browse every category.</p>
              <button
                type="button"
                onClick={() => { setQuery(''); setCategory('all'); }}
                className="mt-5 text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
              >
                Show all tools
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {visibleCategories.map((item) => {
                const categoryTools = filtered.filter((tool) => tool.category === item);
                return (
                  <section key={item} aria-labelledby={`category-${item}`}>
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h2 id={`category-${item}`} className="text-display text-xl font-semibold">{categoryLabelsLong[item]}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{categoryDesc[item]}</p>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{categoryTools.length}</span>
                    </div>
                    <ul className="divide-y divide-border/60 border-y border-border/60">
                      {categoryTools.map((tool) => {
                        const Icon = iconMap[tool.icon] ?? FallbackToolIcon;
                        return (
                          <li key={tool.slug}>
                            <Link href={tool.route} className="group flex items-start gap-3 py-4 transition-colors hover:bg-secondary/40 focus-visible:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary sm:items-center">
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/70 group-hover:text-primary">
                                <Icon className="size-4" aria-hidden />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-base font-semibold leading-tight group-hover:text-primary">{tool.name}</span>
                                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{tool.description}</span>
                              </span>
                              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryButton({
  label, count, selected, onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary md:w-full ${
        selected ? 'bg-foreground font-semibold text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      <span>{label}</span>
      <span className={`font-mono text-xs tabular-nums ${selected ? 'text-background/70' : 'text-muted-foreground'}`}>{count}</span>
    </button>
  );
}
