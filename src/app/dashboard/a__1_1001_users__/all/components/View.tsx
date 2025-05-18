import React, { useEffect } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { use__103_Users__Store } from '../store/Store';
import { baseIUsers__1_101__ } from '../store/StoreConstants';
import { useGet__103_Users__ByIdQuery } from '../redux/rtk-Api';
import { IUsers__1_101__ } from '../api/v1/Model';

const View__103_Users__: React.FC = () => {
  const { isViewModalOpen, selected__103_Users__, toggleViewModal, setSelected__103_Users__ } = use__103_Users__Store();
  const { data: __104_Users__Data, refetch } = useGet__103_Users__ByIdQuery(selected__103_Users__?._id, { skip: !selected__103_Users__?._id });

  useEffect(() => {
    if (selected__103_Users__?._id) {
      refetch(); // Fetch the latest __103_Users__ data
    }
  }, [selected__103_Users__?._id, refetch]);

  useEffect(() => {
    if (__104_Users__Data?.data) {
      setSelected__103_Users__(__104_Users__Data.data); // Update selected__103_Users__ with the latest data
    }
  }, [__104_Users__Data, setSelected__103_Users__]);

  const formatDate = (date?: Date) => (date ? format(date, 'MMM dd, yyyy') : 'N/A');

  const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="grid grid-cols-3 gap-2">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || 'N/A'}</div>
    </div>
  );
  const DetailRowArray = ({ label, values }: { label: string; values: string[] }) => (
    <div className="grid grid-cols-3 gap-2">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{values?.join(', ')}</div>
    </div>
  );

  return (
    <Dialog open={isViewModalOpen} onOpenChange={toggleViewModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>__103_Users__ Details</DialogTitle>
        </DialogHeader>
        {selected__103_Users__ && (
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid gap-2">
              <DetailRow label="Name" value={selected__103_Users__.name as string} />
              <DetailRow label="Email" value={selected__103_Users__.email as string} />
              <DetailRow label="Pass Code" value={selected__103_Users__.passCode as string} />
              <DetailRow label="Alias" value={selected__103_Users__.alias as string} />
              <DetailRow
                label="Role"
                value={
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selected__103_Users__.role === 'admin'
                        ? 'bg-amber-100 text-amber-700'
                        : selected__103_Users__.role === 'moderator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {selected__103_Users__.role as string}
                  </span>
                }
              />

              <DetailRowArray label="Data Array" values={selected__103_Users__.dataArr as string[]} />
              <DetailRow label="Created At" value={formatDate(selected__103_Users__.createdAt)} />
              <DetailRow label="Updated At" value={formatDate(selected__103_Users__.updatedAt)} />
            </div>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer border-1 border-slate-400 hover:border-slate-500"
            onClick={() => {
              toggleViewModal(false);
              setSelected__103_Users__({ ...baseIUsers__1_101__ } as IUsers__1_101__);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default View__103_Users__;
