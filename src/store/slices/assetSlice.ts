// features/assets/assetsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { assetSchema } from "@/schema/asset.schema";
import { LoadingTypeEnum } from "@/constants";
import { assetFormSchema } from "@/schema/asset.schema";
import { z } from "zod";

type Asset = z.infer<typeof assetSchema>;

interface AssetsState {
  assets: Asset[];
  totalAssetsValue: number;
  totalInvestment: number;
  loading: LoadingTypeEnum;
  error: string | null;
}

const initialState: AssetsState = {
  assets: [],
  totalAssetsValue: 0,
  totalInvestment: 0,
  loading: LoadingTypeEnum.IDLE,
  error: null,
};

// Async Thunk for fetching initial assets
export const fetchInitialAssets = createAsyncThunk(
  "assets/fetchInitialAssets",
  async (userId: string) => {
    try {
      const response = await fetch(`/api/assets?userId=${userId}`); // Create this API route
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP ERROR, Failed to add Asset ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      console.log("Failed to fetch asset");
      if (error instanceof Error) {
        throw new Error("Failed to fetch asset", error);
      }
    }
  }
);

//Async Thunk for Add Asset
export const addAsset = createAsyncThunk(
  "assets/addAsset",
  async ({
    userId,
    asset,
  }: {
    userId: string;
    asset: z.infer<typeof assetFormSchema>;
  }) => {
    try {
      const validateAsset = assetFormSchema.safeParse(asset);
      if (!validateAsset.success) {
        throw new Error("Asset missing Property", validateAsset.error);
      }
      const response = await fetch(`/api/assets?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(asset),
      });
      if (!response.ok) {
        throw new Error(`HTTP ERROR, Failed to add Asset ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      console.log("Failed to add asset");
      if (error instanceof Error) {
        throw new Error("Failed to add asset", error);
      }
    }
  }
);

const calculateAssetValue = (assets: Asset[]): number => {
  return assets.reduce((sum, asset) => sum + asset.current_value, 0);
};

const calculateTotalInvesment = (assets: Asset[]): number => {
  return assets.reduce((sum, asset) => sum + (asset?.purchase_price || 0), 0);
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setInitialAssets(state, action: PayloadAction<Asset[]>) {
      state.assets = action.payload;
      state.loading = LoadingTypeEnum.SUCCEEDED;
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
      .addCase(
        fetchInitialAssets.fulfilled,
        (state, action: PayloadAction<Asset[]>) => {
          state.loading = LoadingTypeEnum.SUCCEEDED;
          state.error = null;
          state.assets = action.payload;
          state.totalAssetsValue = calculateAssetValue(action.payload);
          state.totalInvestment = calculateTotalInvesment(action.payload);
        }
      )
      .addCase(fetchInitialAssets.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(fetchInitialAssets.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to fetch assets.";
      })
      .addCase(addAsset.fulfilled, (state, action: PayloadAction<Asset>) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
        state.assets.push(action.payload);
        state.totalAssetsValue = calculateAssetValue(state.assets);
        state.totalInvestment = calculateTotalInvesment(state.assets);
      })
      .addCase(addAsset.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(addAsset.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to add assets.";
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

export default assetsSlice.reducer;
