'use client';

import React, { useState } from 'react';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { use__103_Users__Store } from './store/Store';
import { useGetUsers_101__Query } from './redux/rtk-Api';

import AddFilename8 from './components/Add';
import EditFilename8 from './components/Edit';
import ViewFilename8 from './components/View';
import TooManyRequests from './components/TooManyRequest';
import DeleteFilename8 from './components/Delete';
import BulkEditFilename8 from './components/BulkEdit';
import BulkDeleteFilename8 from './components/BulkDelete';
import ViewUsers_101__Table from './components/ViewTable';
import SearchBox from './components/SearchBox';

const Filename8Table: React.FC = () => {
  const [hashSearchText, setHashSearchText] = useState('');
  const { toggleAddModal, queryPramsLimit, queryPramsPage, queryPramsQ, setQueryPramsPage, setQueryPramsQ } = use__103_Users__Store();
  const router = useRouter();

  // Add state for search query, page, and limit
  // const [searchParams, setSearchParams] = useState({
  //   q: '',
  //   page: 1,
  //   limit: 10,
  // });

  const {
    data: getResponseData,
    isSuccess,
    status: statusCode,
  } = useGetUsers_101__Query(
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
      console.log('Searching for:', query);
      setQueryPramsPage(1);
      setQueryPramsQ(query);
    }
  };

  const modals = [AddFilename8, ViewFilename8, BulkDeleteFilename8, BulkEditFilename8, EditFilename8, DeleteFilename8];

  let renderUI = (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold w-full">
          User_103__ Management {isSuccess && <sup className="text-xs">(total:{getResponseData?.data?.total || '00'})</sup>}
        </h1>
        <div className="w-full flex gap-2 item-center justify-end">
          <Button
            className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
            onClick={() => router.push('/a__1001_users__/all-a__1001_users__ssr')}
          >
            View SSR
            <ArrowRightIcon className="w-4 h-4 mr-2" />
          </Button>
          <Button
            className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
            onClick={() => router.push('/a__1001_users__/all-a__1001_users__')}
          >
            View Grid
            <ArrowRightIcon className="w-4 h-4 mr-2" />
          </Button>
          <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add User_103__
          </Button>
        </div>
      </div>
      <SearchBox onSearch={handleSearch} placeholder="Search here ..." autoFocus={false} />
      <ViewUsers_101__Table />
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

export default Filename8Table;
