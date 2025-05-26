import { loginFormSchema } from "@/schema/loginForm.schema";
import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { DBTables } from "@/constants";
import { NextResponse } from "next/server";

/**
 * POST - /api/auth/login
 *
 * Authenticate a user with email and password.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example
 * fetch("/api/auth/login", {
 *   method: "POST",
 *   body: JSON.stringify({ email: 'adiba@example.com', password: 'Secrec@t123'})
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Login successful",
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
 *     "email": ["Invalid email format"],
 *     "password": ["Password must be at least 8 characters"]
 *   }
 * }
 *
 * @example Error Response - Authentication
 * {
 *   "success": false,
 *   "message": "Invalid credentials",
 *   "errors": {
 *     "email": ["No account found with this email"],
 *     "password": ["Incorrect password"]
 *   }
 * }
 *
 * @example Error Response - Server Error
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 *
 * @status 200 Login successful
 * @status 400 Validation error or invalid credentials
 * @status 500 Internal server error
 */
export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate request body against schema
    const parsed = loginFormSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return errorResponse(
        "Invalid credentials. Please check your email and password.",
        400,
        fieldErrors
      );
    }

    const { email, password } = parsed.data;

    // Check if email exists in user profiles
    const { data: userProfileData, error: userProfileError } = await supabase
      .from(DBTables.USER_PROFILES)
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (userProfileError) {
      console.error("Database error checking user profile:", userProfileError);
      return errorResponse("Error checking user profile", 500);
    }

    if (!userProfileData) {
      return errorResponse("No account found with this email", 400, {
        email: ["No account found with this email"],
      });
    }

    // Attempt authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Authentication error:", error);
      if (error.message.includes("Invalid login credentials")) {
        return errorResponse(
          "Incorrect password. Please check your password and try again.",
          400,
          {
            password: ["Incorrect password"],
          }
        );
      } else if (error.message.includes("Email not confirmed")) {
        return errorResponse(
          "Email not verified. Please check your inbox for the verification email.",
          400,
          {
            email: ["Email not verified"],
          }
        );
      } else {
        return errorResponse(
          "Invalid email address. Please check your email and try again.",
          400,
          {
            email: ["Invalid email address"],
          }
        );
      }
    }

    // Successful login
    return successResponse(data, "Login successful", 200);
  } catch (error: unknown) {
    console.error("Unexpected error during login:", error);
    if (error instanceof Error) {
      return errorResponse(error.message, 500);
    }
    return errorResponse("An unexpected error occurred during login", 500);
  }
}
