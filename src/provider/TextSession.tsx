/*
|-----------------------------------------
| setting up TextSession for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import { useSession } from 'next-auth/react';

const TextSession = () => {
  const session = useSession();
  console.log('session', session);
  return <main className="bg-slate-800 text-white flex items-center justify-center mb-2">{`${session?.data?.user?.name}`}</main>;
};
export default TextSession;
