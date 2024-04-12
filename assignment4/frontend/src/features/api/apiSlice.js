import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/app2`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("This is from the verifyToken", result.error);
  if (result?.error?.originalStatus === 403) {
    // console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      `${import.meta.env.VITE_BASE_URL}/app2/auth/refresh`,
      api,
      extraOptions
    );
    // console.log(
    //   "this is from the refreshTokenController, the refresh result is:-",
    //   refreshResult
    // );
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Order"],
  endpoints: (builder) => ({}),
});
