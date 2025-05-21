/*
|-----------------------------------------
| setting up Utils for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import Users from '@/app/api/auth/[...nextauth]/google-auth-modal';
import { NextResponse } from 'next/server';

import { verifyJwt } from './jwt-utils';

export interface IResponse {
  data: unknown;
  message: string;
  status: number;
}
export const formatResponse = (data: unknown, message: string, status: number) => NextResponse.json({ data, message, status }, { status });

export const verifyAuthAndRole = (accessType: string, req: Request) => {
  console.log('accessType', accessType);
  console.log('req', req.url);
  console.log('verifyJwt', verifyJwt);

  const email = 'toufiquerabc@gmail.com';
  const e = Users.findOne({ email });
  console.log('email', email);
  console.log('email', e);
  // ! 1. get token
  // ! 3. check if email is in the database
  // ! 4. check role for this email
  // ! if found return null;
  // ! else return response with 401 not authorized
  return null;
};
