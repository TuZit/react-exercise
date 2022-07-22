import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/post',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Post'],

  endpoints: (builder) => ({
    getPost: builder.query({
      query: () => '/all',
      providesTags: ['Post'],
    }),

    addPost: builder.mutation({
      query: (role) => ({
        url: '/create',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation({
      query: (role, id) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: role,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
