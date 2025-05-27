// features/debts/debtsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Debt } from "@/types/modelTypes";
import { LoadingTypeEnum } from "@/constants";
import { z } from "zod";
import { debtFormSchema, debtsSchema } from "@/schema/debts.schema";

interface DebtsState {
  debts: Debt[];
  totalOutstanding: number;
  totalMonltyPayment: number;
  //TODO: add total time to pay all
  loading: LoadingTypeEnum;
  error: string | null;
}

const initialState: DebtsState = {
  totalOutstanding: 0,
  totalMonltyPayment: 0,
  debts: [],
  loading: LoadingTypeEnum.IDLE,
  error: null,
};

// Async Thunk for fetching initial debts
export const fetchInitialDebts = createAsyncThunk(
  "debts/fetchInitialDebts",
  async ({ userId }: { userId: string }) => {
    try {
      if (!userId || userId === "") {
        console.error("Fetching Debts Failed, no user ID present");
        return;
      }
      const response = await fetch(`/api/debts?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Failed to Fetch Debts", error);
      }
      console.log("Failed to Fetch Debts", error);
    }
  }
);

// Async Thunk for Add Debts
export const addDebts = createAsyncThunk(
  "debts/addwallet",
  async ({
    userId,
    debt,
  }: {
    userId: string;
    debt: z.infer<typeof debtFormSchema>;
  }) => {
    try {
      if (!userId || userId === "") {
        console.error("Fetching Debts Failed, no user ID present");
        return;
      }
      const validateDebt = debtFormSchema.safeParse(debt);
      if (!validateDebt.success) {
        const error = validateDebt.error.flatten().fieldErrors;
        console.error("Adding Debt Failed", error);
      }
      const response = await fetch(`/api/debts?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
        },
        body: JSON.stringify(debt),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to add debts: ", error);
      }
      console.error("Failed to add debts: ", error);
    }
  }
);

export const updateDebt = createAsyncThunk(
  "debts/updatedDebt",
  async ({
    userId,
    debt,
  }: {
    userId: string;
    debt: z.infer<typeof debtsSchema>;
  }) => {
    try {
      if (!userId || userId === "") {
        console.error("Updating Debts Failed, no user ID present");
        return;
      }
      const validateDebt = debtsSchema.safeParse(debt);
      if (!validateDebt.success) {
        const error = validateDebt.error.flatten().fieldErrors;
        console.error("Updating Debt Failed", error);
      }
      const response = await fetch(`/api/debts?userId=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(debt),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Failed to update dabts:", error);
      }
      console.error("Failed to update debts: ", error);
    }
  }
);

export const deleteDebt = createAsyncThunk(
  "debts/deleteDebt",
  async (debtId: string) => {
    try {
      if (!debtId) {
        console.error("Failed to delete debt, No Debt ID Present");
      }
      const response = await fetch(`/api/debts?id=${debtId}`);
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      const data = await response.json();
      return { ...data.data, id: debtId };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Failed to delete dabts:", error);
      }
      console.error("Failed to delete debts: ", error);
    }
  }
);

/**
 * Calculates the total monthly payment across all debts
 * @param {Debt[]} debts - Array of debt objects
 * @returns {number} - Sum of all monthly payments (defaults to 0 if payment_amount is undefined)
 */
const calculateTotalMonthlyPayment = (debts: Debt[]): number => {
  return debts.reduce((sum, debt) => sum + (debt.payment_amount || 0), 0);
};

/**
 * Calculates the total outstanding balance across all debts
 * @param {Debt[]} debts - Array of debt objects
 * @returns {number} - Sum of all outstanding balances
 */
const calculateTotalOutstanding = (debts: Debt[]): number => {
  return debts.reduce((sum, debt) => sum + debt.outstanding_balance, 0);
};
const debtsSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    setInitialDebts(state, action: PayloadAction<Debt[]>) {
      state.debts = action.payload;
      state.loading = LoadingTypeEnum.SUCCEEDED;
      state.error = null;
      state.totalOutstanding = calculateTotalOutstanding(action.payload);
      state.totalMonltyPayment = calculateTotalMonthlyPayment(action.payload);
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
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(
        fetchInitialDebts.fulfilled,
        (state, action: PayloadAction<Debt[]>) => {
          state.loading = LoadingTypeEnum.SUCCEEDED;
          state.error = null;
          state.debts = action.payload;
          state.totalOutstanding = calculateTotalOutstanding(action.payload);
          state.totalMonltyPayment = calculateTotalMonthlyPayment(
            action.payload
          );
        }
      )
      .addCase(fetchInitialDebts.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to fetch debts.";
      })
      .addCase(addDebts.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(addDebts.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
        state.debts.push(action.payload);
        state.totalOutstanding = calculateTotalOutstanding(state.debts);
        state.totalMonltyPayment = calculateTotalMonthlyPayment(state.debts);
      })
      .addCase(addDebts.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to add debt.";
      })
      .addCase(updateDebt.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(updateDebt.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
        const index = state.debts.findIndex(
          debt => debt.id === action.payload.id
        );
        state.debts[index] = action.payload;
        state.totalOutstanding = calculateTotalOutstanding(state.debts);
        state.totalMonltyPayment = calculateTotalMonthlyPayment(state.debts);
      })
      .addCase(updateDebt.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to update debt.";
      })
      .addCase(deleteDebt.pending, state => {
        state.loading = LoadingTypeEnum.PENDING;
        state.error = null;
      })
      .addCase(deleteDebt.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.loading = LoadingTypeEnum.SUCCEEDED;
        state.error = null;
        state.debts = state.debts.filter(debt => debt.id !== action.payload.id);
        state.totalOutstanding = calculateTotalOutstanding(state.debts);
        state.totalMonltyPayment = calculateTotalMonthlyPayment(state.debts);
      })
      .addCase(deleteDebt.rejected, (state, action) => {
        state.loading = LoadingTypeEnum.FAILED;
        state.error = action.error.message || "Failed to delete debt.";
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

export default debtsSlice.reducer;
