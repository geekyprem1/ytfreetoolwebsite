import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { descriptionGenerationPrompt } from '@/lib/ai/prompts';
import { descriptionGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

/** Strip markdown that YouTube would show as raw stars/asterisks. */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '');
}

type Chapter = { timestamp: string; title: string };

/** AI sometimes returns "0:00 Intro" strings instead of objects — normalize both. */
function normalizeTimestamps(raw: unknown): Chapter[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item): Chapter | null => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        if (!trimmed) return null;
        const match = trimmed.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
        if (match?.[1] && match[2]) {
          return { timestamp: match[1], title: match[2].trim() };
        }
        return { timestamp: '0:00', title: trimmed };
      }

      if (item && typeof item === 'object') {
        const obj = item as Record<string, unknown>;
        const timestamp = String(obj.timestamp ?? obj.time ?? '').trim();
        const title = String(obj.title ?? obj.name ?? obj.label ?? '').trim();
        if (!timestamp && !title) return null;
        // Sometimes model puts full "0:00 Intro" only in title
        if (!timestamp && title) {
          const match = title.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
          if (match?.[1] && match[2]) {
            return { timestamp: match[1], title: match[2].trim() };
          }
        }
        return { timestamp: timestamp || '0:00', title: title || 'Chapter' };
      }

      return null;
    })
    .filter((c): c is Chapter => c !== null);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = descriptionGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const { topic, keyword, summary, tone, includeTimestamps, includeHashtags, includeCTA } = parsed.data;
    const { systemInstruction, prompt } = descriptionGenerationPrompt({
      topic, keyword, summary, tone, includeTimestamps, includeHashtags, includeCTA,
    });

    const text = await generateContent(prompt, { systemInstruction, temperature: 0.5, maxTokens: 4096 });
    const result = safeJsonParse(text) as {
      description?: string;
      cta?: string;
      hashtags?: unknown;
      timestamps?: unknown;
      [key: string]: unknown;
    };

    if (typeof result.description === 'string') {
      result.description = stripMarkdown(result.description);
    }
    if (typeof result.cta === 'string') {
      result.cta = stripMarkdown(result.cta);
    }

    const timestamps = includeTimestamps ? normalizeTimestamps(result.timestamps) : [];
    const hashtags = includeHashtags && Array.isArray(result.hashtags)
      ? result.hashtags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
      : [];
    const cta = includeCTA && typeof result.cta === 'string' ? result.cta : '';

    return apiSuccessResponse({
      description: typeof result.description === 'string' ? result.description : '',
      hashtags,
      timestamps,
      cta,
      meta: { tokensUsed: text.length, model: process.env.AI_MODEL || 'gemini-2.0-flash' },
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
