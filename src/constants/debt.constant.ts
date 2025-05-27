import { chartColors } from "@/lib/charUtils";

// Enum for internal usage
export enum DebtTypeEnum {
  LOAN = "loan",
  CREDIT_CARD = "credit_card",
  P2P = "p2p",
  OTHER = "other",
}

// Readonly array for dropdowns, iterating, etc.
export const debtTypes = [
  DebtTypeEnum.LOAN,
  DebtTypeEnum.CREDIT_CARD,
  DebtTypeEnum.P2P,
  DebtTypeEnum.OTHER,
] as const;

// Type derived from the array
export type DebtType = (typeof debtTypes)[number];

// UI helpers (colors)
export const debtTypeColorMap: Record<DebtTypeEnum, keyof typeof chartColors> =
  {
    [DebtTypeEnum.LOAN]: "blue",
    [DebtTypeEnum.CREDIT_CARD]: "rose",
    [DebtTypeEnum.P2P]: "violet",
    [DebtTypeEnum.OTHER]: "gray",
  };

// Enum for internal usage
export enum RepaymentFrequencyEnum {
  WEEKLY = "weekly",
  BI_WEEKLY = "bi-weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  YEARLY = "yearly",
  CUSTOM = "custom",
}

// Readonly array for dropdowns, iterating, etc.
export const repaymentFrequencies = [
  RepaymentFrequencyEnum.WEEKLY,
  RepaymentFrequencyEnum.BI_WEEKLY,
  RepaymentFrequencyEnum.MONTHLY,
  RepaymentFrequencyEnum.QUARTERLY,
  RepaymentFrequencyEnum.YEARLY,
  RepaymentFrequencyEnum.CUSTOM,
] as const;

// Type derived from the array
export type RepaymentFrequency = (typeof repaymentFrequencies)[number];
