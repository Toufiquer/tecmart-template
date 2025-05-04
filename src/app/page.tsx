/*
|-----------------------------------------
| setting up \Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import TextSession from '@/provider/TextSession';

const Page = () => {
  return (
    <main className="bg-slate-800 text-white flex items-center justify-center w-full h-screen flex-col ">
      <div className="w-full">
        <TextSession />
      </div>
      <p className="w-full text-center">Home page</p>
    </main>
  );
};
export default Page;
