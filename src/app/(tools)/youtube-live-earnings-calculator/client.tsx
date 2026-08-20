'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeLiveEarningsCalculatorClient() {
  const [views, setViews] = useState('10000');
  const [cpm, setCpm] = useState('6');
  const [superChats, setSuperChats] = useState('150');
  const [members, setMembers] = useState('0');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const c = parseFloat(cpm) || 0;
    const s = parseFloat(superChats) || 0;
    const m = parseFloat(members) || 0;
    const adRevenue = (v / 1000) * c * 0.55;
    const membershipRevenue = m * 3.5; // avg $4.99 - YouTube 30%
    const total = adRevenue + s + membershipRevenue;
    return { adRevenue, membershipRevenue, total };
  }, [views, cpm, superChats, members]);

  const isValid = parseFloat(views) >= 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ToolInput label="Live Views" required>
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="10000" min="0" />
        </ToolInput>
        <ToolInput label="Live CPM ($)">
          <Input type="number" value={cpm} onChange={(e) => setCpm(e.target.value)} placeholder="6" min="0" step="0.5" />
        </ToolInput>
        <ToolInput label="Super Chats ($)">
          <Input type="number" value={superChats} onChange={(e) => setSuperChats(e.target.value)} placeholder="150" min="0" step="1" />
        </ToolInput>
        <ToolInput label="New Members">
          <Input type="number" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="0" min="0" step="1" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Live Earnings
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Live Earnings Estimate">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Live Revenue</p>
              <p className="text-3xl font-bold tracking-tight">${result.total.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              <p className="text-xs text-muted-foreground mt-2">Ad + Super Chats + Memberships (before tax)</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Ad revenue (55%)</p>
                <p className="font-semibold">${result.adRevenue.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Super Chats (70%)</p>
                <p className="font-semibold">${(parseFloat(superChats) * 0.7).toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">You keep 70%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Memberships</p>
                <p className="font-semibold">${result.membershipRevenue.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Live: ads ~ $3-10 CPM but fewer impressions, Super Chats 70% to creator, Memberships ~70%. Add Sponsorships separately.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-live-earnings-calculator" />
    </div>
  );
}
