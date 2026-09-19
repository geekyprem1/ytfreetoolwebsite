import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FF3B30',
          borderRadius: 96,
          color: 'white',
          fontSize: 168,
          fontWeight: 700,
          letterSpacing: '-0.08em',
        }}
      >
        YT
      </div>
    ),
    { width: 512, height: 512 },
  );
}
