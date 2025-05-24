import React, { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAddBlogsMutation } from '../redux/rtk-Api';

import { useBlogsStore } from '../store/Store';
import { ScrollArea } from '@/components/ui/scroll-area';

import { defaultBlogsData, select, ISelect, blogsSelectorArr } from '../store/StoreConstants';
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
  const { toggleAddModal, isAddModalOpen, blogs, newBlogs, setnewBlogs, setBlogs } = useBlogsStore();
  const [addBlogs, { isLoading, isError, error }] = useAddBlogsMutation();

  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);

  const [descriptions, setDescriptions] = useState('');

  const onChange = (content: string) => {
    setDescriptions(content);
    console.log(content);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewBlogs({ ...newBlogs, [name]: value });
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
    setnewBlogs({ ...newBlogs, role: value as ISelect });
  };

  const handleaddBlogs = async () => {
    const Blogs = {
      dataArr: newItemTags || [],
      name: newBlogs.name || '',
      email: newBlogs.email || '',
      passCode: newBlogs.passCode || '',
      alias: newBlogs.alias || '',
      role: (newBlogs.role as ISelect) || select,
      images: newImages || [],
      descriptions: descriptions || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const addedBlogs = await addBlogs(Blogs).unwrap(); // Get the returned data
      setBlogs([...blogs, addedBlogs]); // Use the returned data instead of the local `Blogs` object
      toggleAddModal(false);
      setnewBlogs(defaultBlogsData);
    } catch (error) {
      console.error('Failed to add Blogs:', error);
    }
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Blogs</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <InputField id="name" name="name" label="Name" value={(newBlogs.name as string) || ''} onChange={handleInputChange} />
            <InputField id="email" name="email" label="Email" type="email" value={(newBlogs.email as string) || ''} onChange={handleInputChange} />
            <InputField
              id="passCode"
              name="passCode"
              label="Pass Code"
              type="password"
              value={(newBlogs.passCode as string) || ''}
              onChange={handleInputChange}
            />
            <InputField id="alias" name="alias" label="Alias" value={(newBlogs.alias as string) || ''} onChange={handleInputChange} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange} defaultValue={(newBlogs.role as string) || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-50">
                  {blogsSelectorArr?.map((i, index) => (
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
            onClick={handleaddBlogs}
          >
            Add Blogs
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNextComponents;
