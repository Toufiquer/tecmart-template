import { IUsers_1_000___ } from '../api/v1/Model';

type PartialIUsers_1_000___ = Pick<IUsers_1_000___, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const baseIUsers_1_000___PerPage = 2;
export const queryParams = { q: '', page: 1, limit: baseIUsers_1_000___PerPage };
export const pageLimitArr: number[] = [baseIUsers_1_000___PerPage, 10, 50, 100, 200];
export const users_2_000___SelectorArr = ['select_5_000___', 'admin', 'moderator'];
export type ISelect_6_000___ = 'select_5_000___' | 'admin' | 'moderator';
export const select_5_000___ = 'select_5_000___';
export const defaultUsers_1_000___Data = { name: '', email: '', passCode: '', alias: '', role: select_5_000___ };
export const baseIUsers_1_000___: PartialIUsers_1_000___ = {
  _id: '',
  ...defaultUsers_1_000___Data,
};

