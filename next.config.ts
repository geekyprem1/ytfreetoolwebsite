import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Prevent Turbopack from treating C:\Users\user as the workspace root
  // (it finds a stray package-lock.json there and then hangs on file watching).
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: ['@googleapis/youtube'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.youtube.com', pathname: '/**' },
      { protocol: 'https', hostname: 'yt3.ggpht.com', pathname: '/**' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
