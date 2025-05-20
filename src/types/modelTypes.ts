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
  type: "bank" | "cash" | "investment";
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
  type: "income" | "expense" | "investment";
  category: string; // e.g., 'Food', 'Bills', 'Salary'
  description?: string;
  date: string; // ISO date string
  created_at: string;
}

// --- Financial Summary Table ---
export interface FinacialSummary {
  id: string;
  user_id: string;
  date: string; // format: 'YYYY-MM-DD'
  income: number; //total income till now
  expense: number; //total expense
  saveing: number; //total saving
  asets: number; //total assets till now
  debts: number; //total debts till now
  created_at: string;
}

export interface Debt {
  id: string; // UUID
  user_id: string; // FK to auth.users
  name: string; // e.g., 'Loan from Sarah', 'Credit Card Balance'
  debt_type: "loan" | "credit_card" | "p2p" | "other";
  principal_amount?: number; // Original amount (if applicable)
  outstanding_balance: number;
  interest_rate?: number; // Annual rate (e.g., 0.05 for 5%)
  repayment_frequency?: "once" | "weekly" | "monthly" | "annually" | "custom";
  repayment_start_date?: string; // ISO date
  repayment_end_date?: string; // ISO date (if known)
  next_payment_date?: string; // ISO date
  payment_amount?: number; // Regular payment amount (if applicable)
  notes?: string; // For additional details (e.g., interest terms for P2P)
  tenure: number;
  tenure_type: "once" | "weekly" | "monthly" | "annually" | "custom";
  created_at: string;
}

export interface Asset {
  id: string; // UUID
  user_id: string; // FK to auth.users
  name: string; // User-defined name
  asset_type:
    | "cash"
    | "bank_account"
    | "investment"
    | "property"
    | "personal_item"
    | "other";
  current_value: number; // Current estimated value
  purchase_date?: string;
  purchase_price?: number;
  notes?: string;
  created_at: string; // ISO timestamp
  updated_at?: string; // ISO timestamp (when current_value was last updated)

  // Flexible details object to hold any asset-specific information
  details?: Record<string, any>;
}

/*
//TODO: FOR FUTURE REFERENCE
export interface Asset {
  id: string; // UUID
  user_id: string; // FK to auth.users
  name: string; // User-defined name, e.g., "Infosys Shares", "HDFC FD 1", "Mirae Bluechip SIP"
  asset_type:
    | "stock" // Equity shares
    | "bond" // Government or Corporate Bonds
    | "fixed_deposit" // FD
    | "recurring_deposit" // RD
    | "mutual_fund" // Lumpsum or SIP in Mutual Funds
    | "etf" // Exchange Traded Fund
    | "ppf" // Public Provident Fund
    | "nps" // National Pension System
    | "gold" // Physical gold, Gold Bonds, Gold ETF
    | "real_estate"
    | "vehicle"
    | "cash_equivalent" // e.g., Liquid funds, very short-term FDs not in main bank account
    | "other_investment"
    | "personal_item"; // High-value personal belongings

  current_value: number; // Current market value of this specific asset holding
  institution_name?: string; // e.g., "Zerodha", "HDFC Bank", "ICICI Prudential AMC", "Post Office"
  account_number?: string; // e.g., Demat A/C, Folio No., FD A/C No., PPF A/C
  initial_investment_value?: number; // Total cost at the time of purchase/initial deposit
  purchase_date?: string; // Date of initial investment or purchase
  maturity_date?: string; // For FDs, Bonds, PPF etc.
  notes?: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp (when current_value was last updated)

  // Type-specific details. In Supabase, this would be a JSONB column.
  details?:
    | StockDetails
    | BondDetails
    | FixedDepositDetails
    | RecurringDepositDetails
    | MutualFundDetails
    | ETFDetails
    | PPFDetails
    | NPSDetails
    | GoldDetails
    | RealEstateDetails
    | VehicleDetails;
}

// --- Type-Specific Detail Interfaces ---

export interface StockDetails {
  ticker_symbol: string; // e.g., "INFY", "RELIANCE.NS"
  exchange?: string; // e.g., "NSE", "BSE", "NASDAQ"
  quantity: number;
  average_buy_price?: number; // Useful for P&L
  current_market_price_per_unit?: number; // Can be used to calculate current_value
}

export interface BondDetails {
  bond_name_or_isin: string; // ISIN is a unique identifier
  face_value_per_unit?: number;
  coupon_rate?: number; // Annual interest rate
  interest_payment_frequency?:
    | "monthly"
    | "quarterly"
    | "half_yearly"
    | "annually"
    | "on_maturity";
  quantity?: number;
  purchase_price_per_unit?: number;
}

export interface FixedDepositDetails {
  principal_amount: number;
  interest_rate: number; // Annual interest rate
  compounding_frequency?:
    | "monthly"
    | "quarterly"
    | "half_yearly"
    | "annually"
    | "simple";
  maturity_value?: number; // Calculated or actual
  nominee?: string;
}

export interface RecurringDepositDetails {
  monthly_installment: number;
  interest_rate: number;
  tenure_months: number;
  next_installment_due_date?: string;
  maturity_value?: number;
  total_installments_paid?: number;
}

export interface MutualFundDetails {
  fund_name: string; // User-friendly name like "Parag Parikh Flexi Cap Fund Direct Growth"
  scheme_code?: string; // AMFI code or internal identifier for data fetching
  folio_number: string;
  units_held?: number;
  current_nav?: number; // Net Asset Value per unit
  investment_type: "lumpsum" | "sip";
  sip_amount?: number; // If type is "sip"
  sip_frequency?: "daily" | "weekly" | "fortnightly" | "monthly" | "quarterly";
  sip_start_date?: string;
  sip_next_date?: string;
  is_direct_plan?: boolean;
}

export interface ETFDetails {
  etf_name: string;
  ticker_symbol: string;
  exchange?: string;
  units_held: number;
  average_buy_price?: number;
  current_market_price_per_unit?: number;
}

export interface PPFDetails {
  principal_invested_this_year?: number;
  interest_rate: number; // Usually set by government annually
  account_open_date: string;
  lock_in_period_years?: number; // Typically 15 years
}

export interface NPSDetails {
  pran_number: string; // Permanent Retirement Account Number
  tier1_value?: number;
  tier2_value?: number;
  pension_fund_manager?: string;
  asset_allocation_tier1?: {
    equity: number;
    corporate_debt: number;
    government_securities: number;
    alternative_assets: number;
  };
  asset_allocation_tier2?: {
    equity: number;
    corporate_debt: number;
    government_securities: number;
    alternative_assets: number;
  };
}

export interface GoldDetails {
  form:
    | "physical"
    | "digital_gold"
    | "gold_bond"
    | "gold_etf"
    | "gold_mutual_fund";
  quantity_grams?: number; // For physical or digital
  units_or_bonds_held?: number; // For bonds, ETFs, MFs
  purity_karat?: number; // For physical
  purchase_price_per_gram_or_unit?: number;
  bond_series?: string; // For Sovereign Gold Bonds
  // If Gold ETF or Gold MF, can reference ETFDetails or MutualFundDetails structure partially
}

export interface RealEstateDetails {
  property_type: "residential" | "commercial" | "land";
  address: string;
  area_sq_ft?: number;
  year_of_construction?: number;
  estimated_rental_income?: number;
}

export interface VehicleDetails {
  vehicle_type: "car" | "motorcycle" | "scooter";
  make: string;
  model: string;
  year_of_manufacture: number;
  registration_number: string;
  insurance_expiry_date?: string;
}
*/
