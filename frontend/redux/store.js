import { configureStore } from "@reduxjs/toolkit";
import authApi from "../pages/api/authApi";
import authSlice from "./features/authSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;
