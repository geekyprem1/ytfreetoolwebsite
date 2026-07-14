import { z } from 'zod';

export const youtubeUrlSchema = z
  .string()
  .min(1, 'YouTube URL is required')
  .refine(
    (url) => {
      const patterns = [
        /youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/,
        /youtu\.be\/[a-zA-Z0-9_-]{11}/,
        /youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}/,
        /youtube\.com\/embed\/[a-zA-Z0-9_-]{11}/,
        /youtube\.com\/channel\/UC[a-zA-Z0-9_-]{22}/,
        /youtube\.com\/@[a-zA-Z0-9_.-]+/,
        /youtube\.com\/c\/[a-zA-Z0-9_-]+/,
      ];
      return patterns.some((p) => p.test(url.trim()));
    },
    { message: 'Invalid YouTube URL format' },
  );

export const videoIdSchema = z
  .string()
  .min(11)
  .max(11)
  .regex(/^[a-zA-Z0-9_-]{11}$/, 'Invalid video ID');

export const channelIdSchema = z
  .string()
  .min(24)
  .max(24)
  .regex(/^UC[a-zA-Z0-9_-]{22}$/, 'Invalid channel ID');

export const titleGeneratorSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters').max(500),
  keyword: z.string().min(1, 'Keyword is required').max(200),
  language: z.string().min(2).max(10).default('en'),
  tone: z.enum(['professional', 'casual', 'clickbait', 'educational', 'humorous']).default('professional'),
  count: z.number().int().min(1).max(20).default(10),
});

export const descriptionGeneratorSchema = z.object({
  topic: z.string().min(3).max(500),
  keyword: z.string().min(1).max(200),
  summary: z.string().min(10, 'Summary must be at least 10 characters').max(5000),
  tone: z.enum(['professional', 'casual', 'educational', 'enthusiastic']).default('educational'),
  includeTimestamps: z.boolean().default(true),
  includeHashtags: z.boolean().default(true),
  includeCTA: z.boolean().default(true),
});

export const hashtagGeneratorSchema = z.object({
  topic: z.string().min(1).max(500),
  count: z.number().int().min(5).max(50).default(30),
});

export const hookGeneratorSchema = z.object({
  topic: z.string().min(3).max(500),
  audience: z.string().min(1).max(200).default('general'),
  tone: z.enum(['bold', 'humorous', 'professional', 'dramatic']).default('bold'),
  count: z.number().int().min(4).max(20).default(10),
});

export const keywordGeneratorSchema = z.object({
  seedKeyword: z.string().min(2).max(200),
  language: z.string().min(2).max(10).default('en'),
});

export const timestampGeneratorSchema = z.object({
  transcript: z.string().min(20, 'Transcript must be at least 20 characters').max(20000),
});

export const shortsIdeasSchema = z.object({
  topic: z.string().min(2).max(500),
  count: z.number().int().min(5).max(50).default(50),
});

export const transcriptSummarySchema = z.object({
  transcript: z.string().min(20).max(20000),
});

export const titleAnalysisSchema = z.object({
  titleA: z.string().min(5).max(200),
  titleB: z.string().min(5).max(200),
  keyword: z.string().min(1).max(200).default(''),
});

export const seoScoreSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  tags: z.string().default(''),
  hashtags: z.string().default(''),
  keyword: z.string().min(1).max(200),
  category: z.string().default(''),
});
