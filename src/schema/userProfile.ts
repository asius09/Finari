import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1, "Full name is required"),
  avatar_url: z.string().url().optional(),
  theme: z.enum(["light", "dark"]).optional(),
  currency: z.string().min(3).max(3).optional(), // ISO 4217 currency codes are 3 letters
  created_at: z.string().datetime(),
});
