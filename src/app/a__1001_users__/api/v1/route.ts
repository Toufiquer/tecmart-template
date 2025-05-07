import {
  get__101_Users__,
  create__103_User__,
  update__103_User__,
  delete__103_User__,
  get__103_User__ById,
  bulkUpdate__101_Users__,
  bulkDelete__101_Users__,
} from './Controller';

import { formatResponse, handleRateLimit, IResponse } from './utils';

// GET all __101_Users__
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await get__103_User__ById(req) : await get__101_Users__(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE __103_User__
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const result = await create__103_User__(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE __103_User__
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdate__101_Users__(req) : await update__103_User__(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE __103_User__
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDelete__101_Users__(req) : await delete__103_User__(req);

  return formatResponse(result.data, result.message, result.status);
}
