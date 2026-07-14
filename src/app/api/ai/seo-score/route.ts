import { NextRequest } from 'next/server';
import { calculateSEOScore } from '@/lib/seo/score-calculator';
import { seoScoreSchema } from '@/lib/validators/tool-inputs';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = seoScoreSchema.safeParse(body);
    if (!parsed.success) {
      return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', parsed.error.issues[0]?.message ?? 'Invalid input', 400));
    }

    const result = calculateSEOScore(parsed.data);
    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
