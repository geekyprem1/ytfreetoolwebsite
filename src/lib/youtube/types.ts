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
  /** Highest-resolution avatar URL available (may equal `thumbnail`). */
  thumbnailHigh: string;
  /** Channel banner (brandingSettings.image.bannerExternalUrl), or '' when none is set. */
  bannerUrl: string;
  customUrl: string;
  publishedAt: string;
  country: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  madeForKids: boolean | null;
  uploadsPlaylistId?: string | null;
}

export interface YouTubePlaylistSummary {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  videoCount: number;
  /** Total runtime of all fetched videos, in seconds. */
  totalSeconds: number;
  /** Number of videos actually measured (private/deleted items are skipped). */
  countedVideos: number;
  /** True when the playlist was longer than the fetch cap and results are partial. */
  truncated: boolean;
}

export interface YouTubeChannelVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
}

export interface YouTubeVideoMonetizationProbe {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  licensedContent: boolean | null;
  madeForKids: boolean | null;
  hasPaidProductPlacement: boolean | null;
}

export type MonetizationSignalStatus = 'detected' | 'not_detected' | 'unavailable';

/** Clear binary estimate — still not an official YouTube status. */
export type MonetizationPrediction = 'YES' | 'NO';

export type EstimatedMonetizationStatus =
  | 'Likely Monetized'
  | 'Probably Monetized'
  | 'No Strong Evidence of Monetization';

export interface MonetizationSignal {
  id: string;
  label: string;
  status: MonetizationSignalStatus;
  detail: string;
}

export interface MonetizationEstimate {
  /** Binary estimate: YES = likely monetized, NO = likely not. */
  prediction: MonetizationPrediction;
  /** YTLarge-style ON / OFF label */
  monetizationLabel: 'ON' | 'OFF';
  /** Channel-level ad summary from sampled videos */
  adStatus: string;
  status: EstimatedMonetizationStatus;
  /** Confidence in the YES/NO prediction (0–100). */
  confidence: number;
  /** Raw probability the channel is monetized (0–100). */
  probability: number;
  signals: MonetizationSignal[];
  summary: string;
}

export interface ResolveResult {
  type: 'video' | 'channel';
  id: string;
  title?: string;
}

export interface LiveChannelCount {
  id: string;
  title: string;
  thumbnail: string;
  customUrl: string;
  subscriberCount: number;
  /** YouTube hides exact subs above 1000; this is the public (rounded) figure. */
  hiddenSubscriberCount: boolean;
  videoCount: number;
  viewCount: number;
  fetchedAt: number;
}

export interface LiveVideoCount {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  fetchedAt: number;
}

export interface YouTubeComment {
  id: string;
  author: string;
  authorChannelUrl: string;
  text: string;
  likeCount: number;
  publishedAt: string;
}

export interface YouTubeCommentsResult {
  videoId: string;
  videoTitle: string;
  totalFetched: number;
  truncated: boolean;
  comments: YouTubeComment[];
}

export interface TrendingVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  duration: string;
}

export interface TrendingResult {
  region: string;
  category: string;
  videos: TrendingVideo[];
}
