'use client';

import React, { useState, useMemo } from 'react';

import { Label } from '@/components/ui/label';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useGetUsers_101__Query } from '../redux/rtk-Api';
import Pagination from '../components/Pagination';
import { pageLimitArr } from '../store/StoreConstants';
import __103_Users__CardGrid from '../all-a__1001_users__/CardGrid';
import { IUsers_101__ } from '../api/v1/Model';

const GridView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageLimitArr[0]);

  const { data: getResponseData, isLoading, isError, error } = useGetUsers_101__Query({ page, limit });
  const getAllUsers_101__Data = useMemo(() => getResponseData?.data?.users_102__ || [], [getResponseData]);

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorMessageComponent message={error || 'An error occurred'} />;
  if (getAllUsers_101__Data.length === 0) return <div className="py-12 text-2xl text-slate-500">Ops! Nothing was found.</div>;
  const renderData = getAllUsers_101__Data?.map((i: IUsers_101__) => ({ ...i, img: 'https://i.ibb.co/CWZW1bs/banner-deal.jpg' }));
  return (
    <div className="w-full flex flex-col">
      <div className="min-h-screen bg-gray-50">
        <__103_Users__CardGrid users_102__={renderData} />
      </div>
      <Pagination currentPage={page} itemsPerPage={limit} onPageChange={setPage} totalItems={getResponseData?.data?.total} />
      <div className="max-w-[380px] flex items-center justify-between pl-2 gap-4 border-1 border-slate-200 rounded-xl w-full mx-auto mt-8">
        <Label htmlFor="set-limit" className="text-right text-slate-500 font-thin pl-2">
          __103_Users__ per page
        </Label>
        <Select
          onValueChange={value => {
            setLimit(Number(value));
            setPage(1);
          }}
          defaultValue={limit.toString()}
        >
          <SelectTrigger className="col-span-4">
            <SelectValue placeholder="Select a limit" />
          </SelectTrigger>
          <SelectContent>
            {pageLimitArr.map(i => (
              <SelectItem key={i} value={i.toString()} className="cursor-pointer hover:bg-slate-200">
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GridView;
