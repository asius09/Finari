import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProfile, setError, setLoading } from "../userProfileSlice";
import type { RootState } from "../../store";

// Mock or real fetch
export const fetchUserProfile = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("userProfile/fetch", async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    // Replace with actual API call
    const res = await fetch("/api/user/profile");
    const data = await res.json();

    dispatch(
      setProfile({
        full_name: data.full_name,
        email: data.email,
        avatarUrl: data.avatar_url,
        bio: data.bio,
      })
    );
  } catch (err: unknown) {
    let errorMessage = "Failed to fetch profile";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
});
