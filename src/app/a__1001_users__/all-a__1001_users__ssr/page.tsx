import React from 'react';
import Link from 'next/link';
import { IUsers_101__ } from '../api/v1/Model';

// Interface for API response
interface ApiResponse {
  data: {
    users_102__: IUsers_101__[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
  status: number;
}

// Define props for the UsersPage component
interface UsersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

// Server component for SSR
export default async function UsersPage({ searchParams }: UsersPageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 2;

  // Fetch users data from API with SSR
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/a__1001_users__/api/v1?page=${page}&limit=${limit}`,
    { cache: 'no-store' }, // This ensures fresh data on each request
  );

  const { data, message, status }: ApiResponse = await response.json();
  const { users_102__, total } = data;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>

      {status === 200 ? (
        <>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alias</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users_102__.map((user, idx) => (
                  <tr key={(user._id as string) + idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name as string}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email as string}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.alias as string}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {user.role as string}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/users/${user._id}`} className="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              Showing page {page} of {totalPages} ({total} total users)
            </div>
            <div className="flex space-x-2">
              {page > 1 && (
                <Link
                  href={`/a__1001_users__/all-a__1001_users__ssr?page=${page - 1}&limit=${limit}`}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/a__1001_users__/all-a__1001_users__ssr?page=${page + 1}&limit=${limit}`}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {message}</div>
      )}
    </div>
  );
}
