/*
|-----------------------------------------
| setting up ApiSlice for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
  tagTypes: ['_5_template_tags_', '__tag_type_users_102__', '__tag_type_users__1_102__', 'tagTypeUsers_1_000___'],
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.baseURL,
    credentials: 'include', // Include credentials for cross-origin requests
    prepareHeaders: async (headers, {}) => {
      const tokenFromSessionStorage = sessionStorage.getItem(process.env.NEXTAUTH_SECRET || '_');
      const token = tokenFromSessionStorage?.replaceAll('"', '');
      const localStorageToken = localStorage.getItem('token')?.replaceAll('"', '');
      const finalToken = localStorageToken || token;
      console.log('rtk finalToken: ', finalToken);
      if (finalToken) {
        headers.set('authorization', `Bearer ${finalToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
