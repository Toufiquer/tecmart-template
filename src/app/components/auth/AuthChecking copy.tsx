'use client'; // This directive makes the component a Client Component

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function AuthCheckingComponent({ redirectUrl = '/' as string, children = null as React.ReactNode | null }) {
  const sessionData = useSession();
  const { status } = sessionData || {};

  const router = useRouter();

  console.log('session auth : ', sessionData);
  const data = {
    name: sessionData.data?.user.name,
    email: sessionData.data?.user.email,
    accessToken1: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
    fixedKey: process.env.NEXT_PUBLIC_ACCESS_FIXED_KEY,
  };

  console.log('session auth : ', data);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (status === 'unauthenticated') {
      router.replace('/login?callbackUrl=' + redirectUrl);
    }
  }, [status, router, redirectUrl]);

  if (status === 'loading') {
    return <p>Loading session...</p>;
  }
  if (status === 'authenticated' && children) {
    return children;
  }

  return null;
}
