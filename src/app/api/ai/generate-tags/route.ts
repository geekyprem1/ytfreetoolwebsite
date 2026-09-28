import { NextRequest } from 'next/server';
import { generateContent, safeJsonParse } from '@/lib/ai/gemini';
import { tagGenerationPrompt } from '@/lib/ai/prompts';
import { tagGeneratorSchema } from '@/lib/validators/tool-inputs';
import { normalizeGeneratedTags, salvageTagGroups } from '@/lib/youtube/tag-budget';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

/** POST /api/ai/generate-tags — AI YouTube Studio tags (not hashtags). */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = tagGeneratorSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(
        new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400),
      );
    }

    const { topic, keywords, language, count } = parsed.data;
    const { systemInstruction, prompt } = tagGenerationPrompt({ topic, keywords, language, count });
    // One retry: providers occasionally return an empty body under load.
    const generate = () => generateContent(prompt, { systemInstruction, temperature: 0.6 });
    const text = await generate().catch(() => generate());

    // Models occasionally return truncated JSON; keep every complete tag object instead of failing.
    let aiOutput: unknown;
    try {
      aiOutput = safeJsonParse(text);
    } catch {
      aiOutput = salvageTagGroups(text);
    }

    // AI output is untrusted: sanitize, dedupe and cap before returning.
    const tags = normalizeGeneratedTags(aiOutput, count);
    if (tags.length < 5) {
      throw new AppError('AI_GENERATION_FAILED', 'Could not generate tags. Please try again.', 502);
    }

    return apiSuccessResponse({ tags });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
