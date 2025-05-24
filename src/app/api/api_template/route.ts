import { formatResponse } from '@/app/api/utils/jwt-verify';

// GET all Users__1_101__
export async function GET(req: Request) {
  return formatResponse('data', 'message from GET request', 200);
}

// CREATE User__1_103__
export async function POST(req: Request) {
  return formatResponse('data', 'message from POST request', 200);
}

// UPDATE User__1_103__
export async function PUT(req: Request) {
  return formatResponse('data', 'message from PUT request', 200);
}

// DELETE User__1_103__
export async function DELETE(req: Request) {
  return formatResponse('data', 'message from DELETE request', 200);
}
