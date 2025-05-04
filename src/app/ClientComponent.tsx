/*
|-----------------------------------------
| setting up ClientComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

const ClientComponent = () => {
  const data = { title: ' Component Title' };
  return (
    <main className="min-w-[400px] min-h-[200px] flex items-center justify-start flex-col border-1 ">
      <p className="border-b-1 w-full text-center p-2">Client Component</p>
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <h2>{data.title}</h2>
      </div>
    </main>
  );
};
export default ClientComponent;
