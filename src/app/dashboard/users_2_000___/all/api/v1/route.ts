import { handleRateLimit } from '@/app/api/utils/rate-limit';
import {
  getUsers_1_000___,
  createUser_3_000___,
  updateUser_3_000___,
  deleteUser_3_000___,
  getUser_3_000___ById,
  bulkUpdateUsers_1_000___,
  bulkDeleteUsers_1_000___,
} from './Controller';

import { formatResponse, handleTokenVerify, IResponse } from '@/app/api/utils/jwt-verify';
import { verifyAuthAndRole } from '@/app/api/utils/verifyAuthAndRole';

// GET all Users_1_000___
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('GET', req);
  if (authenticationResponse) return authenticationResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getUser_3_000___ById(req) : await getUsers_1_000___(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE User_3_000___
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('POST', req);
  if (authenticationResponse) return authenticationResponse;

  const result = await createUser_3_000___(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE User_3_000___
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('PUT', req);
  if (authenticationResponse) return authenticationResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdateUsers_1_000___(req) : await updateUser_3_000___(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE User_3_000___
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('DELETE', req);
  if (authenticationResponse) return authenticationResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDeleteUsers_1_000___(req) : await deleteUser_3_000___(req);

  return formatResponse(result.data, result.message, result.status);
}
