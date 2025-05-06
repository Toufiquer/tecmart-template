import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { __custom_selector_arr__ } from '@/app/template6/store/filename7StoreConstants';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';
import { useBulkUpdate_1_template_Mutation } from '@/redux/features/template6/filename7Api';
import { ScrollArea } from '@/components/ui/scroll-area';

const BulkEdit_3_template_: React.FC = () => {
  const { isBulkEditModalOpen, toggleBulkEditModal, bulkData, setBulkData } = use_3_template_Store();
  const [bulkUpdate_1_template_, { isLoading }] = useBulkUpdate_1_template_Mutation();

  const handleBulkEdit_3_template_ = async () => {
    if (!bulkData.length) return;
    try {
      const newBulkData = bulkData.map(({ _id, ...rest }) => ({ id: _id, updateData: rest }));
      await bulkUpdate_1_template_(newBulkData).unwrap();
      toggleBulkEditModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to edit _2_template_:', error);
    }
  };

  const handleRoleChange = (_4_template_Id: string, role: string) => {
    setBulkData(bulkData.map(_4_template_ => (_4_template_._id === _4_template_Id ? { ..._4_template_, role } : _4_template_)) as I_3_template_[]);
  };

  return (
    <Dialog open={isBulkEditModalOpen} onOpenChange={toggleBulkEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Update</DialogTitle>
        </DialogHeader>
        {bulkData.length > 0 && (
          <p className="pt-4">
            You are about to update <span className="font-semibold">({bulkData.length})</span> _2_template_
          </p>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {bulkData.map((_4_template_, idx) => (
              <div key={(_4_template_._id as string) || idx} className="flex items-center justify-between">
                <span>
                  {idx + 1}. {(_4_template_.name as string) || ''}
                </span>
                <div className="flex items-center gap-4 min-w-[180px]">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select onValueChange={role => handleRoleChange(_4_template_._id as string, role)} defaultValue={(_4_template_.role as string) || ''}>
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
            onClick={handleBulkEdit_3_template_}
            className="cursor-pointer border-green-400 hover:border-green-500 text-green-500"
          >
            Update Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEdit_3_template_;
