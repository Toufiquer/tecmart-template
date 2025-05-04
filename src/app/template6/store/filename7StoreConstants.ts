import { I_3_template_ } from '@/app/api/v1/template6/filename7Model';

type PartialI_3_template_ = Pick<I_3_template_, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const pageLimitArr: number[] = [2, 10, 50, 100, 200];
export const __custom_selector_arr__ = ['__role9__', 'admin', 'moderator'];
export type __I_custom_selector_Type__ = '__role9__' | 'admin' | 'moderator';
export const __default_selector__ = '__role9__';
export const default_3_template_Data = { name: '', email: '', passCode: '', alias: '', role: __default_selector__ };
export const baseI_3_template_: PartialI_3_template_ = {
  _id: '',
  ...default_3_template_Data,
};
