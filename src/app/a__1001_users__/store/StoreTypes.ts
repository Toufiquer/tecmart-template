// import { IUsers_101__ } from '@/app/api/v1/a__1001_rtk_template__/filename7Model';
import { IUsers_101__ } from '../api/v1/Model';

export interface __103_Users__Store {
  queryPramsLimit: number;
  queryPramsPage: number;
  queryPramsQ: string;
  users_102__: IUsers_101__[];
  selected__103_Users__: IUsers_101__ | null;
  new__103_Users__: Partial<IUsers_101__>;
  isAddModalOpen: boolean;
  isViewModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setNew__103_Users__: React.Dispatch<React.SetStateAction<Partial<IUsers_101__>>>;
  isBulkEditModalOpen: boolean;
  isBulkDeleteModalOpen: boolean;
  bulkData: IUsers_101__[];
  setQueryPramsLimit: (payload: number) => void;
  setQueryPramsPage: (payload: number) => void;
  setQueryPramsQ: (payload: string) => void;
  setUsers_101__: (users_102__: IUsers_101__[]) => void;
  setSelected__103_Users__: (__104_Users__: IUsers_101__ | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
  toggleBulkEditModal: (__104_Users__: boolean) => void;
  toggleBulkDeleteModal: (__104_Users__: boolean) => void;
  setBulkData: (bulkData: IUsers_101__[]) => void;
}
