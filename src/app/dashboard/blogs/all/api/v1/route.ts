import { handleRateLimit } from '@/app/api/utils/rate-limit';
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  bulkUpdateBlogs,
  bulkDeleteBlogs,
} from './Controller';

import { formatResponse, handleTokenVerify, IResponse } from '@/app/api/utils/jwt-verify';
import { verifyAuthAndRole } from '@/app/api/utils/verifyAuthAndRole';

// GET all Blogs
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('GET', req);
  if (authenticationResponse) return authenticationResponse;

  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getBlogById(req) : await getBlogs(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE Blog
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('POST', req);
  if (authenticationResponse) return authenticationResponse;

  const result = await createBlog(req);
  return formatResponse(result.data, result.message, result.status);
}

// UPDATE Blog
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('PUT', req);
  if (authenticationResponse) return authenticationResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdateBlogs(req) : await updateBlog(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE Blog
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const tokenResponse = handleTokenVerify(req);
  if (tokenResponse) return tokenResponse;

  const authenticationResponse = verifyAuthAndRole('DELETE', req);
  if (authenticationResponse) return authenticationResponse;

  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDeleteBlogs(req) : await deleteBlog(req);

  return formatResponse(result.data, result.message, result.status);
}
