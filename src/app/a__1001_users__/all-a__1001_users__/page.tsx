'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import GridView from './GridView';

const ViewUsers_101__Table: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col py-12">
      <div className="w-full flex items-center justify-center">
        <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => router.push('/a__1001_rtk_template__')}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
      <GridView />
      <div className="py-12 my-12" />
    </div>
  );
};

export default ViewUsers_101__Table;
