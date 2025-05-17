import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { use__103_Users__Store } from '../store/Store';
import { baseIUsers_101__ } from '../store/StoreConstants';
import { useDelete__103_Users__Mutation } from '../redux/rtk-Api';
import { IUsers_101__ } from '../api/v1/Model';

const Delete__103_Users__: React.FC = () => {
  const { toggleDeleteModal, isDeleteModalOpen, selected__103_Users__, setSelected__103_Users__ } = use__103_Users__Store();
  const [delete__103_Users__] = useDelete__103_Users__Mutation();

  const handleDelete__103_Users__ = async () => {
    if (selected__103_Users__) {
      try {
        await delete__103_Users__({ id: selected__103_Users__._id }).unwrap();
        toggleDeleteModal(false);
      } catch (error) {
        console.error('Failed to delete __103_Users__:', error);
      }
    }
  };

  const handleCancel = () => {
    toggleDeleteModal(false);
    setSelected__103_Users__({ ...baseIUsers_101__ } as IUsers_101__);
  };

  const { name = '' } = selected__103_Users__ || {};

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={toggleDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {selected__103_Users__ && (
          <div className="py-4">
            <p>
              You are about to delete __104_Users__: <span className="font-semibold">{(name as string) || ''}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="cursor-pointer border-1 border-rose-400 hover:border-rose-500 text-rose-500" variant="outline" onClick={handleDelete__103_Users__}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete__103_Users__;
