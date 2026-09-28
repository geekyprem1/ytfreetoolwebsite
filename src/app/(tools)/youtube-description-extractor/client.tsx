'use client';

import Link from 'next/link';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { parseDescription } from '@/lib/youtube/description-parse';

interface VideoResponse {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
}

export function DescriptionExtractorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<VideoResponse>();

  const handleValidUrl = (videoId: string) => execute(`/api/youtube/video-stats?v=${videoId}`);

  const description = data?.description ?? '';
  const parsed = data ? parseDescription(description) : null;
  const empty = Boolean(data) && description.trim().length === 0;

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Extract"
      />

      {isLoading && <ToolLoading variant="text-block" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.title}>
          <div className="space-y-4">
            {empty ? (
              <p className="text-sm text-muted-foreground">This video has no description.</p>
            ) : (
              <>
                <OutputActions
                  copyText={description}
                  copyLabel="Description"
                  downloadContent={description}
                  downloadFilename={`${data.id}-description.txt`}
                />

                {parsed && (parsed.links.length > 0 || parsed.hashtags.length > 0 || parsed.timestamps.length > 0) ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Stat label="Links" count={parsed.links.length} />
                    <Stat label="Hashtags" count={parsed.hashtags.length} />
                    <Stat label="Chapters" count={parsed.timestamps.length} />
                  </div>
                ) : null}

                <div className="rounded-lg border bg-muted/20 p-4">
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{description}</p>
                </div>

                {parsed && parsed.hashtags.length > 0 ? (
                  <Section title="Hashtags">
                    <p className="text-sm break-words">{parsed.hashtags.join(' ')}</p>
                  </Section>
                ) : null}

                {parsed && parsed.links.length > 0 ? (
                  <Section title={`Links (${parsed.links.length})`}>
                    <ul className="space-y-1 text-sm">
                      {parsed.links.map((l) => (
                        <li key={l} className="truncate">
                          <a href={l} target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Section>
                ) : null}

                {parsed && parsed.timestamps.length > 0 ? (
                  <Section title={`Chapters (${parsed.timestamps.length})`}>
                    <ul className="space-y-1 text-sm">
                      {parsed.timestamps.map((t, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-mono text-muted-foreground tabular-nums shrink-0">{t.time}</span>
                          <span>{t.label}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                ) : null}
              </>
            )}
          </div>
        </ToolOutput>
      )}

      <div className="tool-prose">
        <p className="text-sm text-muted-foreground">
          Only need the title? Use the <Link href="/youtube-title-extractor">Title Extractor</Link>. For tags, try
          the <Link href="/tags-extractor">Tags Extractor</Link>, and for full metrics the{' '}
          <Link href="/video-statistics">Video Statistics</Link> tool.
        </p>
      </div>

      <RelatedTools currentSlug="youtube-description-extractor" />
    </div>
  );
}

function Stat({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-lg border px-3 py-2 text-center">
      <p className="text-lg font-semibold tabular-nums">{count}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-1.5">{title}</h3>
      {children}
    </div>
  );
}
