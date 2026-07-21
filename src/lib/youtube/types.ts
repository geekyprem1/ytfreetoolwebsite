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
  madeForKids: boolean | null;
  uploadsPlaylistId?: string | null;
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
