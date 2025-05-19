import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { use__103_Users__Store } from '../store/Store';
import { useUpdate__103_Users__Mutation } from '../redux/rtk-Api';
import { IUsers__1_101__ } from '../api/v1/Model';
import { __I_custom_selector_Type__, __custom_selector_arr__, baseIUsers__1_101__ } from '../store/StoreConstants';
import DataSelect from './DataSelect';

const EditNextComponents: React.FC = () => {
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const { toggleEditModal, isEditModalOpen, new__103_Users__, selected__103_Users__, setNew__103_Users__, setSelected__103_Users__ } = use__103_Users__Store();
  const [update__103_Users__] = useUpdate__103_Users__Mutation(); // RTK mutation hook

  useEffect(() => {
    if (selected__103_Users__) {
      setNew__103_Users__(selected__103_Users__);
      setNewItemTags(selected__103_Users__.dataArr as string[]);
    }
  }, [selected__103_Users__, setNew__103_Users__]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNew__103_Users__({ ...new__103_Users__, [name]: value });
  };
  const handleRoleChange = (value: string) => {
    setNew__103_Users__({ ...new__103_Users__, role: value as __I_custom_selector_Type__ });
  };

  const handleEditNextComponents = async () => {
    if (!selected__103_Users__) return;

    try {
      const updateData = { ...new__103_Users__, dataArr: newItemTags };
      await update__103_Users__({ id: selected__103_Users__._id, ...updateData }).unwrap(); // Call RTK mutation
      toggleEditModal(false);
    } catch (error) {
      console.error('Failed to update __104_Users__:', error);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={toggleEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit __103_Users__</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input id="edit-name" name="name" value={(new__103_Users__.name as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={(new__103_Users__.email as string) || ''}
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
                value={(new__103_Users__.passCode as string) || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alias" className="text-right">
                Alias
              </Label>
              <Input id="edit-alias" name="alias" value={(new__103_Users__.alias as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>

              <Select onValueChange={handleRoleChange} defaultValue={(new__103_Users__.role as string) || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-50">
                  {__custom_selector_arr__?.map((i, index) => (
                    <SelectItem key={i + index} className="cursor-pointer hover:bg-slate-200" value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DataSelect newItemTags={newItemTags as string[]} setNewItemTags={setNewItemTags} />
          </div>
          <div className="mt-12 pt-12" />
        </ScrollArea>
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            variant="outline"
            onClick={() => {
              toggleEditModal(false);
              setSelected__103_Users__({ ...baseIUsers__1_101__ } as IUsers__1_101__);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleEditNextComponents} className="cursor-pointer border-1 border-slate-400 hover:border-slate-500">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNextComponents;
