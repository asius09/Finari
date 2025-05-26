import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { NextResponse } from "next/server";
import { AppRoutes, DBTables } from "@/constants";

/**
 * POST - /api/auth/reset-password?email="user@example.com"
 *
 * Handles password reset requests by sending a reset link to the provided email.
 * The reset link redirects to the update-password page.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example
 * fetch("/api/auth/reset-password?email=user@example.com", {
 *   method: "POST"
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Reset link sent",
 *   "data": {}
 * }
 *
 * @example Error Response - Missing Email
 * {
 *   "success": false,
 *   "message": "Invalid email, Please enter correct email and try again"
 * }
 *
 * @example Error Response - Supabase Error
 * {
 *   "success": false,
 *   "message": "Error message from Supabase"
 * }
 *
 * @example Error Response - Server Error
 * {
 *   "success": false,
 *   "message": "Failed to reset password"
 * }
 *
 * @status 200 Reset link sent successfully
 * @status 400 Invalid email or Supabase error
 * @status 500 Internal server error
 */

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const email = decodeURIComponent(searchParams.get("email") || "");

    if (!email || !email.includes("@")) {
      return errorResponse(
        "Invalid email, Please enter correct email and try again",
        400
      );
    }

    /* Check if user with email is present or not */
    const { data: isUserData, error: isUserError } = await supabase
      .from(DBTables.USER_PROFILES)
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (isUserError) {
      return errorResponse(isUserError.message, 400);
    }

    if (!isUserData) {
      return errorResponse("No user found with this email address", 404);
    }

    const redirectUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.concat(AppRoutes.UPDATE_PASSWORD) ||
      `http://localhost:3000${AppRoutes.UPDATE_PASSWORD}`;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data, "Reset link sent", 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500);
    }
    return errorResponse("Failed to reset password", 500);
  }
}
