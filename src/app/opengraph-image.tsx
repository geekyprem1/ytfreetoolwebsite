import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'YT Toolkit — Free YouTube creator tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 50%, #fff5f4 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#FF3B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            YT
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, color: '#111827' }}>YT Toolkit</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#111827', lineHeight: 1.15, maxWidth: 900 }}>
          Free YouTube creator tools
        </div>
        <div style={{ marginTop: 20, fontSize: 26, color: '#6B7280', maxWidth: 800 }}>
          Thumbnails, tags, transcripts, AI titles &amp; more — no login required
        </div>
      </div>
    ),
    { ...size },
  );
}
