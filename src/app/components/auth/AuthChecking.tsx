'use client'; // This directive makes the component a Client Component

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCheckingComponent({ redirectUrl = '/' as string, children = null as React.ReactNode | null }) {
  const sessionData = useSession();
  const { status } = sessionData || {};

  const router = useRouter();

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      console.log('found token', getToken);
    } else {
      if (status !== 'loading' && status !== 'unauthenticated') {
        const fetchToken = async () => {
          const reqData = {
            name: sessionData.data?.user.name,
            email: sessionData.data?.user.email,
            accessToken1: sessionData.data?.expires,
            fixedKey: process.env.NEXT_PUBLIC_ACCESS_FIXED_KEY,
          };
          const response = await fetch('http://localhost:3000/api/auth/get-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
          });
          const data = await response.json();

          console.log('fetch token ; ', data);
          localStorage.setItem('token', data);
          return data;
        };
        fetchToken();
      }
    }
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
