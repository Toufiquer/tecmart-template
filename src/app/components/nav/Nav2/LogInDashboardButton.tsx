/*
|-----------------------------------------
| setting up LogInDashboardButton for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const LogInDashboardButton = () => {
  const { data: sessionData } = useSession();
  return (
    <main>
      {sessionData?.user?.email ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </main>
  );
};
export default LogInDashboardButton;
