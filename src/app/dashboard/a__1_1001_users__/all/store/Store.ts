import { create } from 'zustand';
import { IUsers__1_101__ } from '../api/v1/Model';
import { __103_Users__Store } from './StoreTypes';
import { baseIUsers__1_101__, queryParams } from './StoreConstants';

export const use__103_Users__Store = create<__103_Users__Store>(set => ({
  queryPramsLimit: queryParams.limit,
  queryPramsPage: queryParams.page,
  queryPramsQ: queryParams.q,
  users__1_102__: [],
  selected__103_Users__: null,
  new__103_Users__: baseIUsers__1_101__,
  isBulkEditModalOpen: false,
  isBulkDeleteModalOpen: false,
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  bulkData: [],
  setQueryPramsLimit: (payload: number) => set({ queryPramsLimit: payload }),
  setQueryPramsPage: (payload: number) => set({ queryPramsPage: payload }),
  setQueryPramsQ: (payload: string) => set({ queryPramsQ: payload }),
  setBulkData: (bulkData: IUsers__1_101__[]) => set({ bulkData }),
  setUsers__1_101__: (users__1_102__: IUsers__1_101__[]) => set({ users__1_102__ }),
  setSelected__103_Users__: __104_Users__ => set({ selected__103_Users__: __104_Users__ }),
  setNew__103_Users__: __104_Users__ =>
    set(state => ({
      new__103_Users__: typeof __104_Users__ === 'function' ? __104_Users__(state.new__103_Users__) : __104_Users__,
    })),
  toggleAddModal: data => set({ isAddModalOpen: data }),
  toggleViewModal: data => set({ isViewModalOpen: data }),
  toggleEditModal: data => set({ isEditModalOpen: data }),
  toggleDeleteModal: data => set({ isDeleteModalOpen: data }),
  toggleBulkEditModal: data => set({ isBulkEditModalOpen: data }),
  toggleBulkDeleteModal: data => set({ isBulkDeleteModalOpen: data }),
}));
