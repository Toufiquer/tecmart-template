import connectDB from '@/lib/mongoose';

import { IResponse } from '@/app/api/utils/jwt-verify';

export async function withDB(handler: () => Promise<IResponse>): Promise<IResponse> {
  try {
    await connectDB();
    return await handler();
  } catch (error) {
    console.error(error);
    return { data: null, message: (error as Error).message, status: 400 };
  }
}
