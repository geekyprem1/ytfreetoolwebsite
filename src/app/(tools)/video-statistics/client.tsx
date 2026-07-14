'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToolApi } from '@/hooks/use-tool-api';
import { ThumbsUp, MessageCircle, Eye, Clock, Calendar, Film } from 'lucide-react';

interface VideoStatsResponse {
  id: string; title: string; thumbnail: string; channelTitle: string; channelId: string;
  publishedAt: string; duration: string; category: string; viewCount: number; likeCount: number;
  commentCount: number; tags: string[]; description: string;
}

function fmt(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

export function VideoStatisticsClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<VideoStatsResponse>();

  const handleValidUrl = (videoId: string) => {
    execute(`/api/youtube/video-stats?v=${videoId}`);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput onValidUrl={handleValidUrl} placeholder="Paste YouTube video URL..." disabled={isLoading} initialUrl={initialUrl} autoSubmit />
      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <div className="space-y-4">
          <ToolOutput title={data.title}>
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border aspect-video bg-muted/50 relative">
                <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard icon={Eye} label="Views" value={fmt(data.viewCount)} />
                <StatCard icon={ThumbsUp} label="Likes" value={fmt(data.likeCount)} />
                <StatCard icon={MessageCircle} label="Comments" value={fmt(data.commentCount)} />
                <StatCard icon={Clock} label="Duration" value={data.duration} />
                <StatCard icon={Calendar} label="Published" value={new Date(data.publishedAt).toLocaleDateString()} />
                <StatCard icon={Film} label="Category" value={data.category || 'N/A'} />
              </div>

              <Separator />

              <div>
                <span className="text-sm font-medium">Channel: </span>
                <span className="text-sm text-muted-foreground">{data.channelTitle}</span>
              </div>

              {data.tags && data.tags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {data.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ToolOutput>
        </div>
      )}

      <RelatedTools currentSlug="video-statistics" />
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold truncate">{value || 'N/A'}</p>
    </div>
  );
}
