import { z } from "zod";

export const debtsSchema = z.object({
  id: z.string().default(crypto.randomUUID()),
  user_id: z.string(),
  name: z.string().min(2, { message: "Atleast 2 charaters are required" }),
  debt_type: z.enum(["loan", "credit_card", "p2p", "other"]).default("loan"),
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
});


