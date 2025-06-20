"use client";
// features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoadingTypeEnum } from "@/constants";
import { loginFormSchema } from "@/schema/loginForm.schema";
import { z } from "zod";

interface User {
  id: string;
  // Add other user properties as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  loading: LoadingTypeEnum;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: LoadingTypeEnum.IDLE,
  error: null,
};

// Async Thunk for user login (returns user)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const responseData = await response.json();

      if (!responseData.success) {
        const { errors } = responseData;
        let errorMessage: string;
        if (errors) {
          if (typeof errors === "string") {
            errorMessage = errors;
          } else {
            errorMessage = Object.values(errors).flat().join(", ");
          }
        } else {
          errorMessage = `Login failed with status: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const { data } = responseData;
      return data || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred during login");
    }
  }
);

// Async Thunk for checking authentication status on app load (e.g., using a session cookie)
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async () => {
    try {
      const response = await fetch("/api/auth/status");
      if (response.ok) {
        const data = await response.json();
        return {
          isAuthenticated: data.isAuthenticated,
          user: data.user as User,
        };
      } else {
        throw new Error("Failed to check auth status");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred while checking auth status");
    }
  }
);

// Async Thunk for user logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to logout");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during logout");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStateFromHydration(
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
    ) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.loading = LoadingTypeEnum.SUCCEEDED;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error?.message || "Login failed.";
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error?.message || "Logout failed.";
      })
      .addCase(checkAuthStatus.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(
        checkAuthStatus.fulfilled,
        (
          state,
          action: PayloadAction<{
            isAuthenticated: boolean;
            user: User | null;
          }>
        ) => {
          state.loading = LoadingTypeEnum.SUCCEEDED;
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error?.message || "Failed to check auth status.";
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setAuthStateFromHydration, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
