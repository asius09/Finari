"use client";
// features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoadingType } from "@/constants/constant";
import { loginFormSchema } from "@/schema/loginForm.schema";
import { apiResponseSchema } from "@/schema/ApiResponse.schema";
import { z } from "zod";

interface User {
  id: string;
  // Add other user properties as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: LoadingType;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: "idle",
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
      const responseData = apiResponseSchema.parse(await response.json());

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

      const {
        data: { user },
      } = responseData;
      return user;
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
      state.loading = "succeeded";
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error?.message || "Login failed.";
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = "succeeded";
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error?.message || "Logout failed.";
      })
      .addCase(checkAuthStatus.pending, state => {
        state.loading = "pending";
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
          state.loading = "succeeded";
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error?.message || "Failed to check auth status.";
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setAuthStateFromHydration, clearAuthError } = authSlice.actions;

export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectUser = (state: any) => state.auth.user;
export const selectAuthLoading = (state: any) => state.auth.loading;
export const selectAuthError = (state: any) => state.auth.error;

export default authSlice.reducer;
