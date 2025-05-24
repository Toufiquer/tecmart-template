import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useBlogsStore } from '../store/Store';
import { useBulkUpdateBlogsMutation } from '../redux/rtk-Api';
import DynamicDataSelect from './DynamicDataSelect';

const BulkDynamicUpdateNextComponents: React.FC = () => {
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const { toggleBulkDynamicUpdateModal, isBulkDynamicUpdateModal, bulkData, setBulkData } = useBlogsStore();
  const [bulkUpdateBlogs, { isLoading }] = useBulkUpdateBlogsMutation();

  const handleBulkEditBlogs = async () => {
    if (!bulkData.length) return;
    try {
      const newBulkData = bulkData.map(({ _id, ...rest }) => ({ id: _id, updateData: { ...rest, dataArr: newItemTags } }));

      await bulkUpdateBlogs(newBulkData).unwrap();
      toggleBulkDynamicUpdateModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit blogs:', error);
    }
  };

  return (
    <Dialog open={isBulkDynamicUpdateModal} onOpenChange={toggleBulkDynamicUpdateModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Update</DialogTitle>
        </DialogHeader>
        {bulkData.length > 0 && (
          <div>
            <p className="pt-2">
              You are about to update <span className="font-semibold">({bulkData.length})</span> blogs
            </p>
            <div className="w-full flex items-center justify-between pt-2">
              <DynamicDataSelect label="Update all data as" newItemTags={newItemTags as string[]} setNewItemTags={setNewItemTags} />
            </div>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {bulkData.map((Blogs, idx) => (
              <div key={(Blogs._id as string) || idx} className="flex items-start mb-2 justify-between flex-col">
                <div className="flex flex-col">
                  <span>
                    {idx + 1}. {(Blogs.name as string) || ''}
                  </span>
                  {/* <span className="text-xs mt-0">{Array.isArray(Blogs.dataArr) ? Blogs.dataArr.join(', ') : ''}</span> */}
                  <span className="text-xs mt-0">{newItemTags.join(', ') || ''}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => toggleBulkDynamicUpdateModal(false)} className="cursor-pointer border-slate-400 hover:border-slate-500">
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={handleBulkEditBlogs}
            className="cursor-pointer border-green-400 hover:border-green-500 text-green-500"
          >
            Update Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDynamicUpdateNextComponents;
