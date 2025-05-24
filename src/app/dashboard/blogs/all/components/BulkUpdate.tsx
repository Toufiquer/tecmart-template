import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useBlogsStore } from '../store/Store';
import { blogsSelectorArr } from '../store/StoreConstants';
import { IBlogs } from '../api/v1/Model';
import { useBulkUpdateBlogsMutation } from '../redux/rtk-Api';

const BulkUpdateNextComponents: React.FC = () => {
  const { toggleBulkUpdateModal, isBulkUpdateModalOpen, bulkData, setBulkData } = useBlogsStore();
  const [bulkUpdateBlogs, { isLoading }] = useBulkUpdateBlogsMutation();

  const handleBulkEditBlogs = async () => {
    if (!bulkData.length) return;
    try {
      const newBulkData = bulkData.map(({ _id, ...rest }) => ({ id: _id, updateData: rest }));
      await bulkUpdateBlogs(newBulkData).unwrap();
      toggleBulkUpdateModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit blogs:', error);
    }
  };

  const handleRoleChangeForAll = (role: string) => {
    setBulkData(bulkData.map(Blogs => ({ ...Blogs, role })) as IBlogs[]);
  };

  return (
    <Dialog open={isBulkUpdateModalOpen} onOpenChange={toggleBulkUpdateModal}>
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
              <p>Update all data as</p>
              <Select onValueChange={role => handleRoleChangeForAll(role)} defaultValue={(blogsSelectorArr[0] as string) || ''}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-50">
                  {blogsSelectorArr?.map((role, index) => (
                    <SelectItem key={role + index} value={role} className="cursor-pointer hover:bg-slate-200">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {bulkData.map((Blogs, idx) => (
              <div key={(Blogs._id as string) || idx} className="flex items-center justify-between">
                <span>
                  {idx + 1}. {(Blogs.name as string) || ''}
                </span>
                <span>{Blogs.role as string}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => toggleBulkUpdateModal(false)} className="cursor-pointer border-slate-400 hover:border-slate-500">
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

export default BulkUpdateNextComponents;
