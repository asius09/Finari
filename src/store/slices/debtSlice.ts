// features/debts/debtsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Debt } from "@/types/modelTypes";
import { LoadingType } from "@/constants/constant";

interface DebtsState {
  debts: Debt[];
  loading: LoadingType;
  error: string | null;
}

const initialState: DebtsState = {
  debts: [],
  loading: "idle",
  error: null,
};

// Async Thunk for fetching initial debts
export const fetchInitialDebts = createAsyncThunk(
  "debts/fetchInitialDebts",
  async () => {
    const response = await fetch("/api/debts"); // Create this API route
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
);

const debtsSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    setInitialDebts(state, action: PayloadAction<Debt[]>) {
      state.debts = action.payload;
      state.loading = "succeeded";
      state.error = null;
    },
    addOptimisticDebt(state, action: PayloadAction<Debt>) {
      state.debts.push(action.payload);
    },
    removeOptimisticDebt(state, action: PayloadAction<string>) {
      state.debts = state.debts.filter(debt => debt.id !== action.payload);
    },
    updateOptimisticDebt(state, action: PayloadAction<Debt>) {
      const index = state.debts.findIndex(
        debt => debt.id === action.payload.id
      );
      if (index !== -1) {
        state.debts[index] = action.payload;
      }
    },
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialDebts.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchInitialDebts.fulfilled,
        (state, action: PayloadAction<Debt[]>) => {
          state.loading = "succeeded";
          state.error = null;
          state.debts = action.payload;
        }
      )
      .addCase(fetchInitialDebts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch debts.";
      });
  },
});

export const {
  setInitialDebts,
  addOptimisticDebt,
  removeOptimisticDebt,
  updateOptimisticDebt,
  resetState,
} = debtsSlice.actions;

export const selectDebts = (state: any) => state.debts.debts;
export const selectDebtsLoading = (state: any) => state.debts.loading;
export const selectDebtsError = (state: any) => state.debts.error;

export default debtsSlice.reducer;
