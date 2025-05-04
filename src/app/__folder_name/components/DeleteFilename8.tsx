import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import { baseI_3_template_ } from '@/app/template6/store/filename7StoreConstants';
import { useDelete_3_template_Mutation } from '@/redux/features/template6/filename7Api';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';

const Delete_3_template_: React.FC = () => {
  const { toggleDeleteModal, isDeleteModalOpen, selected_3_template_, setSelected_3_template_ } = use_3_template_Store();
  const [delete_3_template_] = useDelete_3_template_Mutation();

  const handleDelete_3_template_ = async () => {
    if (selected_3_template_) {
      try {
        await delete_3_template_({ id: selected_3_template_._id }).unwrap();
        toggleDeleteModal(false);
      } catch (error) {
        console.error('Failed to delete _3_template_:', error);
      }
    }
  };

  const handleCancel = () => {
    toggleDeleteModal(false);
    setSelected_3_template_({ ...baseI_3_template_ } as I_3_template_);
  };

  const { name = '' } = selected_3_template_ || {};

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={toggleDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {selected_3_template_ && (
          <div className="py-4">
            <p>
              You are about to delete _4_template_: <span className="font-semibold">{(name as string) || ''}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button className="cursor-pointer border-1 border-slate-400 hover:border-slate-500" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="cursor-pointer border-1 border-rose-400 hover:border-rose-500 text-rose-500" variant="outline" onClick={handleDelete_3_template_}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete_3_template_;
