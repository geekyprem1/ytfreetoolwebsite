import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { playlistGenerationPrompt } from '@/lib/ai/prompts';
import { playlistGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

function cleanText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = playlistGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const { topic, audience, keyword, videoThemes, tone, language, count } = parsed.data;
    const { systemInstruction, prompt } = playlistGenerationPrompt({
      topic,
      audience,
      keyword,
      videoThemes,
      tone,
      language,
      count,
    });

    const text = await generateContent(prompt, { systemInstruction, temperature: 0.75, maxTokens: 6144 });
    const parsedResult = safeJsonParse(text) as { playlists?: unknown };
    const rawPlaylists = Array.isArray(parsedResult) ? parsedResult : parsedResult.playlists;
    const playlists = Array.isArray(rawPlaylists)
      ? rawPlaylists
          .map((item) => {
            if (!item || typeof item !== 'object') return null;
            const record = item as Record<string, unknown>;
            const title = cleanText(record.title);
            const description = cleanText(record.description);
            return title && description ? { title, description } : null;
          })
          .filter((item): item is { title: string; description: string } => item !== null)
          .slice(0, count)
      : [];

    return apiSuccessResponse({
      playlists,
      meta: { tokensUsed: text.length, model: process.env.AI_MODEL || 'gemini-2.0-flash' },
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
