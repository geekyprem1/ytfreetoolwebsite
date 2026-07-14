import { NextRequest } from 'next/server';
import { generateContent } from '@/lib/ai/gemini';
import { descriptionGenerationPrompt } from '@/lib/ai/prompts';
import { descriptionGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

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
    const result = JSON.parse(text);

    return apiSuccessResponse({
      ...result,
      meta: { model: 'gemini-2.5-flash' },
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
