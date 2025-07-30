// features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/modelTypes";
import { LoadingTypeEnum } from "@/constants";
import { ApiResponse } from "@/types/api-response";
import { CURRENCIES } from "@/constants/currencies.constant";

interface UserState {
  profile: UserProfile | null;
  loading: LoadingTypeEnum;
  error: string | null;
  currencySymbol: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: LoadingTypeEnum.IDLE,
  error: null,
  currencySymbol: null,
};

/**
 * Async Thunk for fetching user profile information
 *
 * This function handles fetching user profile data through the API, with comprehensive
 * error handling for various failure scenarios. It provides clear error messages
 * that can be displayed to the user.
 *
 * @param {string} userId - The ID of the user whose profile is being fetched
 *
 * @returns {Promise<UserProfile>} - Returns the user profile data
 * @throws {Error} - Throws an error with user-friendly message if the fetch fails
 */
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/profile?user-id=${userId}`);

      // Handle specific error cases with user-friendly messages
      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        if (response.status === 401) {
          return rejectWithValue({
            message: "Please log in to access your profile.",
            status: response.status,
          });
        } else if (response.status === 403) {
          return rejectWithValue({
            message: "You can only access your own profile.",
            status: response.status,
          });
        } else if (response.status === 404) {
          return rejectWithValue({
            message: "Profile not found. Please contact support.",
            status: response.status,
          });
        } else {
          return rejectWithValue({
            message:
              errorData?.message ||
              "Something went wrong while fetching your profile. Please try again.",
            status: response.status,
          });
        }
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

/**
 * Async Thunk for updating user profile information
 *
 * This function handles updating user profile data through the API, with comprehensive
 * error handling for various failure scenarios. It provides clear error messages
 * that can be displayed to the user.
 *
 * @param {Object} params - Parameters containing the updated profile data and user ID
 * @param {Partial<UserProfile>} params.updatedProfile - The profile fields to update
 * @param {string} params.userId - The ID of the user whose profile is being updated
 *
 * @returns {Promise<UserProfile>} - Returns the updated user profile data
 * @throws {Error} - Throws an error with user-friendly message if the update fails
 */
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({
    updatedProfile,
    userId,
  }: {
    updatedProfile: Partial<UserProfile>;
    userId: string;
  }) => {
    try {
      // Make API request to update profile
      const response = await fetch(`/api/user/profile?user-id=${userId}`, {
        method: "PATCH", // Using PATCH as requested
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      // Parse response data
      const data: ApiResponse<UserProfile> = await response.json();

      // Handle specific error cases with user-friendly messages
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to update your profile.");
        } else if (response.status === 403) {
          throw new Error("You can only update your own profile.");
        } else if (response.status === 404) {
          throw new Error("Profile not found. Please contact support.");
        } else if (response.status === 405) {
          throw new Error("Method not allowed. Please check your request.");
        } else {
          throw new Error(
            "Something went wrong while updating your profile. Please try again."
          );
        }
      }

      // Validate response structure
      if (!data.success) {
        throw new Error(
          data.message || "Profile update failed. Please try again."
        );
      }

      if (!data.data) {
        throw new Error(
          "We received an incomplete response. Please try again."
        );
      }

      // Return updated profile data
      return data.data;
    } catch (error: unknown) {
      // Handle and log errors with user-friendly messages
      if (error instanceof Error) {
        console.error("Profile update error:", error.message);
        // Preserve the user-friendly error message
        throw error;
      }

      console.error("An unexpected error occurred during profile update");
      throw new Error("An unexpected error occurred. Please try again later.");
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
      state.loading = LoadingTypeEnum.SUCCEEDED;
      state.error = null;
    },
    clearUserProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = LoadingTypeEnum.SUCCEEDED;
          state.profile = action.payload;
          state.error = null;
          state.currencySymbol = CURRENCIES.find(currency => currency.code.toLowerCase() === action.payload.currency.toLowerCase())?.symbol || null;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error =
          (action.payload as { message: string })?.message ||
          action.error?.message ||
          "Failed to fetch user profile.";
        state.profile = null;
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = LoadingTypeEnum.SUCCEEDED;
          state.profile = action.payload;
          state.error = null;
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error?.message || "Failed to update user profile.";
      });
  },
});

export const { setUserProfileFromHydration, clearUserProfileError } =
  userSlice.actions;

export default userSlice.reducer;
