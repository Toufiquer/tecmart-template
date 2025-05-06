import React, { useEffect } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAdd_3_template_Mutation } from '@/redux/features/template6/filename7Api';

import { use_3_template_Store } from '@/app/template6/store/filename7Store';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  default_3_template_Data,
  __default_selector__,
  __I_custom_selector_Type__,
  __custom_selector_arr__,
} from '@/app/template6/store/filename7StoreConstants';
import { handleError } from '@/app/template6/components/utils';

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

const Add_3_template_: React.FC = () => {
  const { toggleAddModal, isAddModalOpen, _2_template_, new_3_template_, setNew_3_template_, set_1_template_ } = use_3_template_Store();
  const [add_3_template_, { isLoading, isError, error }] = useAdd_3_template_Mutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNew_3_template_({ ...new_3_template_, [name]: value });
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
    setNew_3_template_({ ...new_3_template_, role: value as __I_custom_selector_Type__ });
  };

  const handleAdd_3_template_ = async () => {
    const _4_template_ = {
      name: new_3_template_.name || '',
      email: new_3_template_.email || '',
      passCode: new_3_template_.passCode || '',
      alias: new_3_template_.alias || '',
      role: (new_3_template_.role as __I_custom_selector_Type__) || __default_selector__,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const added_3_template_ = await add_3_template_(_4_template_).unwrap(); // Get the returned data
      set_1_template_([..._2_template_, added_3_template_]); // Use the returned data instead of the local `_4_template_` object
      toggleAddModal(false);
      setNew_3_template_(default_3_template_Data);
    } catch (error) {
      console.error('Failed to add _4_template_:', error);
    }
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={toggleAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New _3_template_</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            <InputField id="name" name="name" label="Name" value={(new_3_template_.name as string) || ''} onChange={handleInputChange} />
            <InputField id="email" name="email" label="Email" type="email" value={(new_3_template_.email as string) || ''} onChange={handleInputChange} />
            <InputField
              id="passCode"
              name="passCode"
              label="Pass Code"
              type="password"
              value={(new_3_template_.passCode as string) || ''}
              onChange={handleInputChange}
            />
            <InputField id="alias" name="alias" label="Alias" value={(new_3_template_.alias as string) || ''} onChange={handleInputChange} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange} defaultValue={(new_3_template_.role as string) || ''}>
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
            onClick={handleAdd_3_template_}
          >
            Add _3_template_
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Add_3_template_;
