import { formatResponse, handleRateLimit, IResponse } from '@/app/api/utils';
import { checkEmail } from '../[...nextauth]/google-auth-controller';
import { createJwt } from '../../jwt-utils';

export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  try {
    const result = await req.json();

    let token;
    if (result.authType === 'google') {
      const email = result.email;
      const isEmailValid = await checkEmail(email);
      if (isEmailValid) {
        token = createJwt(email);
        return formatResponse(token, result.message, result.status);
      } else {
        return formatResponse('', 'Email not valid', result.status);
      }
    }
  } catch (err) {
    console.log('err', err);
    const result: IResponse = { data: [], message: 'some thing wrong', status: 502 };
    return formatResponse(result.data, result.message, result.status);
  }
}
