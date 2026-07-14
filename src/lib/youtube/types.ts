export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  category: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags: string[];
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  customUrl: string;
  publishedAt: string;
  country: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

export interface YouTubeChannelVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
}

export interface ResolveResult {
  type: 'video' | 'channel';
  id: string;
  title?: string;
}
