/*
|-----------------------------------------
| setting up TokenManagement for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

const TokenManagement = () => {
  const [token, setToken] = useState(true);
  const { data: session, status } = useSession();
  console.log('session', session, status);
  let tokenFromSessionStorage: string | null = '';
  if (status === 'authenticated' && session) {
    tokenFromSessionStorage = sessionStorage.getItem(process.env.NEXTAUTH_SECRET || '_');
    console.log('--tokenFromSessionStorage: ', tokenFromSessionStorage); // Optional: reduce noise
    if (tokenFromSessionStorage) {
      console.log('--Token found in sessionStorage, doing nothing.'); // Optional: reduce noise
    }
  }
    const handleVerify = () => {
      
  };
  return (
    <main className="w-full border-1 my-4 p-4" onClick={handleVerify}>
      <div className="w-full flex items-center justify-center hover:bg-blue-500">
        <p>Token: </p>
        {tokenFromSessionStorage ? <p>Found Token</p> : <p>Not Found</p>}
      </div>

      <div className="w-full flex items-center justify-center hover:bg-blue-500">
        <p>Valid : {token ? 'True' : 'False'}</p>
      </div>
    </main>
  );
};
export default TokenManagement;
