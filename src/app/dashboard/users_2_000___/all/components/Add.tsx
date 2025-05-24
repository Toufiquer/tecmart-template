import React, { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAddUsers_1_000___Mutation } from '../redux/rtk-Api';

import { useUsers_1_000___Store } from '../store/Store';
import { ScrollArea } from '@/components/ui/scroll-area';

import { defaultUsers_1_000___Data, select_5_000___, ISelect_6_000___, users_2_000___SelectorArr } from '../store/StoreConstants';
import { handleError } from './utils';
import DataSelect from './DataSelect';
import ImagesSelect from './ImagesSelect';
import RichTextEditor from './rich-text-editor';

const InputField: React.FC<{
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, label, type = 'text', value, onChange }) => (
  <div className="grid grid-cols-4 items-center gap-4 pr-1">
    <Label htmlFor={id} className="text-right">
      {label}
    </Label>
    <Input id={id} name={name} type={type} value={value} onChange={onChange} className="col-span-3" />
  </div>
);

const AddNextComponents: React.FC = () => {
  const { toggleAddModal, isAddModalOpen, users_2_000___, newUsers_1_000___, setnewUsers_1_000___, setUsers_1_000___ } = useUsers_1_000___Store();
  const [addUsers_1_000___, { isLoading, isError, error }] = useAddUsers_1_000___Mutation();

  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);

  const [descriptions, setDescriptions] = useState('');

  const onChange = (content: string) => {
    setDescriptions(content);
    console.log(content);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewUsers_1_000___({ ...newUsers_1_000___, [name]: value });
  };
  useEffect(() => {
    if (isError) {
      const errorMessage =
        'status' in error && error.data && typeof error.data === 'object' && 'message' in error.data
          ? (error.data as { message: string }).message
          : error instanceof Error
            ? error.message
            : 'An unknown error occurred';
      if (errorMessage) handleError(errorMessage);
    }
  }, [isError, error]);
  const handleRoleChange = (value: string) => {
    setnewUsers_1_000___({ ...newUsers_1_000___, role: value as ISelect_6_000___ });
  };

  const handleaddUsers_1_000___ = async () => {
    const Users_1_000___ = {
      dataArr: newItemTags || [],
      name: newUsers_1_000___.name || '',
      email: newUsers_1_000___.email || '',
      passCode: newUsers_1_000___.passCode || '',
      alias: newUsers_1_000___.alias || '',
      role: (newUsers_1_000___.role as ISelect_6_000___) || select_5_000___,
      images: newImages || [],
      descriptions: descriptions || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const addedUsers_1_000___ = await addUsers_1_000___(Users_1_000___).unwrap(); // Get the returned data
      setUsers_1_000___([...users_2_000___, addedUsers_1_000___]); // Use the returned data instead of the local `Users_1_000___` object
      toggleAddModal(false);
      setnewUsers_1_000___(defaultUsers_1_000___Data);
    } catch (error) {
      console.error('Failed to add Users_1_000___:', error);
    }
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Users_1_000___</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <InputField id="name" name="name" label="Name" value={(newUsers_1_000___.name as string) || ''} onChange={handleInputChange} />
            <InputField id="email" name="email" label="Email" type="email" value={(newUsers_1_000___.email as string) || ''} onChange={handleInputChange} />
            <InputField
              id="passCode"
              name="passCode"
              label="Pass Code"
              type="password"
              value={(newUsers_1_000___.passCode as string) || ''}
              onChange={handleInputChange}
            />
            <InputField id="alias" name="alias" label="Alias" value={(newUsers_1_000___.alias as string) || ''} onChange={handleInputChange} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
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
            <ImagesSelect newImages={newImages as string[]} setNewImages={setNewImages} />

            <RichTextEditor content={descriptions} onChange={onChange} />
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer" onClick={() => toggleAddModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            className="border-slate-500 hover:border-slate-600 border-1 cursor-pointer"
            onClick={handleaddUsers_1_000___}
          >
            Add Users_1_000___
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNextComponents;
