import { configureStore } from "@reduxjs/toolkit";
import authApi from "../pages/api/authApi";
import authSlice from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  // whitelist:[] //what we want to persist in localstorage
  // blacklist:[] //what we cnnot want to persist in localstorage
};

const persistReducer = persistReducer(persistConfig);
const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export const persistor = persistStore(store);
export default store;
