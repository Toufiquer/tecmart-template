import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import { useBulkDelete_1_template_Mutation } from '@/redux/features/template6/filename7Api';
import { ScrollArea } from '@/components/ui/scroll-area';

const BulkDelete_3_template_: React.FC = () => {
  const { isBulkDeleteModalOpen, toggleBulkDeleteModal, bulkData, setBulkData } = use_3_template_Store();
  const [bulkDelete_1_template_, { isLoading }] = useBulkDelete_1_template_Mutation();

  const handleBulkDelete_3_template_ = async () => {
    if (!bulkData?.length) return;
    try {
      const ids = bulkData.map(_4_template_ => _4_template_._id);
      await bulkDelete_1_template_({ ids }).unwrap();
      toggleBulkDeleteModal(false);
      setBulkData([]);
    } catch (error) {
      console.error('Failed to delete _4_template_:', error);
    }
  };

  return (
    <Dialog open={isBulkDeleteModalOpen} onOpenChange={toggleBulkDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {bulkData?.length > 0 && (
          <div className="pt-4">
            <p>
              You are about to delete <span className="font-semibold">({bulkData.length})</span> _2_template_
            </p>
          </div>
        )}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="flex flex-col">
            {bulkData.map((_4_template_, idx) => (
              <span key={(_4_template_._id as string) + idx} className="text-xs">
                {idx + 1}. {(_4_template_.name as string) || ''}
              </span>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={() => toggleBulkDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            className="cursor-pointer text-rose-500 border-rose-400 hover:border-rose-500"
            onClick={handleBulkDelete_3_template_}
          >
            Delete Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDelete_3_template_;
