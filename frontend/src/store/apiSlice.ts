import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api', credentials: 'include' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    createProject: builder.mutation({
      query: (title) => ({
        url: '/projects/create',
        method: 'POST',
        body: { title },
      }),
    }),
    getProjects: builder.query({
      query: () => '/projects',
    }),
    createTodo: builder.mutation({
      query: ({ description, projectId }) => ({
        url: '/todos/create',
        method: 'POST',
        body: { description, projectId },
      }),
    }),
    updateTodoStatus: builder.mutation({
      query: ({ todoId, status }) => ({
        url: '/todos/update-status',
        method: 'PATCH',
        body: { todoId, status },
      }),
    }),
    getTodosByProject: builder.query({
      query: (projectId) => `/todos?projectId=${projectId}`,
    }),
    exportProjectAsGist: builder.mutation({
   query: ({ projectId, githubToken }) => ({
     url: `/projects/export-gist/${projectId}`,
     method: 'POST',
     body: { githubToken },
   }),
 }),

    getProject: builder.query({
      query: (id) => `/projects/${id}`, 
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/update-user',
        method: 'PUT',
        body: userData,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: 'DELETE',
      }),
    }),
    updateProjectTitle: builder.mutation({
      query: ({ projectId, title }) => ({
        url: `/projects/${projectId}`,
        method: 'PUT',
        body: { title },
      }),
    }),
  }),
  
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCreateProjectMutation,
  useGetProjectsQuery,
  useCreateTodoMutation,
  useUpdateTodoStatusMutation,
  useGetTodosByProjectQuery,
  useExportProjectAsGistMutation,
  useGetProjectQuery,
  useUpdateUserMutation,
  useUpdateProjectTitleMutation,
  useDeleteTodoMutation
} = apiSlice;
