import React, { useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import { useUpdate_3_template_Mutation } from '@/redux/features/template6/filename7Api';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';
import { __I_custom_selector_Type__, __custom_selector_arr__, baseI_3_template_ } from '@/app/template6/store/filename7StoreConstants';

const Edit_3_template_: React.FC = () => {
  const { toggleEditModal, isEditModalOpen, new_3_template_, selected_3_template_, setNew_3_template_, setSelected_3_template_ } = use_3_template_Store();
  const [update_3_template_] = useUpdate_3_template_Mutation(); // RTK mutation hook

  useEffect(() => {
    if (selected_3_template_) {
      setNew_3_template_(selected_3_template_);
    }
  }, [selected_3_template_, setNew_3_template_]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNew_3_template_({ ...new_3_template_, [name]: value });
  };
  const handleRoleChange = (value: string) => {
    setNew_3_template_({ ...new_3_template_, role: value as __I_custom_selector_Type__ });
  };

  const handleEdit_3_template_ = async () => {
    if (!selected_3_template_) return;

    try {
      await update_3_template_({ id: selected_3_template_._id, ...new_3_template_ }).unwrap(); // Call RTK mutation
      toggleEditModal(false);
    } catch (error) {
      console.error('Failed to update _4_template_:', error);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={toggleEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit _3_template_</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input id="edit-name" name="name" value={(new_3_template_.name as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={(new_3_template_.email as string) || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-passCode" className="text-right">
                Pass Code
              </Label>
              <Input
                id="edit-passCode"
                name="passCode"
                type="password"
                value={(new_3_template_.passCode as string) || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alias" className="text-right">
                Alias
              </Label>
              <Input id="edit-alias" name="alias" value={(new_3_template_.alias as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>

              <Select onValueChange={handleRoleChange} defaultValue={(new_3_template_.role as string) || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {__custom_selector_arr__?.map((i, index) => (
                    <SelectItem key={i + index} className="cursor-pointer hover:bg-slate-200" value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-12 pt-12" />
        </ScrollArea>
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            variant="outline"
            onClick={() => {
              toggleEditModal(false);
              setSelected_3_template_({ ...baseI_3_template_ } as I_3_template_);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleEdit_3_template_} className="cursor-pointer border-1 border-slate-400 hover:border-slate-500">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Edit_3_template_;
