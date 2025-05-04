/*
|-----------------------------------------
| setting up Store for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/
// This template is only for use redux store.

import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { apiSlice } from '@/redux/api/apiSlice';

import _2_template_Slice from '@/redux/features/template6/filename7Slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    _3_template_: _2_template_Slice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
