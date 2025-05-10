import { IResponse, withDB } from '../../utils';
import { checkEmail } from '../[...nextauth]/google-auth-controller';
import { createJwt } from './jwt-token';
// import { formatResponse } from './route';
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
          formatResponse = { data: 'not valid', message: 'not valid', status: 502 };
        }
      } else if (result.authType === 'verify-token') {
        const reqToken = req.headers.get('authorization');
        console.log('log:value: reqToken ', reqToken);
        // ! -- false
        // ! 4. check is there token or not
        //! 5. check is token is valid or not
        // ! 6 send message as token is invalid
        // if token valid
        //   formatResponse = { data: 'token is valid', message: 'token is valid', status: 203 };
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
