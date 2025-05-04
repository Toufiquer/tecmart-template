/*
|-----------------------------------------
| setting up ApiSlice for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  tagTypes: ['_5_template_tags_'],
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.baseURL,
    credentials: 'include', // Include credentials for cross-origin requests
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as { auth?: { accessToken?: string } };
      const token = state.auth?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
