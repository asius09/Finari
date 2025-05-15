import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { LoadingType, WalletType } from "@/constants/constant";

export const walletSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Wallet name is required"),
  type: z.enum(Object.values(WalletType) as [string, ...string[]]),
  balance: z.number().min(0, "Balance cannot be negative"),
  icon: z.string().optional(),
});

export type Wallet = z.infer<typeof walletSchema>;

interface WalletState {
  wallets: Wallet[];
  loading: LoadingType;
  error: string | null;
}

const initialState: WalletState = {
  wallets: [],
  loading: "idle",
  error: null,
};

export const fetchWallets = createAsyncThunk<Wallet[], string>(
  "wallets/fetchWallets",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/wallets?userId=${encodeURIComponent(userId)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || `Failed to fetch wallets: ${response.status}`
        );
      }
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch wallets");
      }
      return rejectWithValue(
        "An unknown error occurred while fetching wallets"
      );
    }
  }
);

export const modifyWallet = createAsyncThunk<Wallet, { wallet: Wallet }>(
  "wallets/modifyWallet",
  async ({ wallet }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/wallets?id=${encodeURIComponent(wallet.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...wallet }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || `Failed to modify wallet: ${response.status}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to modify wallet");
      }
      return rejectWithValue(
        "An unknown error occurred while modifying wallet"
      );
    }
  }
);

export const addWallet = createAsyncThunk<
  Wallet,
  { wallet: Omit<Wallet, "id">; userId: string }
>("wallets/addWallet", async ({ wallet, userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `/api/wallets?userId=${encodeURIComponent(userId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wallet),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.message || `Failed to add wallet: ${response.status}`
      );
    }
    const data: Wallet = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to add wallet");
    }
    return rejectWithValue("An unknown error occurred while adding wallet");
  }
});

export const removeWallet = createAsyncThunk<Wallet, { walletId: string }>(
  "wallets/removeWallet",
  async ({ walletId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/wallets?id=${encodeURIComponent(walletId)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || `Failed to remove wallet: ${response.status}`
        );
      }
      return { id: walletId } as Wallet;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to remove wallet");
      }
      return rejectWithValue("An unknown error occurred while removing wallet");
    }
  }
);

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    updateWallet: (state, action: PayloadAction<Wallet>) => {
      const index = state.wallets.findIndex(
        wallet => wallet.id === action.payload.id
      );
      if (index !== -1) {
        state.wallets[index] = action.payload;
      }
    },
    deleteWallet: (state, action: PayloadAction<string>) => {
      state.wallets = state.wallets.filter(
        wallet => wallet.id !== action.payload
      );
    },
    hydrateWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.wallets = action.payload;
      state.loading = "succeeded";
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWallets.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.wallets = action.payload;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Failed to fetch wallets";
      })
      .addCase(addWallet.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addWallet.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.wallets.push(action.payload);
      })
      .addCase(addWallet.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Failed to add wallet";
      })
      .addCase(removeWallet.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(removeWallet.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.wallets = state.wallets.filter(
          wallet => wallet.id !== action.payload.id
        );
      })
      .addCase(removeWallet.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Failed to remove wallet";
      })
      .addCase(modifyWallet.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(modifyWallet.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Failed to update wallet";
      })
      .addCase(modifyWallet.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.wallets = state.wallets.map(wallet =>
          wallet.id === action.payload?.id ? action.payload : wallet
        );
      });
  },
});

export const { updateWallet, deleteWallet, hydrateWallets } =
  walletSlice.actions;

export const selectAllWallets = (state: { wallets: WalletState }) =>
  state.wallets.wallets;
export const selectWalletsLoading = (state: { wallets: WalletState }) =>
  state.wallets.loading;
export const selectWalletsError = (state: { wallets: WalletState }) =>
  state.wallets.error;

export default walletSlice.reducer;
