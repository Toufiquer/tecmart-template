'use client';

import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { DefaultSession } from 'next-auth';
import { generateCryptoToken } from '@/lib/cryptoTokenGenerator';
import { useSearchParams } from 'next/navigation';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
    } & DefaultSession['user'];
  }
}

const GoogleAuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: sessionData } = useSession();

  const callbackUrlPath = useSearchParams().get('callbackUrl');

  console.log('params ', callbackUrlPath);
  // Log the token whenever the session changes
  useEffect(() => {
    if (sessionData?.accessToken) {
      console.log('Access Token:', sessionData.accessToken);
    }
  }, [sessionData]);

  const randomToken = generateCryptoToken();
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn('google', {
        callbackUrl: callbackUrlPath || '/',
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        console.error('Sign in error:', result.error);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!sessionData?.user?.email ? (
        <>
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`mt-6 w-full cursor-pointer flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FcGoogle className="mr-2" />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </motion.button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </>
      ) : (
        <div>
          <p>Signed in as: {sessionData.user.email}</p>
          <button onClick={() => console.log('Current randomToken:', randomToken)} className="text-blue-500 hover:underline">
            Log Token
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthButton;

// for more info
// https://next-auth.js.org/providers/google
// https://developers.google.com/identity/protocols/oauth2
// https://console.cloud.google.com/apis/credentials
