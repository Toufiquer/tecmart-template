import React, { useEffect } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useBlogsStore } from '../store/Store';
import { baseIBlogs } from '../store/StoreConstants';
import { useGetBlogsByIdQuery } from '../redux/rtk-Api';
import { IBlogs } from '../api/v1/Model';
import Image from 'next/image';
import { ViewRichText } from './view-rich-text/ViewRichText';

const ViewNextComponents: React.FC = () => {
  const { isViewModalOpen, selectedBlogs, toggleViewModal, setSelectedBlogs } = useBlogsStore();
  const { data: BlogsData, refetch } = useGetBlogsByIdQuery(selectedBlogs?._id, { skip: !selectedBlogs?._id });

  useEffect(() => {
    if (selectedBlogs?._id) {
      refetch(); // Fetch the latest Blogs data
    }
  }, [selectedBlogs?._id, refetch]);

  useEffect(() => {
    if (BlogsData?.data) {
      setSelectedBlogs(BlogsData.data); // Update selectedBlogs with the latest data
    }
  }, [BlogsData, setSelectedBlogs]);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="grid grid-cols-3 gap-2">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || 'N/A'}</div>
    </div>
  );
  const DetailRowArray = ({ label, values }: { label: string; values: string[] }) => (
    <div className="grid grid-cols-3 gap-2">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{values?.join(', ')}</div>
    </div>
  );

  return (
    <Dialog open={isViewModalOpen} onOpenChange={toggleViewModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Blogs Details</DialogTitle>
        </DialogHeader>
        {selectedBlogs && (
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="w-full flex flex-col">
              <div className="grid gap-2">
                <DetailRow label="Name" value={selectedBlogs.name as string} />
                <DetailRow label="Email" value={selectedBlogs.email as string} />
                <DetailRow label="Pass Code" value={selectedBlogs.passCode as string} />
                <DetailRow label="Alias" value={selectedBlogs.alias as string} />
                <DetailRow
                  label="Role"
                  value={
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedBlogs.role === 'admin'
                          ? 'bg-amber-100 text-amber-700'
                          : selectedBlogs.role === 'moderator'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {selectedBlogs.role as string}
                    </span>
                  }
                />
                <DetailRowArray label="Data Array" values={selectedBlogs.dataArr as string[]} />
                <DetailRow label="Created At" value={formatDate(selectedBlogs.createdAt)} />
                <DetailRow label="Updated At" value={formatDate(selectedBlogs.updatedAt)} />
              </div>
              <div className="w-full flex items-center justify-center mt-2 min-h-[10vh]">
                {Array.isArray(selectedBlogs.images) && selectedBlogs.images?.length > 0 ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1">
                    {selectedBlogs.images.map((i, index) => (
                      <div
                        key={index + i}
                        className={`relative w-full h-[150px] border-1 border-slate-300 shadow-xl hover:shadow-2xl cursor-pointer hover:border-slate-600 flex items-center justify-center rounded-lg overflow-hidden`}
                      >
                        <Image src={i} fill alt="Media" objectFit="cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col w-full items-center justify-center">
                    <p>Ops! there is no Image</p>
                  </div>
                )}
              </div>
              <div className="w-full m-2" />
              <ViewRichText data={selectedBlogs.descriptions || ''} />
            </div>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            onClick={() => {
              toggleViewModal(false);
              setSelectedBlogs({ ...baseIBlogs } as IBlogs);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewNextComponents;
