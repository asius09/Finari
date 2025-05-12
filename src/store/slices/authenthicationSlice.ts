"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string | null;
    email: string | null;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    email: null,
  },
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (
      state,
      action: PayloadAction<{ id: string; email: string }>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthUser: state => {
      state.user = { id: null, email: null };
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAuthUser, clearAuthUser, setLoading, setError } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
