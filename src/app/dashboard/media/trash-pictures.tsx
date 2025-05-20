'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';

const Media = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imgFile, setImgFiles] = useState<
    { delete_url: string; url: string; display_url: string; id: string }[]
  >([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string>('');

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/media');
      const data = await response.json();
      setImgFiles(
        data.data.filter(
          (i: { delete_url: string; url: string; display_url: string; status: string }) =>
            i.status === 'trash',
        ),
      );
      setImages(
        data.data
          .filter(
            (i: { delete_url: string; url: string; display_url: string; status: string }) =>
              i.status === 'trash',
          )
          .map(
            (item: { delete_url: string; url: string; display_url: string }) => item.display_url,
          ),
      );
    };
    fetchImages();
  }, []);

  const handleDeleteImage = async (id: string, url: string, delete_url: string) => {
    try {
      const response = await fetch(`/api/media`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success('ছবি সফলভাবে ডিলিট করা হয়েছে!');
        const othersImagesFiles = imgFile.filter(img => img.id !== id);
        setImgFiles(othersImagesFiles);
        const othersImages = images.filter(img => img !== url);
        setImages(othersImages);

        //!  Remove the image from the state
        setImgFiles(prev => prev.filter(img => img.id !== id));
        setImages(prev => prev.filter((_, index) => imgFile[index].id !== id));

        // ! now it will delete image from the imagebb server
        window.open(delete_url, '_blank');
      } else {
        toast.error('ছবি ডিলিট করতে সমস্যা হয়েছে!');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('ছবি ডিলিট করতে সমস্যা হয়েছে!');
    }
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      if (data.success) {

        // Save image data to our server
        const saveResponse = await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            delete_url: data.data.delete_url,
            url: data.data.url,
            display_url: data.data.display_url,
          }),
        });

        if (!saveResponse.ok) {
          throw new Error('সার্ভারে ছবি সেভ করতে সমস্যা হয়েছে');
        }

        setImages(prev => [...prev, data.data.url]);
        setImgFiles(prev => [...prev, data.data]);
        toast.success('ছবি সফলভাবে আপলোড হয়েছে!');
        setShowUploadModal(false);
      } else {
        toast.error('ছবি আপলোড করতে সমস্যা হয়েছে!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('ছবি আপলোড করতে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (id: string) => {
    try {
      const response = await fetch(`/api/media`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ id, status: 'active' }),
      });

      if (response.ok) {
        // Remove the image from the state
        setImgFiles(prev => prev.filter(img => img.id !== id));
        setImages(prev => prev.filter((_, index) => imgFile[index].id !== id));
        toast.success('ছবিটি ট্র্যাশে সরানো হয়েছে!');
      } else {
        toast.error('ছবি ট্র্যাশে সরাতে সমস্যা হয়েছে!');
      }
    } catch (error) {
      console.error('Error moving to active:', error);
      toast.error('ছবি ট্র্যাশে সরাতে সমস্যা হয়েছে!');
    }
    setShowTrashModal(false);
  };
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ইমেজ গ্যালারি</h2>
      </div>

      {showTrashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">নিশ্চিত করুন</h3>
            <p>Are you sure?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="text-sm cursor-pointer bg-green-400 text-white border-green-500 hover:bg-green-600 hover:text-white hover:border-red-600 transition-all duration-300"
                variant="outline"
                onClick={() => setShowTrashModal(false)}
              >
                না
              </Button>
              <Button
                variant="destructive"
                className="text-sm cursor-pointer bg-rose-400 text-white border-rose-500 hover:bg-rose-600 hover:text-white hover:border-red-600 transition-all duration-300"
                onClick={() => handleRecover(selectedImageId)}
              >
                হ্যাঁ
              </Button>
            </div>
          </div>
        </div>
      )}

      {showUploadModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">ছবি আপলোড করুন</h3>
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} />
            {loading && <p className="text-blue-500 mt-2">আপলোড হচ্ছে...</p>}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setShowUploadModal(false)}
              >
                বাতিল
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-full">
              <p className="text-gray-500 min-h-48 border w-full flex items-center justify-center rounded-lg mt-4">
                কোনো ছবি নেই
              </p>
            </div>
          ) : (
            images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="w-full flex flex-col">
                  <Image
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="w-full grid grid-cols-2 items-center justify-between mt-2 gap-2">
                    <Button
                      variant="destructive"
                      className="text-sm w-full cursor-pointer bg-rose-400 text-white border-rose-500 hover:bg-rose-600 hover:text-white hover:border-red-600 transition-all duration-300"
                      onClick={() => {
                        setSelectedImageId(imgFile[index].id);
                        setShowTrashModal(true);
                      }}
                    >
                      Recovery
                    </Button>
                    <Button
                      variant="outline"
                      className="text-sm w-full cursor-pointer bg-rose-400 text-white border-rose-500 hover:bg-rose-600 hover:text-white hover:border-red-600 transition-all duration-300"
                      onClick={() =>
                        handleDeleteImage(
                          imgFile[index].id,
                          imgFile[index].url,
                          imgFile[index].delete_url,
                        )
                      }
                    >
                      delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Media;
