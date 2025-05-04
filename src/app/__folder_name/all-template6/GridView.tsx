'use client';

import React, { useState, useMemo } from 'react';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Error';
import { useGet_1_template_Query } from '@/redux/features/template6/filename7Api';
import Pagination from '@/app/template6/components/Pagination';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { pageLimitArr } from '@/app/template6/store/filename7StoreConstants';
import _3_template_CardGrid from '@/app/template6/all-template6/Filename8CardGrid';

const GridView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageLimitArr[0]);

  const { data: getResponseData, isLoading, isError, error } = useGet_1_template_Query({ page, limit });
  const getAll_1_template_Data = useMemo(() => getResponseData?.data?._2_template_ || [], [getResponseData]);

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorMessageComponent message={error || 'An error occurred'} />;
  if (getAll_1_template_Data.length === 0) return <div className="py-12 text-2xl text-slate-500">Ops! Nothing was found.</div>;
  const renderData = getAll_1_template_Data?.map((i: I_3_template_) => ({ ...i, img: 'https://i.ibb.co/CWZW1bs/banner-deal.jpg' }));
  return (
    <div className="w-full flex flex-col">
      <div className="min-h-screen bg-gray-50">
        <_3_template_CardGrid _2_template_={renderData} />
      </div>
      <Pagination currentPage={page} itemsPerPage={limit} onPageChange={setPage} totalItems={getResponseData?.data?.total} />
      <div className="max-w-[380px] flex items-center justify-between pl-2 gap-4 border-1 border-slate-200 rounded-xl w-full mx-auto mt-8">
        <Label htmlFor="set-limit" className="text-right text-slate-500 font-thin pl-2">
          _3_template_ per page
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
