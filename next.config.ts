import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
