import { z } from "zod";
import { assetTypes } from "@/constants";
const types: string[] = [...assetTypes];
const assetTypeREnums = z.enum(types as [string, ...string[]]);

export const assetSchema = z.object({
  id: z.string().default(crypto.randomUUID()),
  user_id: z.string(),
  name: z.string().min(2, { message: "At least 2 characters are required" }),
  asset_type: assetTypeREnums,
  current_value: z.number().min(0),
  purchase_date: z.string().optional(),
  purchase_price: z.number().optional(),
  notes: z.string().optional().default(""),
  created_at: z.string().default(new Date().toISOString()),
  updated_at: z.string().optional(),
  details: z.record(z.any()).optional(),
});

export const assetFormSchema = z.object({
  name: z.string().min(2, { message: "At least 2 characters are required" }),
  asset_type: assetTypeREnums,
  purchase_date: z.string(),
  purchase_price: z.number(),
  notes: z.string(),
});

export const assetCreateSchema = z.object({
  asset_type: assetTypeREnums,
  user_id: z.string(),
  name: z.string().min(2, { message: "At least 2 characters are required" }),
  current_value: z.number().min(0),
  purchase_date: z.string(),
  purchase_price: z.number(),
  notes: z.string(),
});
