import { z } from "zod";

export const assetSchema = z.object({
  id: z.string().default(crypto.randomUUID()),
  user_id: z.string(),
  name: z.string().min(2, { message: "At least 2 characters are required" }),
  asset_type: z.enum([
    "cash",
    "bank_account",
    "investment",
    "property",
    "personal_item",
    "other",
  ]),
  current_value: z.number().min(0),
  purchase_date: z.string().optional(),
  purchase_price: z.number().optional(),
  notes: z.string().optional().default(""),
  created_at: z.string().default(new Date().toISOString()),
  updated_at: z.string().optional(),
  details: z.record(z.any()).optional(),
});
