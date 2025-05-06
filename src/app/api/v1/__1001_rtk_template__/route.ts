import {
  get__1_template__,
  create__3_template__,
  update__3_template__,
  delete__3_template__,
  get__3_template__ById,
  bulkUpdate__1_template__,
  bulkDelete__1_template__,
} from './Controller';

import { formatResponse, handleRateLimit, IResponse } from './utils';

// GET all __1_template__
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await get__3_template__ById(req) : await get__1_template__(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE __3_template__
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const result = await create__3_template__(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE __3_template__
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdate__1_template__(req) : await update__3_template__(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE __3_template__
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDelete__1_template__(req) : await delete__3_template__(req);

  return formatResponse(result.data, result.message, result.status);
}
