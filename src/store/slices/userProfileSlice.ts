import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/modelTypes";

interface UserProfileState extends Omit<UserProfile, "id" | "created_at"> {
  email: string;
  bio: string;
  isLoading: boolean;
  error: string | null;
  avatarUrl: string; // Alias for avatar_url to maintain consistency with existing code
}

const initialState: UserProfileState = {
  full_name: "",
  email: "",
  avatarUrl: "",
  bio: "",
  isLoading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<Omit<UserProfileState, "isLoading" | "error">>
    ) => {
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.bio = action.payload.bio;
    },
    updateProfile: (
      state,
      action: PayloadAction<
        Partial<Omit<UserProfileState, "isLoading" | "error">>
      >
    ) => {
      Object.assign(state, action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const { setProfile, updateProfile, setLoading, setError, resetProfile } =
  userProfileSlice.actions;
export const userProfileReducer = userProfileSlice.reducer;
