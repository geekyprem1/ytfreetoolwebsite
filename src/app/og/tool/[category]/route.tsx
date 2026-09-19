import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const categoryStyles: Record<string, { label: string; accent: string; background: string; tagline: string }> = {
  calculator: { label: 'YouTube Calculators', accent: '#f97316', background: '#fff7ed', tagline: 'Plan, estimate, and measure creator growth.' },
  seo: { label: 'YouTube SEO Tools', accent: '#2563eb', background: '#eff6ff', tagline: 'Make every upload clearer and easier to discover.' },
  'ai-generator': { label: 'AI Creator Tools', accent: '#7c3aed', background: '#f5f3ff', tagline: 'Draft better titles, descriptions, ideas, and scripts.' },
  downloader: { label: 'YouTube Downloaders', accent: '#059669', background: '#ecfdf5', tagline: 'Save creator assets in the formats you need.' },
  extractor: { label: 'YouTube Extractors', accent: '#0891b2', background: '#ecfeff', tagline: 'Pull useful public video and channel details quickly.' },
  analytics: { label: 'YouTube Analytics Tools', accent: '#4f46e5', background: '#eef2ff', tagline: 'Understand channel, video, and audience signals.' },
};

export async function GET(_request: Request, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const style = categoryStyles[category] ?? {
    label: 'YouTube Creator Tools',
    accent: '#ff3b30',
    background: '#fff5f4',
    tagline: 'Free tools for smarter YouTube publishing.',
  };

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 72, background: style.background, fontFamily: 'system-ui, sans-serif', color: '#111827' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 34 }}>
          <div style={{ width: 58, height: 58, borderRadius: 16, background: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 23, fontWeight: 700 }}>YT</div>
          <span style={{ fontSize: 30, fontWeight: 650 }}>YT Toolkit</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{ width: 12, height: 58, borderRadius: 6, background: style.accent }} />
          <div style={{ fontSize: 58, fontWeight: 750, lineHeight: 1.1 }}>{style.label}</div>
        </div>
        <div style={{ fontSize: 28, color: '#4b5563', maxWidth: 860 }}>{style.tagline}</div>
        <div style={{ marginTop: 32, fontSize: 22, color: style.accent }}>yttools.pro</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
