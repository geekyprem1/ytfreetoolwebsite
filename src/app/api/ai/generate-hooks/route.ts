import { NextRequest } from 'next/server';
import { generateContent } from '@/lib/ai/gemini';
import { hookGenerationPrompt } from '@/lib/ai/prompts';
import { hookGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = hookGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const { topic, audience, tone, count } = parsed.data;
    const { systemInstruction, prompt } = hookGenerationPrompt({ topic, audience, tone, count });
    const text = await generateContent(prompt, { systemInstruction, temperature: 0.8 });
    const result = JSON.parse(text);

    return apiSuccessResponse({ ...result, meta: { model: 'gemini-2.5-flash' } });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
