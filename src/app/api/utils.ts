/*
|-----------------------------------------
| setting up Utils for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import { NextResponse } from 'next/server';

import connectDB from '@/lib/mongoose';
import { verifyJwt } from './jwt-utils';

export const RATE_LIMIT = 100; // 50 requests
export const TIME_WINDOW = 60 * 1000; // 1 minute

export interface IResponse {
  data: unknown;
  message: string;
  status: number;
}
export const formatResponse = (data: unknown, message: string, status: number) => NextResponse.json({ data, message, status }, { status });

export const rateLimitMap = new Map<string, { count: number; timer: NodeJS.Timeout }>();

export const rateLimit = (ip: string, RATE_LIMIT: number = 50, TIME_WINDOW: number = 60 * 1000) => {
  if (!rateLimitMap.has(ip)) {
    const timer = setTimeout(() => rateLimitMap.delete(ip), TIME_WINDOW);
    rateLimitMap.set(ip, { count: 1, timer });
    return true;
  }

  const record = rateLimitMap.get(ip)!;
  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
};

export const getClientIp = (req: Request) => {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
};

export const handleRateLimit = (req: Request) => {
  const ip = getClientIp(req);
  if (!rateLimit(ip, RATE_LIMIT, TIME_WINDOW)) {
    return NextResponse.json({ data: null, message: 'Too many requests. Please try again later.', status: 429 }, { status: 429 });
  }
  return null;
};

export async function withDB(handler: () => Promise<IResponse>): Promise<IResponse> {
  try {
    await connectDB();
    return await handler();
  } catch (error) {
    console.error(error);
    return { data: null, message: (error as Error).message, status: 400 };
  }
}

export const handleTokenVerify = (req: Request) => {
  const authorizationToken = req.headers.get('authorization');
  const token = authorizationToken?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ data: null, message: 'Please provide a token', status: 430 }, { status: 430 });
  } else if (token) {
    const result = verifyJwt(token);
    if (result.isValid) {
      return null;
    } else {
      return NextResponse.json({ data: null, message: 'token is expire', status: 432 }, { status: 432 });
    }
  }
  return NextResponse.json({ data: null, message: 'Please provide a valid token', status: 433 }, { status: 433 });
};
