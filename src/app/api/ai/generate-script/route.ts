import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { scriptGenerationPrompt } from '@/lib/ai/prompts';
import { scriptGeneratorSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

const LENGTH_LABELS: Record<string, string> = {
  short: '30-60 second Short',
  '5min': 'about 5 minutes',
  '8min': 'about 8 minutes',
  '15min': 'about 15 minutes',
  long: '20+ minutes',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = scriptGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(
        new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400),
      );
    }

    const { topic, targetLength, tone, audience } = parsed.data;
    const { systemInstruction, prompt } = scriptGenerationPrompt({
      topic,
      targetLength: LENGTH_LABELS[targetLength] ?? targetLength,
      tone,
      audience,
    });

    // Scripts are long; give the model more room than the 2048 default.
    const text = await generateContent(prompt, { systemInstruction, temperature: 0.8, maxTokens: 6144 });
    const result = safeJsonParse(text);

    return apiSuccessResponse({ ...(result as Record<string, unknown>), meta: { model: 'gemini-2.0-flash' } });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
