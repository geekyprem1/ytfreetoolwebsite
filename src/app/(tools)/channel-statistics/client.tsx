'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Separator } from '@/components/ui/separator';
import { useToolApi } from '@/hooks/use-tool-api';
import { Users, Eye, Video, Calendar, Globe } from 'lucide-react';

interface ChannelStatsResponse {
  id: string; title: string; description: string; thumbnail: string; customUrl: string;
  publishedAt: string; country: string; subscriberCount: string; videoCount: string; viewCount: string;
  recentUploads: { videoId: string; title: string; thumbnail: string; publishedAt: string; viewCount: number }[];
}

export function ChannelStatisticsClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<ChannelStatsResponse>();

  const handleValidUrl = (channelId: string) => {
    execute(`/api/youtube/channel-stats?c=${channelId}`);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput onValidUrl={handleValidUrl} placeholder="Paste YouTube channel URL..." disabled={isLoading} initialUrl={initialUrl} autoSubmit />
      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <div className="space-y-4">
          <ToolOutput title={data.title}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {data.thumbnail && (
                  <img src={data.thumbnail} alt={data.title} className="size-16 rounded-full" />
                )}
                <div>
                  <p className="text-sm text-muted-foreground">{data.customUrl}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard icon={Users} label="Subscribers" value={data.subscriberCount} />
                <StatCard icon={Eye} label="Total Views" value={data.viewCount} />
                <StatCard icon={Video} label="Videos" value={data.videoCount} />
                <StatCard icon={Calendar} label="Joined" value={new Date(data.publishedAt).toLocaleDateString()} />
                <StatCard icon={Globe} label="Country" value={data.country || 'N/A'} />
              </div>

              {data.recentUploads && data.recentUploads.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Recent Uploads</h4>
                    {data.recentUploads.slice(0, 5).map((video) => (
                      <div key={video.videoId} className="flex items-center gap-3 rounded-lg border p-2 hover:bg-muted/50">
                        <img src={video.thumbnail} alt={video.title} className="size-16 rounded object-cover shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{video.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(video.publishedAt).toLocaleDateString()} · {video.viewCount} views
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </ToolOutput>
        </div>
      )}

      <RelatedTools currentSlug="channel-statistics" />
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
