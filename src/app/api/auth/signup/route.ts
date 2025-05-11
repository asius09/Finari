import { signupFormSchema } from '@/schema/signupForm.schema';
import { createClient } from '@/utils/supabase/server';
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from '@/types/api-response';
import { DBTables } from '@/constants/constant';
import { NextResponse } from 'next/server';

/**
 * POST - /api/auth/signup
 *
 * Create a new user in the database.
 *
 * @param {Request} request = The incoming HTTP request object.
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example
 * fetch("/api/auth/signup", {
 *   method: "POST",
 *   body: JSON.stringify({ fullName: 'Adiba Firoz', email: 'adiba@example.com', password: 'Secrec@t123'})
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "User created successfully",
 *   "data": {
 *     "user": {
 *       "id": "123e4567-e89b-12d3-a456-426614174000",
 *       "email": "adiba@example.com"
 *     }
 *   }
 * }
 *
 * @example Error Response - Validation
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": {
 *     "email": ["Already have account with email"],
 *   }
 * }
 *
 * @example Error Response - Server Error
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 *
 * @status 201 User created successfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const parsed = signupFormSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        'Validation failed',
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const { fullName, email, password } = parsed.data;

    const { data: userProfileData } = await supabase
      .from(DBTables.USER_PROFILES)
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (userProfileData) {
      return errorResponse('User already exists with the given email', 400, {
        email: ['User already exists with the given email', 'Validation Error'],
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return errorResponse(error.message, 500);
    }

    return successResponse(data, 'User created successfully', 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500);
    }

    return errorResponse('An unknown error occurred', 500);
  }
}
