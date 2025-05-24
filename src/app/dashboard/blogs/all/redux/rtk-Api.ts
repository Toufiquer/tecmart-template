/*
|-----------------------------------------
| setting up BlogsApi for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api
import { apiSlice } from '@/redux/api/apiSlice';
import { IBlogs } from '../api/v1/Model';
import { handleError, handleSuccess } from '../components/utils';

// Use absolute paths with leading slash to ensure consistent behavior
export const blogsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBlogs: builder.query({
      query: ({ page, limit, q }) => {
        let url = `/dashboard/blogs/all/api/v1?page=${page || 1}&limit=${limit || 10}`;
        if (q) {
          url += `&q=${encodeURIComponent(q)}`;
        }
        return url;
      },
      providesTags: [{ type: 'tagTypeBlogs', id: 'LIST' }],
      async onQueryStarted() {
        try {
          // You can add any additional logic here
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    getBlogsById: builder.query({
      query: id => `/dashboard/blogs/all/api/v1?id=${id}`,
    }),
    addBlogs: builder.mutation({
      query: newBlogs => ({
        url: '/dashboard/blogs/all/api/v1',
        method: 'POST',
        body: newBlogs,
      }),
      invalidatesTags: [{ type: 'tagTypeBlogs' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IBlogs; message: string } } = await queryFulfilled;
          handleSuccess(data.message);
          dispatch(blogsApi.util.invalidateTags([{ type: 'tagTypeBlogs' }]));
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    updateBlogs: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/dashboard/blogs/all/api/v1`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: 'tagTypeBlogs' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    deleteBlogs: builder.mutation({
      query: ({ id }) => ({
        url: `/dashboard/blogs/all/api/v1`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'tagTypeBlogs' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkUpdateBlogs: builder.mutation({
      query: bulkData => ({
        url: `/dashboard/blogs/all/api/v1?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: 'tagTypeBlogs' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkDeleteBlogs: builder.mutation({
      query: bulkData => ({
        url: `/dashboard/blogs/all/api/v1?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: 'tagTypeBlogs' }],
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
  useGetBlogsQuery,
  useAddBlogsMutation,
  useUpdateBlogsMutation,
  useDeleteBlogsMutation,
  useBulkUpdateBlogsMutation,
  useBulkDeleteBlogsMutation,
  useGetBlogsByIdQuery,
} = blogsApi;

export default blogsApi;
