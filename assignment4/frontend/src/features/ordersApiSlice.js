import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (id) => `/products/orders/${id}`,
      transformResponse: (responseData) => {
        return ordersAdapter.setAll(initialState, responseData);
      },
      providesTags: ["Order"],
    }),
    postOrder: builder.mutation({
      query: (data) => ({
        url: "/products/checkout",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { usePostOrderMutation, useGetOrdersQuery } = ordersApiSlice;
