'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateLiveEarnings } from '@/lib/youtube/live-earnings';

function numericInput(value: string, required = false): number {
  if (!value.trim()) return required ? Number.NaN : 0;
  return Number(value);
}

export function YoutubeLiveEarningsCalculatorClient() {
  const [views, setViews] = useState('10000');
  const [cpm, setCpm] = useState('6');
  const [superChats, setSuperChats] = useState('150');
  const [members, setMembers] = useState('0');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    return calculateLiveEarnings({
      views: numericInput(views, true),
      cpm: numericInput(cpm),
      grossSuperChats: numericInput(superChats),
      newMembers: numericInput(members),
    });
  }, [views, cpm, superChats, members]);

  const isValid = result !== null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ToolInput label="Monetized Live Playbacks" required description="Estimate the playbacks that actually show ads; total views can be higher.">
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="10000" min="0" step="1" />
        </ToolInput>
        <ToolInput label="Live CPM ($)">
          <Input type="number" value={cpm} onChange={(e) => setCpm(e.target.value)} placeholder="6" min="0" step="0.5" />
        </ToolInput>
        <ToolInput label="Gross Super Chats ($)" description="Amount paid by viewers before the estimated 30% platform share.">
          <Input type="number" value={superChats} onChange={(e) => setSuperChats(e.target.value)} placeholder="150" min="0" step="0.01" />
        </ToolInput>
        <ToolInput label="New Members">
          <Input type="number" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="0" min="0" step="1" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Live Earnings
      </Button>

      {!isValid && (
        <p className="text-sm text-destructive" role="alert">
          Enter non-negative values. Playbacks and new members must be whole numbers.
        </p>
      )}

      {showResult && result && (
        <ToolOutput title="Live Earnings Estimate">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Live Revenue</p>
              <p className="text-3xl font-bold tracking-tight">${result.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-xs text-muted-foreground mt-2">Ad + Super Chats + Memberships (before tax)</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Ad revenue (55%)</p>
                <p className="font-semibold">${result.adRevenue.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Super Chats (70%)</p>
                <p className="font-semibold">${result.superChatRevenue.toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">Estimate: 70% of gross Super Chats</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Memberships</p>
                <p className="font-semibold">${result.membershipRevenue.toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">$3.50 estimated creator share per new member</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Scenario estimate before tax: monetized playbacks × CPM × 55%, plus 70% of gross Super Chats and $3.50 per new member. Actual payouts can differ; add sponsorships separately.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-live-earnings-calculator" />
    </div>
  );
}
