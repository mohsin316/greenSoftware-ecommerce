import { apiSlice } from "./api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refresh: builder.query({
      query: () => "/auth/refresh",
    }),
    getUsers: builder.query({
      query: () => `/products/testing`,
      keepUnusedDataFor: 0.00001,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useSignupMutation,
  useLogoutMutation,
  useRefreshQuery,
} = authApiSlice;
