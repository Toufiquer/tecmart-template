/*
|-----------------------------------------
| setting up Users_101__Api for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api
import { apiSlice } from '@/redux/api/apiSlice';
import { IUsers_101__ } from '../api/v1/Model';
import { handleError, handleSuccess } from '../components/utils';

// Use absolute paths with leading slash to ensure consistent behavior
export const users_102__Api = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers_101__: builder.query({
      query: ({ page, limit, q }) => {
        let url = `/a__1001_users__/api/v1?page=${page || 1}&limit=${limit || 10}`;
        if (q) {
          url += `&q=${encodeURIComponent(q)}`;
        }
        return url;
      },
      providesTags: [{ type: '__tag_type_users_102__', id: 'LIST' }],
      async onQueryStarted() {
        try {
          // You can add any additional logic here
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    get__103_Users__ById: builder.query({
      query: id => `/a__1001_users__/api/v1?id=${id}`,
    }),
    add__103_Users__: builder.mutation({
      query: new__103_Users__ => ({
        url: '/a__1001_users__/api/v1',
        method: 'POST',
        body: new__103_Users__,
      }),
      invalidatesTags: [{ type: '__tag_type_users_102__' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IUsers_101__; message: string } } = await queryFulfilled;
          handleSuccess(data.message);
          dispatch(users_102__Api.util.invalidateTags([{ type: '__tag_type_users_102__' }]));
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    update__103_Users__: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/a__1001_users__/api/v1`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: '__tag_type_users_102__' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    delete__103_Users__: builder.mutation({
      query: ({ id }) => ({
        url: `/a__1001_users__/api/v1`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: '__tag_type_users_102__' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkUpdateUsers_101__: builder.mutation({
      query: bulkData => ({
        url: `/a__1001_users__/api/v1?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: '__tag_type_users_102__' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkDeleteUsers_101__: builder.mutation({
      query: bulkData => ({
        url: `/a__1001_users__/api/v1?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: '__tag_type_users_102__' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
  }),
});

export const {
  useGetUsers_101__Query,
  useAdd__103_Users__Mutation,
  useUpdate__103_Users__Mutation,
  useDelete__103_Users__Mutation,
  useBulkUpdateUsers_101__Mutation,
  useBulkDeleteUsers_101__Mutation,
  useGet__103_Users__ByIdQuery,
} = users_102__Api;
