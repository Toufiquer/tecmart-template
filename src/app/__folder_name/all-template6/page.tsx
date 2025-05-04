'use client';

import React from 'react';

import GridView from './GridView';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const View_1_template_Table: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col py-12">
      <div className="w-full flex items-center justify-center">
        <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => router.push('/template6')}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
      <GridView />
      <div className="py-12 my-12" />
    </div>
  );
};

export default View_1_template_Table;
