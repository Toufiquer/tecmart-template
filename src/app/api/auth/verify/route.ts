import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { checkEmail } from '../[...nextauth]/google-auth-controller';
import { handleRateLimit, IResponse } from '../../utils';
import { invokeAuth } from './verify-controller';

export const formatResponse = (data: unknown, message: string, status: number) => NextResponse.json({ data, message, status }, { status });

export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  try {
    const data = await invokeAuth(req);
    if (data.message === 'login Success' && data.status === 201) {
      return formatResponse(data.data, data.message, data.status);
    } else if (data.message === 'not valid' && data.status === 502) {
      return formatResponse(data.data, data.message, data.status);
    } else {
      return formatResponse('not valid', 'not valid', 503);
    }
  } catch (err) {
    console.log('err', err);
    const result: IResponse = { data: [], message: 'some thing wrong', status: 502 };
    return formatResponse(result.data, result.message, result.status);
  }
  // finally {
  // }
}
