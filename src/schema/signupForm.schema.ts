import { z } from 'zod';

export const signupFormSchema = z.object({
  fullName: z.string({
    required_error: 'Full name is required',
    invalid_type_error: 'Full name must be a string',
  })
  .min(2, { message: 'Full name must be at least 2 characters' })
  .max(50, { message: 'Full name cannot exceed 50 characters' })
  .regex(/^[a-zA-Z\s'-]+$/, { message: 'Full name can only contain letters, spaces, hyphens, and apostrophes' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters long' })
    .max(20)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: 'Password must include uppercase, lowercase, number, and symbol',
    }),
});
