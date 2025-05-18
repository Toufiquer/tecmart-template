import { handleRateLimit } from '@/app/api/utils/rate-limit';
import {
  getUsers_101__,
  createUser_103__,
  updateUser_103__,
  deleteUser_103__,
  getUser_103__ById,
  bulkUpdateUsers_101__,
  bulkDeleteUsers_101__,
} from './Controller';

import { formatResponse, handleTokenVerify, IResponse } from '@/app/api/utils/jwt-verify';

// GET all Users_101__
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getUser_103__ById(req) : await getUsers_101__(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE User_103__
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const result = await createUser_103__(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE User_103__
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdateUsers_101__(req) : await updateUser_103__(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE User_103__
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDeleteUsers_101__(req) : await deleteUser_103__(req);

  return formatResponse(result.data, result.message, result.status);
}
