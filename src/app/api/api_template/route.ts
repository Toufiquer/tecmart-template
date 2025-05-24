import { formatResponse } from '@/app/api/utils/jwt-verify';
import { handleRateLimit } from '@/app/api/utils/rate-limit';

// GET all Users__1_101__
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  return formatResponse('data', 'message from GET request', 200);
}

// CREATE User__1_103__
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  const reqData = await req.json();
  return formatResponse(reqData, 'message from POST request', 200);
}

// UPDATE User__1_103__
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  return formatResponse('data', 'message from PUT request', 200);
}

// DELETE User__1_103__
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  return formatResponse('data', 'message from DELETE request', 200);
}
