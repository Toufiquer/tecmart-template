/*
|-----------------------------------------
| setting up \Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import ClientComponent from './ClientComponent';
import ServerComponent from './ServerComponent';

const Page = () => {
  return (
    <main className="bg-slate-800 text-white flex items-center justify-center w-full h-screen flex-col ">
      <div className="w-full flex gap-4 h-screen items-center justify-center">
        <ClientComponent />
        <ServerComponent />
      </div>
    </main>
  );
};
export default Page;
