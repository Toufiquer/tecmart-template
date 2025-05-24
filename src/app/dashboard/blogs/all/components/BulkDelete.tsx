import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useBlogsStore } from '../store/Store';
import { useBulkDeleteBlogsMutation } from '../redux/rtk-Api';

const BulkDeleteNextComponents: React.FC = () => {
  const { isBulkDeleteModalOpen, toggleBulkDeleteModal, bulkData, setBulkData } = useBlogsStore();
  const [bulkDeleteBlogs, { isLoading }] = useBulkDeleteBlogsMutation();

  const handleBulkDeleteNextComponents = async () => {
    if (!bulkData?.length) return;
    try {
      const ids = bulkData.map(Blogs => Blogs._id);
      await bulkDeleteBlogs({ ids }).unwrap();
      toggleBulkDeleteModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to delete Blogs:', error);
    }
  };

  return (
    <Dialog open={isBulkDeleteModalOpen} onOpenChange={toggleBulkDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {bulkData?.length > 0 && (
          <div className="pt-4">
            <p>
              You are about to delete <span className="font-semibold">({bulkData.length})</span> blogs
            </p>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col">
            {bulkData.map((Blogs, idx) => (
              <span key={(Blogs._id as string) + idx} className="text-xs">
                {idx + 1}. {(Blogs.name as string) || ''}
              </span>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={() => toggleBulkDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            className="cursor-pointer text-rose-500 border-rose-400 hover:border-rose-500"
            onClick={handleBulkDeleteNextComponents}
          >
            Delete Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDeleteNextComponents;
