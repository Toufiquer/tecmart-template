'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const gToken = localStorage.getItem('gToken');
      const eToken = localStorage.getItem('eToken');
      console.log('auth check g token', gToken);
      console.log('auth check e token', eToken);
      if (!gToken && !eToken) {
        router.push('/login');
        return;
      }

      try {
        const tokenType = gToken ? 'google' : 'email';
        const token = gToken || eToken;

        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenType,
            token,
          }),
        });

        if (!response.ok) {
          localStorage.removeItem(gToken ? 'gToken' : 'eToken');
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem(gToken ? 'gToken' : 'eToken');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return null;
};

export default AuthChecker;
