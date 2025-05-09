import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IUsers_101__ } from '../../api/v1/Model';

// Interface for the API response of a single user
interface UserApiResponse {
  data: {
    user: IUsers_101__;
  };
  message: string;
  status: number;
}

// Props for the UserDetailPage component
interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = params;

  try {
    // Fetch single user data with SSR
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/a__1001_users__/api/v1/${id}`, { cache: 'no-store' });

    if (!response.ok) {
      return notFound();
    }

    const { data, status }: UserApiResponse = await response.json();
    const { user } = data;

    if (!user) {
      return notFound();
    }

    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <Link href="/users" className="text-indigo-600 hover:text-indigo-900">
            ← Back to Users List
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">ID</h2>
                <p className="text-gray-900">{user._id as string}</p>
              </div>

              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">Name</h2>
                <p className="text-gray-900">{user.name as string}</p>
              </div>

              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="text-gray-900">{user.email as string}</p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">Alias</h2>
                <p className="text-gray-900">{user.alias as string}</p>
              </div>

              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">Role</h2>
                <p className="text-gray-900">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role as string}
                  </span>
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">Created At</h2>
                <p className="text-gray-900">{new Date(user.createdAt as Date).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user details:', error);
    return notFound();
  }
}
