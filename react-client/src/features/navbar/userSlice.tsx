import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../models/User";
const { VITE_API_URL } = import.meta.env;

const url = VITE_API_URL + "/employees";

export const userSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "myinfo",
      })
    })
  })
});

export const { useGetUserQuery } = userSlice;
