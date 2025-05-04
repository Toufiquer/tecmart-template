import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';

export interface _3_template_Store {
  _2_template_: I_3_template_[];
  selected_3_template_: I_3_template_ | null;
  new_3_template_: Partial<I_3_template_>;
  isAddModalOpen: boolean;
  isViewModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setNew_3_template_: React.Dispatch<React.SetStateAction<Partial<I_3_template_>>>;
  isBulkEditModalOpen: boolean;
  isBulkDeleteModalOpen: boolean;
  bulkData: I_3_template_[];
  set_1_template_: (_2_template_: I_3_template_[]) => void;
  setSelected_3_template_: (_4_template_: I_3_template_ | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
  toggleBulkEditModal: (_4_template_: boolean) => void;
  toggleBulkDeleteModal: (_4_template_: boolean) => void;
  setBulkData: (bulkData: I_3_template_[]) => void;
}
