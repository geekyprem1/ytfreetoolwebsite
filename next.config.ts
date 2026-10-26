import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Prevent Turbopack from treating C:\Users\user as the workspace root
  // (it finds a stray package-lock.json there and then hangs on file watching).
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: ['@googleapis/youtube'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/tools',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/youtube-seo-tips-2026',
        destination: '/blog/youtube-seo-tips-2027',
        permanent: true,
      },
    ];
  },
  images: {
    // Cloudflare Workers has no built-in Next image optimizer. The app only
    // uses next/image in one place with `unoptimized`, so disable it globally
    // until Cloudflare Images is configured.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.youtube.com', pathname: '/**' },
      { protocol: 'https', hostname: 'yt3.ggpht.com', pathname: '/**' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
