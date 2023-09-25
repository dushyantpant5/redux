import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { nanoid } from '@reduxjs/toolkit';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => `/todos`,
      providesTags:['todos']
    }),
    createTodo: builder.mutation({
        query: (todo) => ({
            url:`/todos`,
            method:'POST',
            body: {
                id:nanoid(),
                todo:todo
            }
        }),
        invalidatesTags: ['todos']
    }),
    deleteTodo: builder.mutation({
        query: (id)=>({
            url:`/todos/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['todos']
    })
  }),
});

export const { useGetAllTodosQuery , useCreateTodoMutation , useDeleteTodoMutation} = todoApi;