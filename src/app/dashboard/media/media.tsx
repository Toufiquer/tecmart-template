'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';

const Media = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imgFile, setImgFiles] = useState<{ delete_url: string; url: string; display_url: string; id: string }[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string>('');

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/media');
      const data = await response.json();
      setImgFiles(data.data.filter((i: { delete_url: string; url: string; display_url: string; status: string }) => i.status === 'active'));
      setImages(
        data.data
          .filter((i: { delete_url: string; url: string; display_url: string; status: string }) => i.status === 'active')
          .map((item: { delete_url: string; url: string; display_url: string }) => item.display_url),
      );
    };
    fetchImages();
  }, []);

  const handleViewImage = async (url: string) => {
    try {
      window.open(url, '_blank');
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
        // mode: 'no-cors',
        // headers: {
        //   'Content-Type': 'application/image',
        // },
      });

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
          throw new Error('Error! Cannot save the image.');
        }

        setImages(prev => [data.data.url, ...prev]);
        setImgFiles(prev => [data.data, ...prev]);
        toast.success('Image uploaded successfully!');
        setShowUploadModal(false);
      } else {
        toast.error('Error! Cannot upload the image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error! Cannot upload the image');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToTrash = async (id: string) => {
    try {
      const response = await fetch(`/api/media`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ id, status: 'trash' }),
      });

      if (response.ok) {
        // Remove the image from the state
        setImgFiles(prev => prev.filter(img => img.id !== id));
        setImages(prev => prev.filter((_, index) => imgFile[index].id !== id));
        toast.success('Successfully moved to trash');
      } else {
        toast.error('Error! Cannot move image to trash');
      }
    } catch (error) {
      console.error('Error moving to trash:', error);
      toast.error('Error! Cannot move image to trash');
    }
    setShowTrashModal(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold w-full">Gallery</h1>
        <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => setShowUploadModal(true)}>
          Upload
        </Button>
      </div>

      {showTrashModal && (
        <div className="fixed inset-0 backdrop-blur-sm min-h-screen bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm</h3>
            <p>Are you sure?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" variant="outline" onClick={() => setShowTrashModal(false)}>
                No
              </Button>
              <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => handleMoveToTrash(selectedImageId)}>
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      {showUploadModal ? (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Upload</h3>
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} />
            {loading && <p className="mt-2">Uploading...</p>}
            <div className="flex justify-end gap-2 mt-4">
              <Button className="cursor-pointer" variant="outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-full">
              <p className="min-h-48 border w-full flex items-center justify-center rounded-lg mt-4">No images found</p>
            </div>
          ) : (
            images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="w-full flex flex-col">
                  <Image src={imageUrl} alt={`Image ${index + 1}`} width={300} height={192} className="w-full h-48 object-cover rounded-lg" />
                  <div className="w-full grid grid-cols-2 items-center justify-between mt-1 gap-2">
                    <Button
                      className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
                      onClick={() => {
                        setSelectedImageId(imgFile[index].id);
                        setShowTrashModal(true);
                      }}
                    >
                      Move to trash
                    </Button>
                    <Button className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => handleViewImage(imgFile[index].url)}>
                      View
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
