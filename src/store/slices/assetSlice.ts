// features/assets/assetsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "@/types/modelTypes";
import { LoadingType } from "@/constants/constant";

interface AssetsState {
  assets: Asset[];
  loading: LoadingType;
  error: string | null;
}

const initialState: AssetsState = {
  assets: [],
  loading: "idle",
  error: null,
};

// Async Thunk for fetching initial assets
export const fetchInitialAssets = createAsyncThunk(
  "assets/fetchInitialAssets",
  async () => {
    const response = await fetch("/api/assets"); // Create this API route
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
);

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setInitialAssets(state, action: PayloadAction<Asset[]>) {
      state.assets = action.payload;
      state.loading = "succeeded";
      state.error = null;
    },
    addOptimisticAsset(state, action: PayloadAction<Asset>) {
      state.assets.push(action.payload);
    },
    removeOptimisticAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
    },
    updateOptimisticAsset(state, action: PayloadAction<Asset>) {
      const index = state.assets.findIndex(
        asset => asset.id === action.payload.id
      );
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialAssets.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchInitialAssets.fulfilled,
        (state, action: PayloadAction<Asset[]>) => {
          state.loading = "succeeded";
          state.error = null;
          state.assets = action.payload;
        }
      )
      .addCase(fetchInitialAssets.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch assets.";
      });
  },
});

export const {
  setInitialAssets,
  addOptimisticAsset,
  removeOptimisticAsset,
  updateOptimisticAsset,
  resetState,
} = assetsSlice.actions;

export const selectAssets = (state: any) => state.assets.assets;
export const selectAssetsLoading = (state: any) => state.assets.loading;
export const selectAssetsError = (state: any) => state.assets.error;

export default assetsSlice.reducer;
