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
      hashtags?: string[];
      timestamps?: unknown;
      [key: string]: unknown;
    };

    if (typeof result.description === 'string') {
      result.description = stripMarkdown(result.description);
    }
    if (typeof result.cta === 'string') {
      result.cta = stripMarkdown(result.cta);
    }

    return apiSuccessResponse({
      ...result,
      meta: { tokensUsed: text.length, model: process.env.AI_MODEL || 'gemini-2.0-flash' },
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
