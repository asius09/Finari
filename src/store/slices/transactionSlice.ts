// features/transactions/transactionsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/modelTypes";
import { LoadingType } from "@/constants/constant";

interface TransactionsState {
  transactions: Transaction[];
  loading: LoadingType;
  error: string | null;
  hasMore: boolean; // For infinite scrolling
  totalCount: number | null; // Optional: Total number of transactions
  filters: any; // Type this more specifically based on your filter options
}

const initialState: TransactionsState = {
  transactions: [],
  loading: "idle",
  error: null,
  hasMore: false,
  totalCount: null,
  filters: {},
};

// Async Thunk for fetching initial/filtered transactions (with pagination)
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (filters: any, { getState }) => {
    const state = getState() as { transactions: TransactionsState };
    const currentState = state.transactions;
    const offset = currentState.transactions.length; // For pagination
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...filters, offset }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Expecting { data: Transaction[], totalCount?: number }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setInitialTransactions(
      state,
      action: PayloadAction<{ data: Transaction[]; totalCount?: number }>
    ) {
      state.transactions = action.payload.data;
      state.totalCount = action.payload.totalCount ?? null;
      state.loading = "succeeded";
      state.error = null;
      state.hasMore =
        action.payload.data.length > 0 &&
        (state.totalCount === null ||
          state.transactions.length < state.totalCount);
    },
    addOptimisticTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.unshift(action.payload); // Add to the beginning for immediate display
    },
    removeOptimisticTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(
        tx => tx.id !== action.payload
      );
    },
    updateOptimisticTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        tx => tx.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    setFilters(state, action: PayloadAction<any>) {
      state.filters = action.payload;
      // Note: You'll likely trigger `fetchTransactions` after setting filters
      state.transactions = []; // Reset transactions on new filter
      state.loading = "idle";
      state.hasMore = false;
    },
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (
          state,
          action: PayloadAction<{ data: Transaction[]; totalCount?: number }>
        ) => {
          state.loading = "succeeded";
          state.error = null;
          state.transactions = [...state.transactions, ...action.payload.data];
          state.totalCount = action.payload.totalCount ?? state.totalCount;
          state.hasMore =
            action.payload.data.length > 0 &&
            (state.totalCount === null ||
              state.transactions.length < state.totalCount);
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch transactions.";
      });
  },
});

export const {
  setInitialTransactions,
  addOptimisticTransaction,
  removeOptimisticTransaction,
  updateOptimisticTransaction,
  setFilters,
  resetState,
} = transactionsSlice.actions;

export const selectTransactions = (state: {
  transactions: { transactions: Transaction[] };
}) => state.transactions.transactions;
export const selectTransactionsLoading = (state: {
  transactions: { loading: LoadingType };
}) => state.transactions.loading;
export const selectTransactionsError = (state: {
  transactions: { error: string | null };
}) => state.transactions.error;
export const selectHasMoreTransactions = (state: {
  transactions: { hasMore: boolean };
}) => state.transactions.hasMore;
export const selectTransactionsFilters = (state: {
  transactions: { filters: any };
}) => state.transactions.filters;

export default transactionsSlice.reducer;
