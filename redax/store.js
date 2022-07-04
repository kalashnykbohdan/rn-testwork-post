import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./auth/aurhReaducer";
import { postSlice } from "./dashboard/posts/postsReaducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postSlice.name]: postSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
