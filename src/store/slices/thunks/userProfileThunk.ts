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
  } catch (err: any) {
    dispatch(setError(err.message || "Failed to fetch profile"));
  } finally {
    dispatch(setLoading(false));
  }
});
