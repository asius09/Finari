// --- User Profile  ---
export interface UserProfile {
  id: string; // UUID (same as auth.user id)
  full_name: string;
  avatar_url?: string;
  theme?: "light" | "dark";
  currency?: string; // e.g. 'INR', 'USD'
  created_at: string; // ISO timestamp
}

// --- Wallets Table ---
export interface Wallet {
  id: string; // UUID
  user_id: string; // FK to auth.users
  name: string; // e.g. Kotak Bank
  type: "bank" | "cash";
  balance: number; // updated based on transactions
  icon?: string; // optional icon name or URL
  created_at: string; // ISO timestamp
}

// --- Transactions Table ---
export interface Transaction {
  id: string;
  user_id: string; // FK to auth.user.id
  wallet_id: string; // FK to Wallet
  amount: number;
  type: "income" | "expense";
  category: string; // e.g., 'Food', 'Bills', 'Salary'
  description?: string;
  date: string; // ISO date string
  created_at: string;
}

// --- Monthly Summary Table ---
export interface MonthlySummary {
  id: string;
  user_id: string;
  month: string; // format: 'YYYY-MM'
  total_income: number;
  total_expense: number;
  total_saveing: number;
  created_at: string;
}
