/*
|-----------------------------------------
| setting up GoogleAuthButtonParent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useSession } from 'next-auth/react';

import GoogleAuthButton from '@/app/components/auth/GoogleAuthButton';

const GoogleAuthButtonParent = () => {
  const { status } = useSession();
  return <main> {status === 'unauthenticated' && <GoogleAuthButton />}</main>;
};
export default GoogleAuthButtonParent;
