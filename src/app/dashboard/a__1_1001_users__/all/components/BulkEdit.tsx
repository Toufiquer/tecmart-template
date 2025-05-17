import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { use__103_Users__Store } from '../store/Store';
import { __custom_selector_arr__ } from '../store/StoreConstants';
import { IUsers__1_101__ } from '../api/v1/Model';
import { useBulkUpdateUsers__1_101__Mutation } from '../redux/rtk-Api';

const BulkEdit__103_Users__: React.FC = () => {
  const { isBulkEditModalOpen, toggleBulkEditModal, bulkData, setBulkData } = use__103_Users__Store();
  const [bulkUpdateUsers__1_101__, { isLoading }] = useBulkUpdateUsers__1_101__Mutation();

  const handleBulkEdit__103_Users__ = async () => {
    if (!bulkData.length) return;
    try {
      const newBulkData = bulkData.map(({ _id, ...rest }) => ({ id: _id, updateData: rest }));
      await bulkUpdateUsers__1_101__(newBulkData).unwrap();
      toggleBulkEditModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit users__1_102__:', error);
    }
  };

  const handleRoleChange = (__104_Users__Id: string, role: string) => {
    setBulkData(bulkData.map(__104_Users__ => (__104_Users__._id === __104_Users__Id ? { ...__104_Users__, role } : __104_Users__)) as IUsers__1_101__[]);
  };

  return (
    <Dialog open={isBulkEditModalOpen} onOpenChange={toggleBulkEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Update</DialogTitle>
        </DialogHeader>
        {bulkData.length > 0 && (
          <p className="pt-4">
            You are about to update <span className="font-semibold">({bulkData.length})</span> users__1_102__
          </p>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {bulkData.map((__104_Users__, idx) => (
              <div key={(__104_Users__._id as string) || idx} className="flex items-center justify-between">
                <span>
                  {idx + 1}. {(__104_Users__.name as string) || ''}
                </span>
                <div className="flex items-center gap-4 min-w-[180px]">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select onValueChange={role => handleRoleChange(__104_Users__._id as string, role)} defaultValue={(__104_Users__.role as string) || ''}>
                    <SelectTrigger className="bg-slate-50">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {__custom_selector_arr__?.map((role, index) => (
                        <SelectItem key={role + index} value={role} className="cursor-pointer hover:bg-slate-200">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => toggleBulkEditModal(false)} className="cursor-pointer border-slate-400 hover:border-slate-500">
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

export default BulkEdit__103_Users__;
