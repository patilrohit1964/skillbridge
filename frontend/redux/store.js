import { configureStore } from "@reduxjs/toolkit";
import authApi from "../pages/api/authApi";
import authSlice from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  // whitelist:[] //what we want to persist in localstorage
  // blacklist:[] //what we cnnot want to persist in localstorage
};

const persistReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
export const persistor = persistStore(store);
export default store;
