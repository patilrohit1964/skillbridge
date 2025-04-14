import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/user" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),
    forgotPass: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPass: builder.mutation({
      query: (data) => ({
        url: "/reset-pass",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useForgotPassMutation,
  useResetPassMutation,
} = authApi;
export default authApi;
