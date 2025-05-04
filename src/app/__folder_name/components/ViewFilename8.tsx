import React, { useEffect } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import { baseI_3_template_ } from '@/app/template6/store/filename7StoreConstants';
import { useGet_3_template_ByIdQuery } from '@/redux/features/template6/filename7Api';
import { ScrollArea } from '@/components/ui/scroll-area';
import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';

const View_3_template_: React.FC = () => {
  const { isViewModalOpen, selected_3_template_, toggleViewModal, setSelected_3_template_ } = use_3_template_Store();
  const { data: _4_template_Data, refetch } = useGet_3_template_ByIdQuery(selected_3_template_?._id, { skip: !selected_3_template_?._id });

  useEffect(() => {
    if (selected_3_template_?._id) {
      refetch(); // Fetch the latest _3_template_ data
    }
  }, [selected_3_template_?._id, refetch]);

  useEffect(() => {
    if (_4_template_Data?.data) {
      setSelected_3_template_(_4_template_Data.data); // Update selected_3_template_ with the latest data
    }
  }, [_4_template_Data, setSelected_3_template_]);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="grid grid-cols-3 gap-2">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || 'N/A'}</div>
    </div>
  );

  return (
    <Dialog open={isViewModalOpen} onOpenChange={toggleViewModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>_3_template_ Details</DialogTitle>
        </DialogHeader>
        {selected_3_template_ && (
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid gap-2">
              <DetailRow label="Name" value={selected_3_template_.name as string} />
              <DetailRow label="Email" value={selected_3_template_.email as string} />
              <DetailRow label="Pass Code" value={selected_3_template_.passCode as string} />
              <DetailRow label="Alias" value={selected_3_template_.alias as string} />
              <DetailRow
                label="Role"
                value={
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selected_3_template_.role === 'admin'
                        ? 'bg-amber-100 text-amber-700'
                        : selected_3_template_.role === 'moderator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {selected_3_template_.role as string}
                  </span>
                }
              />
              <DetailRow label="Created At" value={formatDate(selected_3_template_.createdAt)} />
              <DetailRow label="Updated At" value={formatDate(selected_3_template_.updatedAt)} />
            </div>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            onClick={() => {
              toggleViewModal(false);
              setSelected_3_template_({ ...baseI_3_template_ } as I_3_template_);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default View_3_template_;
