import { z } from "zod";

// Schema for database model
export const transactionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  wallet_id: z.string(),
  amount: z.number().positive(),
  type: z.enum(["income", "expense", "investment"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.string().date(),
  created_at: z.string().datetime({ offset: true }),
});

// Schema for form input
export const transactionInputSchema = z.object({
  wallet_id: z.string().min(1, "Wallet is required"),
  amount: z
    .number()
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
  type: z.enum(["income", "expense", "investment"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});
