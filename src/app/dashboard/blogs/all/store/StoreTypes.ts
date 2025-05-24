// import { IBlogs } from '@/app/api/v1/blogs/filename7Model';
import { IBlogs } from '../api/v1/Model';

export interface BlogsStore {
  queryPramsLimit: number;
  queryPramsPage: number;
  queryPramsQ: string;
  blogs: IBlogs[];
  selectedBlogs: IBlogs | null;
  newBlogs: Partial<IBlogs>;
  isAddModalOpen: boolean;
  isViewModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setnewBlogs: React.Dispatch<React.SetStateAction<Partial<IBlogs>>>;
  isBulkEditModalOpen: boolean;
  isBulkUpdateModalOpen: boolean;
  isBulkDynamicUpdateModal: boolean;
  isBulkDeleteModalOpen: boolean;
  bulkData: IBlogs[];
  setQueryPramsLimit: (payload: number) => void;
  setQueryPramsPage: (payload: number) => void;
  setQueryPramsQ: (payload: string) => void;
  setBlogs: (blogs: IBlogs[]) => void;
  setSelectedBlogs: (Blogs: IBlogs | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  toggleViewModal: (isOpen: boolean) => void;
  toggleEditModal: (isOpen: boolean) => void;
  toggleDeleteModal: (isOpen: boolean) => void;
  toggleBulkEditModal: (Blogs: boolean) => void;
  toggleBulkUpdateModal: (Blogs: boolean) => void;
  toggleBulkDynamicUpdateModal: (Blogs: boolean) => void;
  toggleBulkDeleteModal: (Blogs: boolean) => void;
  setBulkData: (bulkData: IBlogs[]) => void;
}
