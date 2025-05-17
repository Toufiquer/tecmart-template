'use client';

import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Error';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import Pagination from './Pagination';
import { IUsers__1_101__ } from '../api/v1/Model';
import { useGetUsers__1_101__Query } from '../redux/rtk-Api';
import { use__103_Users__Store } from '../store/Store';
import { pageLimitArr } from '../store/StoreConstants';

const ViewUsers__1_101__Table: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof IUsers__1_101__; direction: 'asc' | 'desc' } | null>(null);
  const {
    setSelected__103_Users__,
    toggleBulkEditModal,
    toggleViewModal,
    queryPramsLimit,
    queryPramsPage,
    queryPramsQ,
    toggleEditModal,
    toggleDeleteModal,
    bulkData,
    setBulkData,
    setQueryPramsLimit,
    setQueryPramsPage,
    toggleBulkDeleteModal,
  } = use__103_Users__Store();

  const {
    data: getResponseData,
    isLoading,
    isError,
    error,
  } = useGetUsers__1_101__Query(
    { q: queryPramsQ, limit: queryPramsLimit, page: queryPramsPage },
    {
      selectFromResult: ({ data, isError, error, isLoading }) => ({
        data,
        isLoading,
        isError,
        error,
      }),
    },
  );

  const getAllUsers__1_101__Data = useMemo(() => getResponseData?.data?.users__1_102__ || [], [getResponseData]);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const handleSort = (key: keyof IUsers__1_101__) => {
    setSortConfig(prev => (prev?.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }));
  };

  const sortedUsers__1_101__Data = useMemo(() => {
    if (!sortConfig) return getAllUsers__1_101__Data;
    return [...getAllUsers__1_101__Data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [getAllUsers__1_101__Data, sortConfig]);

  const handleSelectAll = (isChecked: boolean) => setBulkData(isChecked ? getAllUsers__1_101__Data : []);
  const handleSelectRow = (isChecked: boolean, __104_Users__: IUsers__1_101__) =>
    setBulkData(isChecked ? [...bulkData, __104_Users__] : bulkData.filter(item => item.email !== __104_Users__.email));

  const renderActions = (__104_Users__: IUsers__1_101__) => (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        className="cursor-pointer "
        variant="outline"
        size="sm"
        onClick={() => {
          setSelected__103_Users__(__104_Users__);
          toggleViewModal(true);
        }}
      >
        <EyeIcon className="w-4 h-4 mr-1" /> View
      </Button>
      <Button
        className="cursor-pointer "
        variant="outline"
        size="sm"
        onClick={() => {
          setSelected__103_Users__(__104_Users__);
          toggleEditModal(true);
        }}
      >
        <PencilIcon className="w-4 h-4 mr-1" /> Edit
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-rose-400 hover:text-rose-500 cursor-pointer "
        onClick={() => {
          setSelected__103_Users__(__104_Users__);
          toggleDeleteModal(true);
        }}
      >
        <TrashIcon className="w-4 h-4 mr-1" /> Delete
      </Button>
    </div>
  );
  const renderTableRows = () =>
    sortedUsers__1_101__Data.map((__104_Users__: IUsers__1_101__, index: number) => (
      <TableRow key={(__104_Users__.email as string) || index}>
        <TableCell>
          <Checkbox
            onCheckedChange={checked => handleSelectRow(!!checked, __104_Users__)}
            checked={bulkData.some(item => item.email === __104_Users__.email)}
          />
        </TableCell>
        <TableCell className="font-medium">{(__104_Users__.name as string) || ''}</TableCell>
        <TableCell className="hidden md:table-cell">{(__104_Users__.email as string) || ''}</TableCell>
        <TableCell className="hidden lg:table-cell">{(__104_Users__.passCode as string) || ''}</TableCell>
        <TableCell className="hidden md:table-cell">{(__104_Users__.alias as string) || ''}</TableCell>
        <TableCell>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${__104_Users__.role === 'admin' ? 'bg-amber-100 text-amber-700' : __104_Users__.role === 'moderator' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
          >
            {(__104_Users__.role as string) || ''}
          </span>
        </TableCell>
        <TableCell className="hidden lg:table-cell">{formatDate(__104_Users__.createdAt)}</TableCell>
        <TableCell className="justify-end flex">{renderActions(__104_Users__)}</TableCell>
      </TableRow>
    ));

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorMessageComponent message={error || 'An error occurred'} />;
  if (getAllUsers__1_101__Data.length === 0) return <div className="py-12 text-2xl text-slate-500">Ops! Nothing was found.</div>;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full my-4">
        <div className="w-full flex items-center justify-between gap-4 pb-2 border-b-1 border-slat-400">
          <div className="px-2 gap-2 flex items-center justify-start w-full">
            Total Selected <span className="text-xs text-slate-500">({bulkData.length})</span>
          </div>
          <div className="px-2 gap-2 flex items-center justify-end w-full">
            <Button className="cursor-pointer " variant="outline" size="sm" onClick={() => toggleBulkEditModal(true)} disabled={bulkData.length === 0}>
              <PencilIcon className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-rose-400 hover:text-rose-500 cursor-pointer "
              onClick={() => toggleBulkDeleteModal(true)}
              disabled={bulkData.length === 0}
            >
              <TrashIcon className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      </div>
      <Table className="border-1 border-slate-500">
        <TableHeader className="bg-slate-600 text-slate-50 rounded overflow-hidden border-1 border-slate-600">
          <TableRow>
            <TableHead>
              <Checkbox onCheckedChange={checked => handleSelectAll(!!checked)} checked={bulkData.length === getAllUsers__1_101__Data.length} />
            </TableHead>
            {['name', 'email', 'passCode', 'alias', 'role', 'createdAt'].map(key => (
              <TableHead
                key={key}
                className={`font-bold text-slate-50 cursor-pointer ${key === 'email' || key === 'alias' ? 'hidden md:table-cell' : ''} ${key === 'passCode' || key === 'createdAt' ? 'hidden lg:table-cell' : ''}`}
                onClick={() => handleSort(key as keyof IUsers__1_101__)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} {sortConfig?.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
            ))}
            <TableHead className="hidden lg:table-cell font-bold text-slate-50 text-end pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
      <Pagination
        currentPage={queryPramsPage}
        itemsPerPage={queryPramsLimit}
        onPageChange={e => setQueryPramsPage(e)}
        totalItems={getResponseData?.data?.total}
      />
      <div className="max-w-[380px] flex items-center justify-between pl-2 gap-4 border-1 border-slate-200 rounded-xl w-full mx-auto mt-8">
        <Label htmlFor="set-limit" className="text-right text-slate-500 font-thin pl-2">
          __103_Users__ per page
        </Label>
        <Select
          onValueChange={value => {
            setQueryPramsLimit(Number(value));
            setQueryPramsPage(1);
          }}
          defaultValue={queryPramsLimit.toString()}
        >
          <SelectTrigger className="col-span-4">
            <SelectValue placeholder="Select a limit" />
          </SelectTrigger>
          <SelectContent className="bg-slate-50">
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

export default ViewUsers__1_101__Table;
