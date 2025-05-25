// Debt Types
export enum DebtType {
  LOAN = "loan",
  CREDIT_CARD = "credit_card",
  P2P = "p2p",
  OTHER = "other",
}
export const debtTypes = Object.values(DebtType);
// Repayment Frequency
export enum RepaymentFrequency {
  WEEKLY = "weekly",
  BI_WEEKLY = "bi-weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  YEARLY = "yearly",
  CUSTOM = "custom",
}

export const repaymentFrequency = Object.values(RepaymentFrequency);
