import {
  get_1_template_,
  create_3_template_,
  update_3_template_,
  delete_3_template_,
  get_3_template_ById,
  bulkUpdate_1_template_,
  bulkDelete_1_template_,
} from './filename7Controller';

import { formatResponse, handleRateLimit, IResponse } from './utils';

// GET all _1_template_
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await get_3_template_ById(req) : await get_1_template_(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE _3_template_
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const result = await create_3_template_(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE _3_template_
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdate_1_template_(req) : await update_3_template_(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE _3_template_
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDelete_1_template_(req) : await delete_3_template_(req);

  return formatResponse(result.data, result.message, result.status);
}
