'use client';

import { useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToolApi } from '@/hooks/use-tool-api';
import { Trophy, AlertCircle } from 'lucide-react';

interface TitleAnalysisResponse {
  titleA: { ctrPrediction: number; seoScore: number; emotionScore: number; powerWords: string[]; sentiment: string };
  titleB: { ctrPrediction: number; seoScore: number; emotionScore: number; powerWords: string[]; sentiment: string };
  winner: string; analysis: string;
}

export function TitleAnalyzerClient() {
  const [titleA, setTitleA] = useState('');
  const [titleB, setTitleB] = useState('');
  const [keyword, setKeyword] = useState('');
  const { data, isLoading, error, execute, reset } = useToolApi<TitleAnalysisResponse>();

  const handleAnalyze = () => {
    execute('/api/ai/analyze-title', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titleA, titleB, keyword }),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Title A" required>
          <Input value={titleA} onChange={(e) => setTitleA(e.target.value)}
            placeholder="e.g., How to Start a YouTube Channel" disabled={isLoading} />
          <p className="text-xs text-muted-foreground">{titleA.length}/200</p>
        </ToolInput>
        <ToolInput label="Title B" required>
          <Input value={titleB} onChange={(e) => setTitleB(e.target.value)}
            placeholder="e.g., I Started a YouTube Channel with $0" disabled={isLoading} />
          <p className="text-xs text-muted-foreground">{titleB.length}/200</p>
        </ToolInput>
      </div>
      <ToolInput label="Target Keyword (optional)">
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g., youtube beginners guide" disabled={isLoading} />
      </ToolInput>

      <Button onClick={handleAnalyze} disabled={titleA.length < 5 || titleB.length < 5 || isLoading} className="w-full">
        {isLoading ? 'Analyzing...' : 'Compare Titles'}
      </Button>

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <div className="space-y-4">
          <ToolOutput>
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
                <AlertCircle className="size-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs">This is an AI prediction, not real A/B testing. YouTube doesn&apos;t support native title A/B testing.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TitleCard label="Title A" title={titleA} stats={data.titleA} isWinner={data.winner === 'A'} />
                <TitleCard label="Title B" title={titleB} stats={data.titleB} isWinner={data.winner === 'B'} />
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Analysis</h4>
                <p className="text-sm text-muted-foreground">{data.analysis}</p>
              </div>
            </div>
          </ToolOutput>
        </div>
      )}

      <RelatedTools currentSlug="title-analyzer" />
    </div>
  );
}

function TitleCard({ label, title, stats, isWinner }: {
  label: string; title: string;
  stats: { ctrPrediction: number; seoScore: number; emotionScore: number; powerWords: string[]; sentiment: string };
  isWinner: boolean;
}) {
  return (
    <div className={`rounded-lg border p-4 space-y-3 relative ${isWinner ? 'border-green-500/50 bg-green-500/5' : ''}`}>
      {isWinner && (
        <div className="absolute -top-3 left-3">
          <Badge className="bg-green-500 text-white gap-1"><Trophy className="size-3" />Winner</Badge>
        </div>
      )}
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{title}</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-lg font-bold">{stats.ctrPrediction}%</p>
          <p className="text-xs text-muted-foreground">CTR</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{stats.seoScore}</p>
          <p className="text-xs text-muted-foreground">SEO</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{stats.emotionScore}</p>
          <p className="text-xs text-muted-foreground">Emotion</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Sentiment: {stats.sentiment}</p>
        {stats.powerWords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {stats.powerWords.map((w) => (
              <Badge key={w} variant="outline" className="text-xs">{w}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
