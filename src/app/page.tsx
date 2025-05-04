/*
|-----------------------------------------
| setting up \Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import ClientComponent from './components/ClientComponent';
import ServerComponent from './components/ServerComponent';
import GoogleAuthButton from './login/components/GoogleAuthButton';

const Page = () => {
  return (
    <main className="bg-slate-800 text-white flex items-center justify-center w-full mn-h-screen flex-col p-12">
      <div className="w-full flex gap-4 min-h-screen items-center justify-center p-4">
        <ClientComponent />
        <ServerComponent />
      </div>

      <GoogleAuthButton />
    </main>
  );
};
export default Page;
