const { combineReducers } = require("@reduxjs/toolkit");
import { authApi } from "@/pages/api/authApi";
import authSlice from "./features/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
