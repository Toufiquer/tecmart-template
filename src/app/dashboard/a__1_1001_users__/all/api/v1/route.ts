import {
  getUsers__1_101__,
  createUser__1_103__,
  updateUser__1_103__,
  deleteUser__1_103__,
  getUser__1_103__ById,
  bulkUpdateUsers__1_101__,
  bulkDeleteUsers__1_101__,
} from './Controller';

import { formatResponse, handleRateLimit, handleTokenVerify, IResponse } from '@/app/api/utils';

// GET all Users__1_101__
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  console.log('');
  console.log('');
  console.log('');
  console.log('hit get from test-case ');

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;
  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getUser__1_103__ById(req) : await getUsers__1_101__(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE User__1_103__
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const result = await createUser__1_103__(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE User__1_103__
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdateUsers__1_101__(req) : await updateUser__1_103__(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE User__1_103__
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDeleteUsers__1_101__(req) : await deleteUser__1_103__(req);

  return formatResponse(result.data, result.message, result.status);
}
