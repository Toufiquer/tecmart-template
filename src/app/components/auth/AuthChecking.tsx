'use client'; // This directive makes the component a Client Component

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCheckingComponent({ redirectUrl = '/' as string, children = null as React.ReactNode | null }) {
  const sessionData = useSession();
  const { status } = sessionData || {};

  const router = useRouter();

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    console.log('');
    console.log('');
    console.log('');
    console.log('getToken', getToken);
    if (getToken) {
      const token = getToken;
      console.log('token', token.replaceAll('"', ''));
      const freshToken = token.replaceAll('"', '');
      const fetchToken = async () => {
        const response = await fetch('http://localhost:3000/api/auth/verify', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + freshToken,
          },
        });
        const data = await response.json();

        if (data.message === 'success' && data.data === 'valid token' && data.status === 206) {
          console.log('token valid found and verify by api');
        } else {
          console.log('token is expired or invalid');
          console.log('');
          console.log('');
          console.log('----');
          console.log('data : ', data);
          console.log('token : ', token);
          localStorage.removeItem('token');
          signOut();
        }
        return data;
      };
      fetchToken();
    } else {
      if (status !== 'loading' && status !== 'unauthenticated') {
        const fetchToken = async () => {
          const reqData = {
            name: sessionData.data?.user.name,
            email: sessionData.data?.user.email,
            accessToken1: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
            authType: 'google',
            fixedKey: process.env.NEXT_PUBLIC_ACCESS_FIXED_KEY,
          };
          console.log('reqData', reqData);
          const response = await fetch('http://localhost:3000/api/auth/get-token', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
          });
          const data = await response.json();

          if (data.message === 'success' && data.data && data.status === 210) {
            localStorage.setItem('token', JSON.stringify(data.data));
          }
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
  }, [status, router, redirectUrl, sessionData]);

  if (status === 'loading') {
    return <p>Loading session...</p>;
  }
  if (status === 'authenticated' && children) {
    return children;
  }

  return null;
}
