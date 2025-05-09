/*
|-----------------------------------------
| setting up \Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import AuthManagement from '@/app/components/auth/AuthManagement';
import TokenManagement from './components/TokenManagement';

const Page = () => {
  return (
    <main className="bg-slate-800 text-white flex items-center justify-center w-full mn-h-screen flex-col p-12">
      <AuthManagement />
      <TokenManagement />
    </main>
  );
};
export default Page;
