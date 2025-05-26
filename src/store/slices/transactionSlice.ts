// features/transactions/transactionsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/modelTypes";
import { Filters, LoadingTypeEnum } from "@/constants";

interface TransactionsState {
  transactions: Transaction[];
  loading: LoadingTypeEnum;
  error: string | null;
  hasMore: boolean;
  totalCount: number | null;
  filters: Filters;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: LoadingTypeEnum.IDLE,
  error: null,
  hasMore: false,
  totalCount: null,
  filters: Filters.PERIOD_FILTERS,
};

// TODO: Add error handling middleware for consistent error reporting
// TODO: Add caching mechanism for fetched transactions
// TODO: Add transaction validation before API calls

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async ({
    userId,
    transaction,
  }: {
    userId: string;
    transaction: Omit<Transaction, "created_at" | "id" | "user_id">;
  }) => {
    try {
      const response = await fetch(`/api/transactions?user=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...transaction }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to add transaction:", error);
      throw error;
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (userId: string) => {
    try {
      const response = await fetch(`/api/transactions?user=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (transaction: Transaction) => {
    try {
      const response = await fetch(`/api/transactions?id=${transaction.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to update transaction:", error);
      throw error;
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId: string) => {
    try {
      const response = await fetch(`/api/transactions?id=${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return transactionId;
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      throw error;
    }
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
      state.loading = LoadingTypeEnum.SUCCEEDED;
      state.error = null;
      state.hasMore =
        action.payload.data.length > 0 &&
        (state.totalCount === null ||
          state.transactions.length < state.totalCount);
    },
    addOptimisticTransaction(state, action: PayloadAction<Transaction>) {
      // Prevent duplicate transactions
      if (!state.transactions.some(tx => tx.id === action.payload.id)) {
        state.transactions.unshift(action.payload);
      }
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
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
      state.transactions = [];
      state.loading = LoadingTypeEnum.IDLE;
      state.hasMore = false;
    },
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (
          state,
          action: PayloadAction<{ data: Transaction[]; totalCount?: number }>
        ) => {
          // Filter out duplicates before adding new transactions
          const newTransactions = action.payload.data.filter(
            newTx =>
              !state.transactions.some(existingTx => existingTx.id === newTx.id)
          );

          state.loading = LoadingTypeEnum.SUCCEEDED;
          state.error = null;
          state.transactions = [...state.transactions, ...newTransactions];
          state.totalCount = action.payload.totalCount ?? state.totalCount;
          state.hasMore =
            action.payload.data.length > 0 &&
            (state.totalCount === null ||
              state.transactions.length < state.totalCount);
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to fetch transactions.";
      })
      .addCase(addTransaction.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        // Add new transaction to the beginning of the list
        if (!state.transactions.some(tx => tx.id === action.payload.id)) {
          state.transactions.unshift(action.payload);
        }
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to add transaction.";
      })
      .addCase(updateTransaction.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          tx => tx.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to update transaction.";
      })
      .addCase(deleteTransaction.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          tx => tx.id !== action.payload
        );
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to delete transaction.";
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

export default transactionsSlice.reducer;
