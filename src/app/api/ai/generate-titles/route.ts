import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { titleGenerationPrompt } from '@/lib/ai/prompts';
import { titleGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = titleGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const { topic, keyword, language, tone, count } = parsed.data;
    const { systemInstruction, prompt } = titleGenerationPrompt({ topic, keyword, language, tone, count });

    const text = await generateContent(prompt, { systemInstruction, temperature: 0.7 });
    const titles = safeJsonParse(text);

    return apiSuccessResponse({
      titles: Array.isArray(titles) ? titles : (titles as { titles: unknown[] }).titles ?? [],
      meta: { tokensUsed: text.length, model: 'gemini-2.0-flash' },
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
