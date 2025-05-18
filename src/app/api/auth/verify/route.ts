import { formatResponse, IResponse } from '@/app/api/utils/jwt-verify';
import { invokeAuth } from './verify-controller';
import { handleRateLimit } from '@/app/api/utils/rate-limit';

export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  try {
    const data = await invokeAuth(req);
    if (data.message === 'login Success' && data.status === 201) {
      return formatResponse(data.data, data.message, data.status);
    } else if (data.data === 'token is valid' && data.message === 'token is valid' && data.status === 203) {
      return formatResponse(data.data, data.message, data.status);
    } else if (data.message === 'not valid' && data.status === 205) {
      return formatResponse(data.data, data.message, data.status);
    } else {
      return formatResponse('not valid', 'not valid', 206);
    }
  } catch (err) {
    console.log('err', err);
    const result: IResponse = { data: [], message: 'some thing wrong', status: 502 };
    return formatResponse(result.data, result.message, result.status);
  }
}
