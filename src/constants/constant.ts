// constant.ts

// Database table names (centralized for consistency)
export enum DBTables {
  USER_PROFILES = "user_profiles",
  WALLETS = "wallets",
  TRANSACTIONS = "transactions",
  MONTHLY_SUMMARIES = "monthly_summaries",
  //UPDATED TWO MORE TABLES
  ASSETS = "assets",
  DEBTS = "debts",
}

// App theme
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

// Currency options (add more as needed)
export enum Currency {
  INR = "INR",
  USD = "USD",
  EUR = "EUR",
}

// Categories (you can expand this or make them dynamic later)
export enum TransactionCategory {
  SALARY = "Salary",
  GROCERIES = "Groceries",
  UTILITIES = "Utilities",
  FOOD = "Food",
  TRANSPORT = "Transport",
  RENT = "Rent",
  INVESTMENT = "Investment",
  ENTERTAINMENT = "Entertainment",
  SUBSCRIPTION = "Subscription",
  OTHER = "Other",
}

export const TRANSACTION_CATEGORY_FILTERS = [
  TransactionCategory.SALARY,
  TransactionCategory.GROCERIES,
  TransactionCategory.UTILITIES,
  TransactionCategory.FOOD,
  TransactionCategory.TRANSPORT,
  TransactionCategory.RENT,
  TransactionCategory.INVESTMENT,
  TransactionCategory.ENTERTAINMENT,
  TransactionCategory.SUBSCRIPTION,
  TransactionCategory.OTHER,
];

export const categoryFilters = [
  "Salary",
  "Groceries",
  "Utilities",
  "Food",
  "Transport",
  "Rent",
  "Investment",
  "Entertainment",
  "Subscription",
  "Other",
];

// App routes
export enum AppRoutes {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  AUTH = "/auth",
  UPDATE_PASSWORD = "/update-password",
  DASHBOARD = "/dashboard",
  TRANSACTIONS = "/transactions",
  WALLETS = "/wallets",
  NETWORTH = "/networth",
  REPORT = "/report",
  NOTIFICATION = "/notification",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  HELP = "/help",
  NOT_FOUND = "/404",
}

// Greetings
export enum Greetings {
  GOOD_MORNING = "Good Morning",
  GOOD_AFTERNOON = "Good Afternoon",
  GOOD_EVENING = "Good Evening",
  WELCOME_BACK = "Welcome Back",
}

export type LoadingType = "idle" | "pending" | "succeeded" | "failed";
export enum LoadingTypeEnum {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

// Error Types
export enum ErrorType {
  VALIDATION_ERROR = "ValidationError",
  NETWORK_ERROR = "NetworkError",
  AUTH_ERROR = "AuthError",
  SERVER_ERROR = "ServerError",
  UNKNOWN_ERROR = "UnknownError",
}

// Debt Types
export enum DebtType {
  LOAN = "loan",
  CREDIT_CARD = "credit_card",
  P2P = "p2p",
  OTHER = "other",
}
export const debtTypes = ["Loan", "Credit Card", "P2P", "Other"];
// Repayment Frequency
export enum RepaymentFrequency {
  WEEKLY = "weekly",
  BI_WEEKLY = "bi-weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  YEARLY = "yearly",
  CUSTOM = "custom",
}

export const repaymentFrequency = [
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Quarterly",
  "Yearly",
];

// Asset Types
export enum AssetType {
  CASH = "cash",
  BANK_ACCOUNT = "bank_account",
  INVESTMENT = "investment",
  PROPERTY = "property",
  PERSONAL_ITEM = "personal_item",
  OTHER = "other",
}

//asset types array
export const assetTypes = [
  "cash",
  "bank_account",
  "investment",
  "stock",
  "property",
  "personal_item",
  "other",
];

// Transaction Types
export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer",
}

// Wallet Types
export enum WalletType {
  CASH = "cash",
  BANK = "bank",
  INVESTMENT = "investment",
  OTHER = "other",
}
export const WalletTypes = ["cash", "bank", "investment"];
// Time Period Filters
export const PERIOD_FILTERS = [
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year",
  "3 Year",
  "All Time",
] as const;
export type PeriodFilter = (typeof PERIOD_FILTERS)[number];

// Transaction Filters
export const TRANSACTION_TYPE_FILTERS = [
  "All",
  "Income",
  "Expense",
  "Transfer",
] as const;
export type TransactionTypeFilter = (typeof TRANSACTION_TYPE_FILTERS)[number];

// Wallet Filters
export const WALLET_FILTERS = ["All", "Cash", "Bank", "Investment"] as const;
export type WalletFilter = (typeof WALLET_FILTERS)[number];

// Debt Filters
export const DEBT_FILTERS = ["All", "Loan", "Credit Card", "P2P"] as const;
export type DebtFilter = (typeof DEBT_FILTERS)[number];

// Asset Filters
export const ASSET_FILTERS = [
  "All",
  "Cash",
  "Bank Account",
  "Investment",
  "Property",
] as const;
export type AssetFilter = (typeof ASSET_FILTERS)[number];
