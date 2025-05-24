import { IBlogs } from '../api/v1/Model';

type PartialIBlogs = Pick<IBlogs, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const baseIBlogsPerPage = 2;
export const queryParams = { q: '', page: 1, limit: baseIBlogsPerPage };
export const pageLimitArr: number[] = [baseIBlogsPerPage, 10, 50, 100, 200];
export const blogsSelectorArr = ['select', 'admin', 'moderator'];
export type ISelect = 'select' | 'admin' | 'moderator';
export const select = 'select';
export const defaultBlogsData = { name: '', email: '', passCode: '', alias: '', role: select };
export const baseIBlogs: PartialIBlogs = {
  _id: '',
  ...defaultBlogsData,
};

