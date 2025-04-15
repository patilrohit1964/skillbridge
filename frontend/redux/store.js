import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authApi from "../pages/api/authApi";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  // whitelist:[] //what we want to persist in localstorage
  // blacklist:[] //what we cnnot want to persist in localstorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
export const persistor = persistStore(store);
export default store;
