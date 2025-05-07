import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { use__103_Users__Store } from '../store/Store';
import { useBulkDeleteUsers_101__Mutation } from '../redux/rtk-Api';

const BulkDelete__103_Users__: React.FC = () => {
  const { isBulkDeleteModalOpen, toggleBulkDeleteModal, bulkData, setBulkData } = use__103_Users__Store();
  const [bulkDeleteUsers_101__, { isLoading }] = useBulkDeleteUsers_101__Mutation();

  const handleBulkDelete__103_Users__ = async () => {
    if (!bulkData?.length) return;
    try {
      const ids = bulkData.map(__104_Users__ => __104_Users__._id);
      await bulkDeleteUsers_101__({ ids }).unwrap();
      toggleBulkDeleteModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to delete __104_Users__:', error);
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
              You are about to delete <span className="font-semibold">({bulkData.length})</span> users_102__
            </p>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col">
            {bulkData.map((__104_Users__, idx) => (
              <span key={(__104_Users__._id as string) + idx} className="text-xs">
                {idx + 1}. {(__104_Users__.name as string) || ''}
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
            onClick={handleBulkDelete__103_Users__}
          >
            Delete Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDelete__103_Users__;
