// features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/modelTypes";
import { LoadingType } from "@/constants/constant";
import { ApiResponse } from "@/types/api-response";

interface UserState {
  profile: UserProfile | null;
  loading: LoadingType;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: "idle",
  error: null,
};

// Async Thunk for fetching the user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/profile?user-id=${userId}`);

      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        return rejectWithValue({
          message:
            errorData?.message ||
            `Failed to fetch profile with status: ${response.status}`,
          status: response.status,
        });
      }

      const data: ApiResponse<UserProfile> = await response.json();

      if (!data.success) {
        return rejectWithValue({
          message: data.message || "Failed to fetch profile",
          status: response.status,
        });
      }

      if (!data.data) {
        return rejectWithValue({
          message: "Profile data is missing in the response",
          status: 500,
        });
      }

      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue({
          message: error.message,
          status: 500,
        });
      }
      return rejectWithValue({
        message: "An unknown error occurred while fetching profile",
        status: 500,
      });
    }
  }
);

// Async Thunk for updating the user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedProfile: Partial<UserProfile>) => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      const data: ApiResponse<UserProfile> = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Failed to update profile with status: ${response.status}`
        );
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to update profile");
      }

      if (!data.data) {
        throw new Error("Profile data is missing in the response");
      }

      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred while updating profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfileFromHydration(
      state,
      action: PayloadAction<UserProfile | null>
    ) {
      state.profile = action.payload;
      state.loading = "succeeded";
      state.error = null;
    },
    clearUserProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = "succeeded";
          state.profile = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          (action.payload as { message: string })?.message ||
          action.error?.message ||
          "Failed to fetch user profile.";
        state.profile = null;
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = "succeeded";
          state.profile = action.payload;
          state.error = null;
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error?.message || "Failed to update user profile.";
      });
  },
});

export const { setUserProfileFromHydration, clearUserProfileError } =
  userSlice.actions;

export const selectUserProfile = (state: any) => state.user.profile;
export const selectUserProfileLoading = (state: any) => state.user.loading;
export const selectUserProfileError = (state: any) => state.user.error;
export const selectUserTheme = (state: any) => state.user.profile?.theme;
export const selectUserCurrency = (state: any) => state.user.profile?.currency;

export default userSlice.reducer;
