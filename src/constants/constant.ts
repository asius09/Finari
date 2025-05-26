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
export const Theme = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeTypes = (typeof Theme)[keyof typeof Theme];

// Currency options (add more as needed)
export const Currency = {
  INR: "INR",
  USD: "USD",
  EUR: "EUR",
} as const;

export type CurrencyTypes = (typeof Currency)[keyof typeof Currency];
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
  ASSETS = "/assets",
  DEBTS = "/debts",
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
export enum ErrorTypes {
  VALIDATION_ERROR = "Validation Error",
  NETWORK_ERROR = "Network Error",
  AUTH_ERROR = "Auth Error",
  SERVER_ERROR = "Server Error",
  UNKNOWN_ERROR = "Unknown Error",
}
