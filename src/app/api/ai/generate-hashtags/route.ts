import { NextRequest } from 'next/server';
import { generateContent } from '@/lib/ai/gemini';
import { hashtagGenerationPrompt } from '@/lib/ai/prompts';
import { hashtagGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = hashtagGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const { topic, count } = parsed.data;
    const { systemInstruction, prompt } = hashtagGenerationPrompt({ topic, count });
    const text = await generateContent(prompt, { systemInstruction, temperature: 0.7 });
    const result = JSON.parse(text);

    return apiSuccessResponse({ ...result, meta: { model: 'gemini-2.5-flash' } });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
