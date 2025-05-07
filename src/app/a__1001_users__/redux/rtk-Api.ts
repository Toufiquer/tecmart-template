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

export const tagType: string = 'users_102__tags';

export const users_102__Api = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers_101__: builder.query({
      query: ({ page, limit, q }) => {
        let url = `/api/v1/a__1001_rtk_template__?page=${page || 1}&limit=${limit || 10}`;
        if (q) {
          url += `&q=${encodeURIComponent(q)}`;
        }
        return url;
      },
      providesTags: [{ type: tagType, id: 'LIST' }],
      async onQueryStarted() {
        try {
          // You can add any additional logic here
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    get__103_Users__ById: builder.query({
      query: id => `/api/v1/a__1001_rtk_template__?id=${id}`,
    }),
    add__103_Users__: builder.mutation({
      query: new__103_Users__ => ({
        url: '/api/v1/a__1001_rtk_template__',
        method: 'POST',
        body: new__103_Users__,
      }),
      invalidatesTags: [{ type: tagType }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IUsers_101__; message: string } } = await queryFulfilled;
          handleSuccess(data.message);
          dispatch(users_102__Api.util.invalidateTags([{ type: tagType }]));
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    update__103_Users__: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/a__1001_rtk_template__`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: tagType }],
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
        url: `/api/v1/a__1001_rtk_template__`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: tagType }],
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
        url: `/api/v1/a__1001_rtk_template__?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: tagType }],
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
        url: `/api/v1/a__1001_rtk_template__?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: tagType }],
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
