export const TTL = {
  thumbnail: 60 * 60 * 24 * 7,    // 7 days
  videoTags: 60 * 60,              // 1 hour
  channelTags: 60 * 60 * 24,       // 24 hours
  transcript: 60 * 60 * 24 * 30,   // 30 days
  videoStatsOld: 60 * 60,          // 1 hour (older than 7 days)
  videoStatsRecent: 60 * 15,       // 15 minutes (< 7 days)
  channelStats: 60 * 60 * 24,      // 24 hours
  channelBranding: 60 * 60 * 24 * 3, // 3 days (avatars/banners change rarely)
  monetizationCheck: 60 * 60 * 12, // 12 hours
  playlist: 60 * 60 * 6,           // 6 hours
  liveCount: 60,                   // 60s — smooth client interpolation between fetches
  comments: 60 * 30,               // 30 minutes
  trending: 60 * 60 * 3,           // 3 hours (refreshed a few times daily)
  resolve: 60 * 60 * 24,           // 24 hours
  rateLimit: 60,                   // 1 minute window
} as const;

export function getVideoStatsTTL(publishedAt: string): number {
  const ageMs = Date.now() - new Date(publishedAt).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return ageDays > 7 ? TTL.videoStatsOld : TTL.videoStatsRecent;
}

export const NO_CACHE = 0;
