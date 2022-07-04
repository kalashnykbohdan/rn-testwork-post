import { createSlice } from "@reduxjs/toolkit";

const authState = {
  userId: null,
  name: null,
  email: null,
  stateChange: false,
  preloading: true,
  modal: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    updateUserPtofile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSihnOut: () => authState,

    preLoading: (state, { payload }) => ({
      ...state,
      preloading: payload.preloading,
    }),
    isModal: (state, { payload }) => ({
      ...state,
      modal: payload.modal,
    }),
  },
});
