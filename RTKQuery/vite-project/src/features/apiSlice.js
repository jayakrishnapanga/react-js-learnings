import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),

  // 1. Register ALL tag types you plan to use across all endpoints
  tagTypes: ['Post', 'User', 'Comment'],

  endpoints: (builder) => ({

    // ─── POST endpoints ───────────────────────────────────────────
    getPosts: builder.query({
      query: () => '/posts?_limit=5',
      providesTags: ['Post'],           // labels this cache as 'Post'
    }),
    addPost: builder.mutation({
      query: (newPost) => ({ url: '/posts', method: 'POST', body: newPost }),
      invalidatesTags: ['Post'],        // only 'Post' cache refetches — User & Comment are untouched
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Post'],        // again, only Post list refetches
    }),

    // ─── USER endpoints ───────────────────────────────────────────
    getUsers: builder.query({
      query: () => '/users?_limit=5',
      providesTags: ['User'],           // labels this cache as 'User'
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({ url: '/users', method: 'POST', body: newUser }),
      invalidatesTags: ['User'],        // only 'User' cache refetches — Post & Comment untouched
    }),

    // ─── COMMENT endpoints ────────────────────────────────────────
    getComments: builder.query({
      query: () => '/comments?_limit=5',
      providesTags: ['Comment'],        // labels this cache as 'Comment'
    }),
    addComment: builder.mutation({
      query: (newComment) => ({ url: '/comments', method: 'POST', body: newComment }),
      invalidatesTags: ['Comment'],     // only 'Comment' cache refetches
    }),

    // ─── CROSS-TAG example ────────────────────────────────────────
    // Imagine deleting a user should also clear their posts and comments
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['User', 'Post', 'Comment'], // all three caches refetch!
    }),

  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteUserMutation,
} = apiSlice;
