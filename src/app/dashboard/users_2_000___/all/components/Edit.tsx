import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useUsers_1_000___Store } from '../store/Store';
import { useUpdateUsers_1_000___Mutation } from '../redux/rtk-Api';
import { IUsers_1_000___ } from '../api/v1/Model';
import { ISelect_6_000___, users_2_000___SelectorArr, baseIUsers_1_000___ } from '../store/StoreConstants';
import DataSelect from './DataSelect';
import ImagesSelect from './ImagesSelect';
import RichTextEditor from './rich-text-editor';

const EditNextComponents: React.FC = () => {
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const { toggleEditModal, isEditModalOpen, newUsers_1_000___, selectedUsers_1_000___, setnewUsers_1_000___, setSelectedUsers_1_000___ } = useUsers_1_000___Store();
  const [updateUsers_1_000___] = useUpdateUsers_1_000___Mutation();
  const [descriptions, setDescriptions] = useState('');

  const onChange = (content: string) => {
    setDescriptions(content);
    console.log(content);
  };
  useEffect(() => {
    if (selectedUsers_1_000___) {
      setnewUsers_1_000___(selectedUsers_1_000___);
      setNewItemTags(selectedUsers_1_000___.dataArr as string[]);
      setNewImages(selectedUsers_1_000___.images as string[]);
    }
  }, [selectedUsers_1_000___, setnewUsers_1_000___]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewUsers_1_000___({ ...newUsers_1_000___, [name]: value });
  };
  const handleRoleChange = (value: string) => {
    setnewUsers_1_000___({ ...newUsers_1_000___, role: value as ISelect_6_000___ });
  };

  const handleEditNextComponents = async () => {
    if (!selectedUsers_1_000___) return;

    try {
      const updateData = { ...newUsers_1_000___, dataArr: newItemTags, images: newImages };
      await updateUsers_1_000___({ id: selectedUsers_1_000___._id, ...updateData }).unwrap(); // Call RTK mutation
      toggleEditModal(false);
    } catch (error) {
      console.error('Failed to update Users_1_000___:', error);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={toggleEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Users_1_000___</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input id="edit-name" name="name" value={(newUsers_1_000___.name as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={(newUsers_1_000___.email as string) || ''}
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
                value={(newUsers_1_000___.passCode as string) || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alias" className="text-right">
                Alias
              </Label>
              <Input id="edit-alias" name="alias" value={(newUsers_1_000___.alias as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>

              <Select onValueChange={handleRoleChange} defaultValue={(newUsers_1_000___.role as string) || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-50">
                  {users_2_000___SelectorArr?.map((i, index) => (
                    <SelectItem key={i + index} className="cursor-pointer hover:bg-slate-200" value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DataSelect newItemTags={newItemTags as string[]} setNewItemTags={setNewItemTags} />
          </div>
          <ImagesSelect newImages={newImages as string[]} setNewImages={setNewImages} />
          <div className="w-full mt-2" />

          <RichTextEditor content={descriptions} onChange={onChange} />
          <div className="mt-12 pt-12" />
        </ScrollArea>
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            variant="outline"
            onClick={() => {
              toggleEditModal(false);
              setSelectedUsers_1_000___({ ...baseIUsers_1_000___ } as IUsers_1_000___);
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
