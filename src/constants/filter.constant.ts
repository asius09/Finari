export const PERIOD_FILTERS = [
  "All",
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "This Year",
  "Last Year",
  "Custom",
] as const;
export type PeriodFilter = (typeof PERIOD_FILTERS)[number];

export const TRANSACTION_TYPE_FILTERS = [
  "All",
  "Income",
  "Expense",
  "Transfer",
] as const;
export type TransactionTypeFilter = (typeof TRANSACTION_TYPE_FILTERS)[number];

export const DEBT_FILTERS = ["All", "Loan", "Credit Card", "P2P"] as const;
export type DebtFilter = (typeof DEBT_FILTERS)[number];

export const ASSET_FILTERS = [
  "All",
  "Cash",
  "Bank Account",
  "Investment",
  "Property",
] as const;
export type AssetFilter = (typeof ASSET_FILTERS)[number];

export const WALLET_FILTERS = ["All", "Cash", "Bank", "Investment"] as const;
export type WalletFilter = (typeof WALLET_FILTERS)[number];

export const CATEGORY_FILTERS = [
  "All",
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
] as const;
export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export enum Filters {
  PERIOD_FILTERS = "PERIOD_FILTERS",
  TRANSACTION_TYPE_FILTERS = "TRANSACTION_TYPE_FILTERS",
  WALLET_FILTERS = "WALLET_FILTERS",
  DEBT_FILTERS = "DEBT_FILTERS",
  ASSET_FILTERS = "ASSET_FILTERS",
  CATEGORY_FILTERS = "CATEGORY_FILTERS",
}
