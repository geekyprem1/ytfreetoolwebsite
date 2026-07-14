import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { transcriptSummaryPrompt } from '@/lib/ai/prompts';
import { transcriptSummarySchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = transcriptSummarySchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const { transcript } = parsed.data;
    const { systemInstruction, prompt } = transcriptSummaryPrompt({ transcript: transcript.substring(0, 5000) });
    const text = await generateContent(prompt, { systemInstruction, temperature: 0.3, maxTokens: 2048 });
    const result = safeJsonParse(text);

    return apiSuccessResponse({ ...(result as Record<string, unknown>), meta: { model: 'gemini-2.0-flash' } });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
