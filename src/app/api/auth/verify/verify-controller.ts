import { handleTokenVerify, IResponse } from '@/app/api/utils/jwt-verify';
import { checkEmail } from '../[...nextauth]/google-auth-controller';
import { createJwt } from '@/app/api/utils/jwt-utils';
import { withDB } from '@/app/api/utils/db';

let formatResponse = { data: 'try-again', message: 'try-again', status: 202 };

export async function invokeAuth(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const result = await req.json();

      let token;
      if (result.authType === 'google') {
        const email = result.email;
        const isEmailValid = await checkEmail(email);

        if (isEmailValid) {
          token = createJwt(email);
          formatResponse = { data: token, message: 'login Success', status: 201 };
        } else {
          formatResponse = { data: 'not valid', message: 'not valid', status: 205 };
        }
      } else if (result.authType === 'verify-token') {
        const tokenResponse = handleTokenVerify(req);
        if (!tokenResponse) {
          return { data: 'token is valid', message: 'token is valid', status: 203 };
        } else {
          return formatResponse;
        }
      }

      return formatResponse;
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        console.log('err ', err);
        return formatResponse;
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}
