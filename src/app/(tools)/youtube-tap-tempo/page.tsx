import type { Metadata } from 'next';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { TapTempoClient } from './client';

export const metadata: Metadata = {
  title: { absolute: 'Tap Tempo BPM Calculator for Creators | yttools.pro' },
  description: 'Tap along to a beat to estimate BPM. A free browser-only tap tempo calculator for planning YouTube edits and cuts.',
  alternates: { canonical: '/youtube-tap-tempo' },
};

export default function TapTempoPage() {
  return (
    <ToolPageShell
      toolName="Tap Tempo"
      toolDescription="Estimate BPM by tapping to a beat."
      toolSlug="youtube-tap-tempo"
      title="Tap Tempo BPM Calculator"
      description="Play your track elsewhere and tap the beat here. Use the estimate to time cuts, captions or transitions."
      answerFirst="Tap at least twice; the tool averages your recent taps into beats per minute. It does not listen to or analyze audio, and it sends no taps to a server."
      faqs={[{ q: 'Does this detect BPM automatically?', a: 'No. You tap the beat manually. Automatic audio analysis is not part of this tool.' }, { q: 'Why does the BPM reset after a pause?', a: 'A long pause usually means you have stopped tapping. Resetting avoids mixing two separate rhythms.' }]}
    >
      <TapTempoClient />
    </ToolPageShell>
  );
}
