import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useBlogsStore } from '../store/Store';
import { baseIBlogs } from '../store/StoreConstants';
import { useDeleteBlogsMutation } from '../redux/rtk-Api';
import { IBlogs } from '../api/v1/Model';

const DeleteNextComponents: React.FC = () => {
  const { toggleDeleteModal, isDeleteModalOpen, selectedBlogs, setSelectedBlogs } = useBlogsStore();
  const [deleteBlogs] = useDeleteBlogsMutation();

  const handleDeleteBlogs = async () => {
    if (selectedBlogs) {
      try {
        await deleteBlogs({ id: selectedBlogs._id }).unwrap();
        toggleDeleteModal(false);
      } catch (error) {
        console.error('Failed to delete Blogs:', error);
      }
    }
  };

  const handleCancel = () => {
    toggleDeleteModal(false);
    setSelectedBlogs({ ...baseIBlogs } as IBlogs);
  };

  const { name = '' } = selectedBlogs || {};

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={toggleDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {selectedBlogs && (
          <div className="py-4">
            <p>
              You are about to delete Blogs: <span className="font-semibold">{(name as string) || ''}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="cursor-pointer border-1 border-rose-400 hover:border-rose-500 text-rose-500" variant="outline" onClick={handleDeleteBlogs}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNextComponents;
