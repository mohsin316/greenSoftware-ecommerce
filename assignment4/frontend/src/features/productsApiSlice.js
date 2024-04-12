import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/products/getAllProducts`,
      transformResponse: (responseData) => {
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (category) => `/products/category/${category}`,
      transformResponse: (responseData) => {
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: ["Product"],
    }),
    postImage: builder.mutation({
      query: (data) => {
        return {
          url: "/products/postImage",
          method: "POST",
          body: data,
          formData: true,
        };
      },
    }),
    postProduct: builder.mutation({
      query: (data) => ({
        url: "/products/postProduct",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/products/updateProduct/${data.pid}`,
          method: "PUT",
          body: { ...data },
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products/deleteProduct",
          method: "DELETE",
          body: { ...data },
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  usePostImageMutation,
  usePostProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
