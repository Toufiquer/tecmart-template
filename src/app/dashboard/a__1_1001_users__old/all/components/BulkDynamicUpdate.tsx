import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { use__103_Users__Store } from '../store/Store';
import { useBulkUpdateUsers__1_101__Mutation } from '../redux/rtk-Api';
import DynamicDataSelect from './DynamicDataSelect';

const BulkDynamicUpdateNextComponents: React.FC = () => {
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const { toggleBulkDynamicUpdateModal, isBulkDynamicUpdateModal, bulkData, setBulkData } = use__103_Users__Store();
  const [bulkUpdateUsers__1_101__, { isLoading }] = useBulkUpdateUsers__1_101__Mutation();

  const handleBulkEdit__103_Users__ = async () => {
    if (!bulkData.length) return;
    try {
      const newBulkData = bulkData.map(({ _id, ...rest }) => ({ id: _id, updateData: { ...rest, dataArr: newItemTags } }));

      await bulkUpdateUsers__1_101__(newBulkData).unwrap();
      toggleBulkDynamicUpdateModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit users__1_102__:', error);
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
              You are about to update <span className="font-semibold">({bulkData.length})</span> users__1_102__
            </p>
            <div className="w-full flex items-center justify-between pt-2">
              <DynamicDataSelect label="Update all data as" newItemTags={newItemTags as string[]} setNewItemTags={setNewItemTags} />
            </div>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {bulkData.map((__104_Users__, idx) => (
              <div key={(__104_Users__._id as string) || idx} className="flex items-start mb-2 justify-between flex-col">
                <div className="flex flex-col">
                  <span>
                    {idx + 1}. {(__104_Users__.name as string) || ''}
                  </span>
                  {/* <span className="text-xs mt-0">{Array.isArray(__104_Users__.dataArr) ? __104_Users__.dataArr.join(', ') : ''}</span> */}
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
            onClick={handleBulkEdit__103_Users__}
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
