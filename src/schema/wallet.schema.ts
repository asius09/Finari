import { z } from "zod";
import { WalletType } from "@/constants/constant";

export const walletFormSchema = z.object({
  name: z.string().min(1, "Wallet name is required"),
  type: z.enum(Object.values(WalletType) as [string, ...string[]]),
  balance: z.number().min(0, "Balance cannot be negative"),
});

export const walletSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Wallet name is required"),
  type: z.enum(Object.values(WalletType) as [string, ...string[]]),
  balance: z.number().min(0, "Balance cannot be negative"),
  icon: z.string().optional(),
});
