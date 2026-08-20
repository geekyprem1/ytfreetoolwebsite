'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeEngagementCalculatorClient() {
  const [views, setViews] = useState('100000');
  const [likes, setLikes] = useState('5000');
  const [comments, setComments] = useState('400');
  const [shares, setShares] = useState('200');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const l = parseFloat(likes) || 0;
    const c = parseFloat(comments) || 0;
    const s = parseFloat(shares) || 0;
    const total = l + c + s;
    const rate = v > 0 ? (total / v) * 100 : 0;
    const likeRate = v > 0 ? (l / v) * 100 : 0;
    const commentRate = v > 0 ? (c / v) * 100 : 0;
    let label = 'Low';
    if (rate >= 5) label = 'Excellent';
    else if (rate >= 3) label = 'Good';
    else if (rate >= 1) label = 'Average';
    return { total, rate, likeRate, commentRate, label };
  }, [views, likes, comments, shares]);

  const isValid = parseFloat(views) > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ToolInput label="Views" required>
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="100000" min="0" />
        </ToolInput>
        <ToolInput label="Likes" required>
          <Input type="number" value={likes} onChange={(e) => setLikes(e.target.value)} placeholder="5000" min="0" />
        </ToolInput>
        <ToolInput label="Comments">
          <Input type="number" value={comments} onChange={(e) => setComments(e.target.value)} placeholder="400" min="0" />
        </ToolInput>
        <ToolInput label="Shares">
          <Input type="number" value={shares} onChange={(e) => setShares(e.target.value)} placeholder="200" min="0" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Engagement
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Engagement Result">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
              <p className="text-3xl font-bold tracking-tight">{result.rate.toFixed(2)}%</p>
              <p className={`text-sm font-medium mt-1 ${result.label === 'Excellent' ? 'text-green-600' : result.label === 'Good' ? 'text-blue-600' : result.label === 'Average' ? 'text-yellow-600' : 'text-red-600'}`}>{result.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{result.total.toLocaleString()} engagements / {parseInt(views).toLocaleString()} views</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Like rate</p>
                <p className="font-semibold">{result.likeRate.toFixed(2)}%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Comment rate</p>
                <p className="font-semibold">{result.commentRate.toFixed(2)}%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Benchmark</p>
                <p className="font-semibold text-xs">1-3% avg, 5%+ great</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Engagement = (Likes+Comments+Shares) ÷ Views ×100. Long-form average 1-5%, Shorts often lower due to swipe traffic.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-engagement-calculator" />
    </div>
  );
}
