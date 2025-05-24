'use client';

import React, { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { useUsers_1_000___Store } from './store/Store';
import { useGetUsers_1_000___Query } from './redux/rtk-Api';

import AddFilename8 from './components/Add';
import EditFilename8 from './components/Edit';
import ViewFilename8 from './components/View';
import TooManyRequests from './components/TooManyRequest';
import DeleteFilename8 from './components/Delete';
import BulkEditFilename8 from './components/BulkEdit';
import BulkDeleteFilename8 from './components/BulkDelete';
import ViewUsers_1_000___Table from './components/ViewTable';
import SearchBox from './components/SearchBox';
import BulkUpdateUsers_1_000___ from './components/BulkUpdate';
import BulkDynamicUpdateUsers_1_000___ from './components/BulkDynamicUpdate';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const MainNextPage: React.FC = () => {
  const [hashSearchText, setHashSearchText] = useState('');
  const { toggleAddModal, queryPramsLimit, queryPramsPage, queryPramsQ, setQueryPramsPage, setQueryPramsQ } = useUsers_1_000___Store();

  const {
    data: getResponseData,
    isSuccess,
    status: statusCode,
  } = useGetUsers_1_000___Query(
    { q: queryPramsQ, page: queryPramsPage, limit: queryPramsLimit },
    {
      selectFromResult: ({ data, isSuccess, status, error }) => ({
        data,
        isSuccess,
        status: 'status' in (error || {}) ? (error as FetchBaseQueryError).status : status, // Extract HTTP status code
        error,
      }),
    },
  );

  const handleSearch = (query: string) => {
    if (query !== hashSearchText) {
      setHashSearchText(query);
      setQueryPramsPage(1);
      setQueryPramsQ(query);
    }
  };

  const modals = [
    AddFilename8,
    ViewFilename8,
    BulkDeleteFilename8,
    BulkEditFilename8,
    EditFilename8,
    DeleteFilename8,
    BulkUpdateUsers_1_000___,
    BulkDynamicUpdateUsers_1_000___,
  ];
  const router = useRouter();

  let renderUI = (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold w-full">
          User_3_000___ Management {isSuccess && <sup className="text-xs">(total:{getResponseData?.data?.total || '00'})</sup>}
        </h1>
        <div className="w-full flex gap-2 item-center justify-end">
          <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => router.push('/dashboard/users_2_000___/ssr-view')}>
            <BiRightArrowAlt className="w-4 h-4" />
            SSR View
          </Button>
          <Button
            className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
            onClick={() => router.push('/dashboard/users_2_000___/client-view')}
          >
            <BiRightArrowAlt className="w-4 h-4" />
            Client View
          </Button>
          <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(true)}>
            <PlusIcon className="w-4 h-4" />
            Add User_3_000___
          </Button>
        </div>
      </div>
      <SearchBox onSearch={handleSearch} placeholder="Search here ..." autoFocus={false} />
      <ViewUsers_1_000___Table />
      {modals.map((ModalComponent, index) => (
        <ModalComponent key={index} />
      ))}
    </div>
  );

  if (statusCode === 429) {
    renderUI = <TooManyRequests />;
  }

  return renderUI;
};

export default MainNextPage;
