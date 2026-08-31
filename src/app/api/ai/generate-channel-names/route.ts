import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { channelNamePrompt } from '@/lib/ai/prompts';
import { channelNameSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = channelNameSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(
        new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400),
      );
    }

    const { niche, keywords, style, count } = parsed.data;
    const { systemInstruction, prompt } = channelNamePrompt({ niche, keywords, style, count });
    const text = await generateContent(prompt, { systemInstruction, temperature: 0.9, maxTokens: 3072 });
    const result = safeJsonParse(text);

    return apiSuccessResponse({ ...(result as Record<string, unknown>), meta: { model: 'gemini-2.0-flash' } });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
