import { IUsers__1_101__ } from '../api/v1/Model';

type PartialIUsers__1_101__ = Pick<IUsers__1_101__, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const baseIUsers__1_101__PerPage = 2;
export const queryParams = { q: '', page: 1, limit: baseIUsers__1_101__PerPage };
export const pageLimitArr: number[] = [baseIUsers__1_101__PerPage, 10, 50, 100, 200];
export const __custom_selector_arr__ = ['__role9__', 'admin', 'moderator'];
export type __I_custom_selector_Type__ = '__role9__' | 'admin' | 'moderator';
export const __default_selector__ = '__role9__';
export const default__103_Users__Data = { name: '', email: '', passCode: '', alias: '', role: __default_selector__ };
export const baseIUsers__1_101__: PartialIUsers__1_101__ = {
  _id: '',
  ...default__103_Users__Data,
};

