import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useBlogsStore } from '../store/Store';
import { useUpdateBlogsMutation } from '../redux/rtk-Api';
import { IBlogs } from '../api/v1/Model';
import { ISelect, blogsSelectorArr, baseIBlogs } from '../store/StoreConstants';
import DataSelect from './DataSelect';
import ImagesSelect from './ImagesSelect';
import RichTextEditor from './rich-text-editor';

const EditNextComponents: React.FC = () => {
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const { toggleEditModal, isEditModalOpen, newBlogs, selectedBlogs, setnewBlogs, setSelectedBlogs } = useBlogsStore();
  const [updateBlogs] = useUpdateBlogsMutation();
  const [descriptions, setDescriptions] = useState('');

  const onChange = (content: string) => {
    setDescriptions(content);
    console.log(content);
  };
  useEffect(() => {
    if (selectedBlogs) {
      setnewBlogs(selectedBlogs);
      setNewItemTags(selectedBlogs.dataArr as string[]);
      setNewImages(selectedBlogs.images as string[]);
    }
  }, [selectedBlogs, setnewBlogs]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewBlogs({ ...newBlogs, [name]: value });
  };
  const handleRoleChange = (value: string) => {
    setnewBlogs({ ...newBlogs, role: value as ISelect });
  };

  const handleEditNextComponents = async () => {
    if (!selectedBlogs) return;

    try {
      const updateData = { ...newBlogs, dataArr: newItemTags, images: newImages };
      await updateBlogs({ id: selectedBlogs._id, ...updateData }).unwrap(); // Call RTK mutation
      toggleEditModal(false);
    } catch (error) {
      console.error('Failed to update Blogs:', error);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={toggleEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blogs</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input id="edit-name" name="name" value={(newBlogs.name as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={(newBlogs.email as string) || ''}
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
                value={(newBlogs.passCode as string) || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alias" className="text-right">
                Alias
              </Label>
              <Input id="edit-alias" name="alias" value={(newBlogs.alias as string) || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
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
              setSelectedBlogs({ ...baseIBlogs } as IBlogs);
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
