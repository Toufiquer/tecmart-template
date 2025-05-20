/*
|-----------------------------------------
| setting up ImageDialog for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageDialog = ({ handleAddImages }: { handleAddImages: (newImage: string) => void }) => {
  const [allImages, setAllImages] = useState<string[]>([]);
  const [selectImg, setSelectImg] = useState('');
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/media');
      const data = await response.json();

      const lstImage: string[] = data?.data.map((i: { url: string }) => i.url);
      setAllImages(lstImage);
    };
    fetchImages();
  }, []);
  const handleSelect = (id: string) => {
    if (selectImg === id) {
      setSelectImg('');
    } else {
      handleAddImages(id);
      setSelectImg(id);
    }
  };
  return (
    <ScrollArea className="w-full h-[60vh] p-1 pr-2 border-1 border-slate-500">
      <main className="w-full min-h-[60vh] ">
        {allImages.length > 0 ? (
          <div className="w-full flex flex-wrap gap-1">
            {allImages.map((i, index) => (
              <div
                onClick={() => handleSelect(i)}
                key={index + i}
                className={`relative w-[150px] h-[150px] border-1 border-slate-400 rounded-lg flex items-center justify-center ${i === selectImg && ' opacity-50 '}`}
              >
                <Image src={i} fill alt="Media" objectFit="cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full items-center justify-center mt-3">
            <p>Ops! there is no Image</p>
          </div>
        )}
      </main>
    </ScrollArea>
  );
};
export default ImageDialog;
