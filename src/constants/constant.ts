// constant.ts

// Database table names (centralized for consistency)
export enum DBTables {
  USER_PROFILES = "user_profiles",
  WALLETS = "wallets",
  TRANSACTIONS = "transactions",
  MONTHLY_SUMMARIES = "monthly_summaries",
}

// Wallet types
export enum WalletType {
  BANK = "bank",
  CASH = "cash",
}

// Transaction types
export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
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

// App routes
export enum AppRoutes {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  DASHBOARD = "/dashboard",
  TRANSACTIONS = "/transactions",
  WALLETS = "/wallets",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  HELP = "/help",
  UPDATE_PASSWORD = "/update-password",
  NOT_FOUND = "/404",
  NOTIFICATION = "/notification",
}

//Greetings
export enum Greetings {
  GOOD_MORNING = "Good Morning",
  GOOD_AFTERNOON = "Good Afternoon",
  GOOD_EVENING = "Good Evening",
  WELCOME_BACK = "Welcome Back",
}


