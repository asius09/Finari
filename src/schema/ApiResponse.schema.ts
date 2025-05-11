import { z } from 'zod';

/**
 * Generic API response Zod schema
 * You can narrow `data` based on the endpoint.
 */
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.unknown().optional(), // Use `.optional()` for responses that might not return data
  errors: z.record(z.string(), z.array(z.string())).optional(), // For Zod fieldErrors
});