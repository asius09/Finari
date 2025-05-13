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
  date: z.string().datetime(),
  created_at: z.string().datetime(),
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
  date: z.string().default(new Date().toISOString()),
});

/*
id: string;
user_id: string; // FK to auth.user.id
wallet_id: string; // FK to Wallet
amount: number;
type: "income" | "expense";
category: string; // e.g., 'Food', 'Bills', 'Salary'
description?: string;
date: string; // ISO date string
created_at: string;
*/
