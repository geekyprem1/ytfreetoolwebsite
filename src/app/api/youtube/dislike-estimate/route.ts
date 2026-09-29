import { NextRequest } from 'next/server';
import { AppError, apiErrorResponse, apiSuccessResponse, handleApiError } from '@/lib/errors';
import { getReturnYoutubeDislikeEstimate } from '@/lib/third-party/return-youtube-dislike';

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('v');
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return apiErrorResponse(new AppError('INVALID_TOOL_INPUT', 'Enter a valid YouTube video URL.', 400));
  }

  try {
    return apiSuccessResponse(await getReturnYoutubeDislikeEstimate(videoId));
  } catch (error) {
    return apiErrorResponse(handleApiError(error));
  }
}
