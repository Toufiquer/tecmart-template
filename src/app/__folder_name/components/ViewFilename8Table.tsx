'use client';

import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Error';
import { useGet_1_template_Query } from '@/redux/features/template6/filename7Api';
import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import Pagination from '@/app/template6/components/Pagination';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { pageLimitArr } from '@/app/template6/store/filename7StoreConstants';

const View_1_template_Table: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageLimitArr[0]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof I_3_template_; direction: 'asc' | 'desc' } | null>(null);
  const { setSelected_3_template_, toggleBulkEditModal, toggleViewModal, toggleEditModal, toggleDeleteModal, bulkData, setBulkData, toggleBulkDeleteModal } =
    use_3_template_Store();

  const { data: getResponseData, isLoading, isError, error } = useGet_1_template_Query({ page, limit });
  const getAll_1_template_Data = useMemo(() => getResponseData?.data?._2_template_ || [], [getResponseData]);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const handleSort = (key: keyof I_3_template_) => {
    setSortConfig(prev => (prev?.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }));
  };

  const sorted_1_template_Data = useMemo(() => {
    if (!sortConfig) return getAll_1_template_Data;
    return [...getAll_1_template_Data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [getAll_1_template_Data, sortConfig]);

  const handleSelectAll = (isChecked: boolean) => setBulkData(isChecked ? getAll_1_template_Data : []);
  const handleSelectRow = (isChecked: boolean, _4_template_: I_3_template_) =>
    setBulkData(isChecked ? [...bulkData, _4_template_] : bulkData.filter(item => item.email !== _4_template_.email));

  const renderActions = (_4_template_: I_3_template_) => (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        className="cursor-pointer "
        variant="outline"
        size="sm"
        onClick={() => {
          setSelected_3_template_(_4_template_);
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
          setSelected_3_template_(_4_template_);
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
          setSelected_3_template_(_4_template_);
          toggleDeleteModal(true);
        }}
      >
        <TrashIcon className="w-4 h-4 mr-1" /> Delete
      </Button>
    </div>
  );
  const renderTableRows = () =>
    sorted_1_template_Data.map((_4_template_: I_3_template_, index: number) => (
      <TableRow key={(_4_template_.email as string) || index}>
        <TableCell>
          <Checkbox onCheckedChange={checked => handleSelectRow(!!checked, _4_template_)} checked={bulkData.some(item => item.email === _4_template_.email)} />
        </TableCell>
        <TableCell className="font-medium">{(_4_template_.name as string) || ''}</TableCell>
        <TableCell className="hidden md:table-cell">{(_4_template_.email as string) || ''}</TableCell>
        <TableCell className="hidden lg:table-cell">{(_4_template_.passCode as string) || ''}</TableCell>
        <TableCell className="hidden md:table-cell">{(_4_template_.alias as string) || ''}</TableCell>
        <TableCell>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${_4_template_.role === 'admin' ? 'bg-amber-100 text-amber-700' : _4_template_.role === 'moderator' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
          >
            {(_4_template_.role as string) || ''}
          </span>
        </TableCell>
        <TableCell className="hidden lg:table-cell">{formatDate(_4_template_.createdAt)}</TableCell>
        <TableCell className="justify-end flex">{renderActions(_4_template_)}</TableCell>
      </TableRow>
    ));

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorMessageComponent message={error || 'An error occurred'} />;
  if (getAll_1_template_Data.length === 0) return <div className="py-12 text-2xl text-slate-500">Ops! Nothing was found.</div>;

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
              <Checkbox onCheckedChange={checked => handleSelectAll(!!checked)} checked={bulkData.length === getAll_1_template_Data.length} />
            </TableHead>
            {['name', 'email', 'passCode', 'alias', 'role', 'createdAt'].map(key => (
              <TableHead
                key={key}
                className={`font-bold text-slate-50 cursor-pointer ${key === 'email' || key === 'alias' ? 'hidden md:table-cell' : ''} ${key === 'passCode' || key === 'createdAt' ? 'hidden lg:table-cell' : ''}`}
                onClick={() => handleSort(key as keyof I_3_template_)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} {sortConfig?.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
            ))}
            <TableHead className="hidden lg:table-cell font-bold text-slate-50 text-end pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
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

export default View_1_template_Table;
