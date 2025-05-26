import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { LoadingTypeEnum, WalletTypesEnum } from "@/constants";

export const walletSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Wallet name is required"),
  type: z.enum(Object.values(WalletTypesEnum) as [string, ...string[]]),
  balance: z.number().min(0, "Balance cannot be negative"),
  icon: z.string().optional(),
});

export type Wallet = z.infer<typeof walletSchema>;

interface WalletState {
  wallets: Wallet[];
  loading: LoadingTypeEnum;
  error: string | null;
  totalBalance: number;
}

const initialState: WalletState = {
  wallets: [],
  totalBalance: 0,
  loading: LoadingTypeEnum.IDLE,
  error: null,
};

const calculateTotalBalance = (wallets: Wallet[]): number => {
  return wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
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
    const data = await response.json();
    return data.data;
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
    calculateBalance: state => {
      state.totalBalance = calculateTotalBalance(state.wallets);
    },
    updateWallet: (state, action: PayloadAction<Wallet>) => {
      const index = state.wallets.findIndex(
        wallet => wallet.id === action.payload.id
      );
      if (index !== -1) {
        state.wallets[index] = action.payload;
        state.totalBalance = calculateTotalBalance(state.wallets);
      }
    },
    deleteWallet: (state, action: PayloadAction<string>) => {
      state.wallets = state.wallets.filter(
        wallet => wallet.id !== action.payload
      );
      state.totalBalance = calculateTotalBalance(state.wallets);
    },
    hydrateWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.wallets = action.payload;
      state.totalBalance = calculateTotalBalance(action.payload);
      state.loading = LoadingTypeEnum.SUCCEEDED;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWallets.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.wallets = action.payload;
        state.totalBalance = calculateTotalBalance(action.payload);
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = (action.payload as string) || "Failed to fetch wallets";
      })
      .addCase(addWallet.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(addWallet.fulfilled, (state, action) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.wallets.push(action.payload);
        state.totalBalance = calculateTotalBalance(state.wallets);
      })
      .addCase(addWallet.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = (action.payload as string) || "Failed to add wallet";
      })
      .addCase(removeWallet.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(removeWallet.fulfilled, (state, action) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.wallets = state.wallets.filter(
          wallet => wallet.id !== action.payload.id
        );
        state.totalBalance = calculateTotalBalance(state.wallets);
      })
      .addCase(removeWallet.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = (action.payload as string) || "Failed to remove wallet";
      })
      .addCase(modifyWallet.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(modifyWallet.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = (action.payload as string) || "Failed to update wallet";
      })
      .addCase(modifyWallet.fulfilled, (state, action) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.wallets = state.wallets.map(wallet =>
          wallet.id === action.payload?.id ? action.payload : wallet
        );
        state.totalBalance = calculateTotalBalance(state.wallets);
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
export const selectTotalBalance = (state: { wallets: WalletState }) =>
  state.wallets.totalBalance;

export default walletSlice.reducer;
