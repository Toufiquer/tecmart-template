import { formatResponse } from '@/app/api/utils/jwt-verify';
import { connectRedis, getRedisData, setRedisData } from '@/app/api/utils/redis';
import { handleRateLimit } from '@/app/api/utils/rate-limit';

// GET all Users__1_101__
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  await connectRedis();
  const result = await getRedisData('__Users_');
  return formatResponse(JSON.parse(result || 'failed'), 'message from GET request', 200);
}

// CREATE User__1_103__
export async function POST(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  await connectRedis();
  const reqData = await req.json();
  const result = await setRedisData('__Users_', JSON.stringify(reqData));
  return formatResponse(result, 'message from POST request', 200);
}

// UPDATE User__1_103__
export async function PUT(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  await connectRedis();
  const reqData = await req.json();
  const result = await setRedisData('__Users_', JSON.stringify(reqData));
  return formatResponse(result, 'message from PUT request', 200);
}

// DELETE User__1_103__
export async function DELETE(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;
  await connectRedis();
  const result = await setRedisData('__Users_', JSON.stringify(''));
  return formatResponse(result, 'message from DELETE request', 200);
}
