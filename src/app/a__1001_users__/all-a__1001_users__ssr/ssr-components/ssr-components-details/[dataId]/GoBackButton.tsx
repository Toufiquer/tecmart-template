/*
|-----------------------------------------
| setting up GoBackButton for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const GoBackButton = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center">
      <Button
        className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
        onClick={() => router.push('/a__1001_users__/all-a__1001_users__ssr')}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </div>
  );
};
export default GoBackButton;
