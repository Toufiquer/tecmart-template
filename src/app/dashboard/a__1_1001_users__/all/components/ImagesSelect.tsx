/* 
|----------------------------------------- 
| MultiSelect Demo Page
| @author: Toufiquer Rahman<toufiquer.0@gmail.com> 
| @copyright: tecmart-template, May, 2025 
|----------------------------------------- 
*/

'use client';

import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';

interface ImagesSelectProps {
  newImages: string[];
  setNewImages: (payload: string[]) => void;
}

export default function ImagesSelect({ newImages, setNewImages }: ImagesSelectProps) {
  const handleAddImages = () => {
    const existImages = newImages;
    setNewImages([...existImages, 'the new one']);
  };
  const UploadButton = () => {
    return (
      <Button onClick={handleAddImages} className="border-slate-500 text-slate-600 hover:border-slate-600 border-1 cursor-pointer" size="sm">
        Upload
      </Button>
    );
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <h2>Images</h2>
        <UploadButton />
      </div>
      <div className="w-full border-1 min-h-[100px] border-slate-500 rounded-lg flex items-start justify-start p-2">
        {newImages.length > 0 ? (
          <div className="w-full flex flex-wrap gap-1">
            {newImages.map((i, index) => (
              <div key={index + i} className="w-[50px] h-[50px] border-1 border-slate-400 rounded-lg flex items-center justify-center">
                {index + 1}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full items-center justify-center mt-3">
            <p>Ops! there is no Image</p>
            <UploadButton />
          </div>
        )}
      </div>
    </div>
  );
}
