import React, { useEffect } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAdd__103_Users__Mutation } from '../redux/rtk-Api';

import { use__103_Users__Store } from '../store/Store';
import { ScrollArea } from '@/components/ui/scroll-area';

import { default__103_Users__Data, __default_selector__, __I_custom_selector_Type__, __custom_selector_arr__ } from '../store/StoreConstants';
import { handleError } from './utils';

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

const Add__103_Users__: React.FC = () => {
  const { toggleAddModal, isAddModalOpen, users__1_102__, new__103_Users__, setNew__103_Users__, setUsers__1_101__ } = use__103_Users__Store();
  const [add__103_Users__, { isLoading, isError, error }] = useAdd__103_Users__Mutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNew__103_Users__({ ...new__103_Users__, [name]: value });
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
    setNew__103_Users__({ ...new__103_Users__, role: value as __I_custom_selector_Type__ });
  };

  const handleAdd__103_Users__ = async () => {
    const __104_Users__ = {
      name: new__103_Users__.name || '',
      email: new__103_Users__.email || '',
      passCode: new__103_Users__.passCode || '',
      alias: new__103_Users__.alias || '',
      role: (new__103_Users__.role as __I_custom_selector_Type__) || __default_selector__,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const added__103_Users__ = await add__103_Users__(__104_Users__).unwrap(); // Get the returned data
      setUsers__1_101__([...users__1_102__, added__103_Users__]); // Use the returned data instead of the local `__104_Users__` object
      toggleAddModal(false);
      setNew__103_Users__(default__103_Users__Data);
    } catch (error) {
      console.error('Failed to add __104_Users__:', error);
    }
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New __103_Users__</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <InputField id="name" name="name" label="Name" value={(new__103_Users__.name as string) || ''} onChange={handleInputChange} />
            <InputField id="email" name="email" label="Email" type="email" value={(new__103_Users__.email as string) || ''} onChange={handleInputChange} />
            <InputField
              id="passCode"
              name="passCode"
              label="Pass Code"
              type="password"
              value={(new__103_Users__.passCode as string) || ''}
              onChange={handleInputChange}
            />
            <InputField id="alias" name="alias" label="Alias" value={(new__103_Users__.alias as string) || ''} onChange={handleInputChange} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange} defaultValue={(new__103_Users__.role as string) || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {__custom_selector_arr__?.map((i, index) => (
                    <SelectItem key={i + index} className="cursor-pointer hover:bg-slate-200" value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            onClick={handleAdd__103_Users__}
          >
            Add __103_Users__
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Add__103_Users__;
