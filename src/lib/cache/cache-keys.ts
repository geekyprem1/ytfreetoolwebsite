export const cacheKeys = {
  videoStats: (videoId: string) => `yt:video:stats:${videoId}`,
  videoTags: (videoId: string) => `yt:video:tags:${videoId}`,
  channelStats: (channelId: string) => `yt:channel:stats:${channelId}`,
  channelTags: (channelId: string) => `yt:channel:tags:${channelId}`,
  monetizationCheck: (channelId: string) => `yt:channel:monetization:v3:${channelId}`,
  thumbnail: (videoId: string, quality: string) => `yt:thumbnail:${videoId}:${quality}`,
  transcript: (videoId: string, lang: string) => `yt:transcript:${videoId}:${lang}`,
  resolve: (url: string) => `yt:resolve:${url}`,
  quotaDay: (date: string) => `yt:quota:daily:${date}`,
  rateLimit: (tier: string, identifier: string) => `rl:${tier}:${identifier}`,
  aiDaily: (date: string) => `ai:daily:${date}`,
};
