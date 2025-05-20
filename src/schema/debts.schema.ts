import { z } from "zod";
const debtTypesEnum = z.enum(["loan", "credit_card", "p2p", "other"]);
const repaymentTypesEnum = z.enum([
  "once",
  "weekly",
  "monthly",
  "annually",
  "custom",
]);
export const debtsSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string().min(2, { message: "At least 2 characters are required" }),
  debt_type: z.enum(["loan", "credit_card", "p2p", "other"]),
  principal_amount: z.number().optional().default(0),
  outstanding_balance: z.number().default(0),
  interest_rate: z.number().optional().default(0),
  repayment_frequency: z
    .enum(["once", "weekly", "monthly", "annually", "custom"])
    .default("monthly"),
  repayment_start_date: z.string().default(new Date().toISOString()),
  repayment_end_date: z.string().optional(),
  next_payment_date: z.string().optional(),
  payment_amount: z.number().optional(),
  notes: z.string().optional().default(""),
  created_at: z.string().default(new Date().toISOString()),
  tenure: z.number(), // Added tenure as a number, optional
  tenure_type: repaymentTypesEnum,
});

export const debtFormSchema = z.object({
  name: z.string().min(2, { message: "Atleast 2 charaters are required" }),
  debt_type: debtTypesEnum,
  principal_amount: z.number(),
  outstanding_balance: z.number(),
  interest_rate: z.number(),
  repayment_frequency: repaymentTypesEnum,
  repayment_start_date: z.string().date(),
  tenure: z.number(),
  tenure_type: repaymentTypesEnum,
  payment_amount: z.number(),
  notes: z.string().optional(),
});
