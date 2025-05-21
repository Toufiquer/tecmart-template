import { formatResponse, handleTokenVerify, IResponse } from '@/app/api/utils/jwt-verify';
import { handleRateLimit } from '@/app/api/utils/rate-limit';

export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  try {
    const tokenResponse = handleTokenVerify(req);
    if (tokenResponse) return tokenResponse;

    return formatResponse('valid token', 'success', 206);
  } catch (err) {
    console.log('err', err);
    const result: IResponse = { data: [], message: 'some thing wrong', status: 502 };
    return formatResponse(result.data, result.message, result.status);
  }
}
