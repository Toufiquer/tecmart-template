import { create } from 'zustand';
import { IBlogs } from '../api/v1/Model';
import { BlogsStore } from './StoreTypes';
import { baseIBlogs, queryParams } from './StoreConstants';

export const useBlogsStore = create<BlogsStore>(set => ({
  queryPramsLimit: queryParams.limit,
  queryPramsPage: queryParams.page,
  queryPramsQ: queryParams.q,
  blogs: [],
  selectedBlogs: null,
  newBlogs: baseIBlogs,
  isBulkEditModalOpen: false,
  isBulkDynamicUpdateModal: false,
  isBulkUpdateModalOpen: false,
  isBulkDeleteModalOpen: false,
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  bulkData: [],
  setQueryPramsLimit: (payload: number) => set({ queryPramsLimit: payload }),
  setQueryPramsPage: (payload: number) => set({ queryPramsPage: payload }),
  setQueryPramsQ: (payload: string) => set({ queryPramsQ: payload }),
  setBulkData: (bulkData: IBlogs[]) => set({ bulkData }),
  setBlogs: (blogs: IBlogs[]) => set({ blogs }),
  setSelectedBlogs: Blogs => set({ selectedBlogs: Blogs }),
  setnewBlogs: Blogs =>
    set(state => ({
      newBlogs: typeof Blogs === 'function' ? Blogs(state.newBlogs) : Blogs,
    })),
  toggleAddModal: data => set({ isAddModalOpen: data }),
  toggleViewModal: data => set({ isViewModalOpen: data }),
  toggleEditModal: data => set({ isEditModalOpen: data }),
  toggleDeleteModal: data => set({ isDeleteModalOpen: data }),
  toggleBulkEditModal: data => set({ isBulkEditModalOpen: data }),
  toggleBulkUpdateModal: data => set({ isBulkUpdateModalOpen: data }),
  toggleBulkDynamicUpdateModal: data => set({ isBulkDynamicUpdateModal: data }),
  toggleBulkDeleteModal: data => set({ isBulkDeleteModalOpen: data }),
}));
