/*
|-----------------------------------------
| setting up HomePage for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { IUsers_101__ } from '../../api/v1/Model';

type IResponse = {
  data: {
    users_102__: IUsers_101__[];
    total: 4;
    page: 1;
    limit: 5;
  };
  message: 'Users_101__ fetched successfully';
  status: 200;
};

// Server Component - handles data fetching
const HomePageRender = async () => {
  const dataPerPage = 5;

  // Server-side data fetching
  const getAllPosts = async (): Promise<IUsers_101__[]> => {
    const backendUrl = `http://localhost:3000/a__1001_users__/api/v1?page=1&limit=${dataPerPage}`;
    try {
      const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
      const responseData: IResponse = await res.json();
      const data = responseData.data?.users_102__;
      if (!data) notFound();
      return data;
    } catch (error) {
      console.error('Failed to fetch Data:', error);
      return [];
    }
  };

  // Get data server-side
  const allData = await getAllPosts();

  // Filter as you want
  const filterData = allData.filter(i => i.name);
  console.log('filterData', filterData);

  return (
    <main className="w-full flex flex-col pb-12 md:px-4 lg:mx-0">
      <div className="w-full flex items-center justify-between mb-6 py-3">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center">SSR Fast Load</h2>
        <div className="w-full flex items-center justify-end">
          <Link href="#">
            <button className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200 cursor-pointer">
              See More
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full my-2">
          {filterData.map((i, idx) => (
            <div key={(i.name as string) + idx} className="w-full">
              <Link
                className="w-full border-1 block my-1 p-2 py-1 hover:bg-sky-200"
                href={`/a__1001_users__/all-a__1001_users__ssr/ssr-components/ssr-components-details/${i._id}`}
              >
                {i.name as string}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePageRender;
