import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { NextResponse } from "next/server";

/**
 * POST - /api/auth/logout
 *
 * It's logout the user and remove all the tokens from the token.
 *
 * @param {Request} request - The incoming HTTP request
 * @returns {NextResponse<ApiResponse>} Standardized API response
 *
 * @example
 * fetch("/api/auth/logout", {
 *    method: "POST",
 *    headers: {
 *      'Content-Type' : 'application/json',
 *    }
 * })
 *
 * @status 200 - User logout Successfully
 * @status 400 - Invalid Resquest
 * @status 500 - HTTP Error or Server Side Error
 */

export async function POST(): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return errorResponse(`HTTP Error! LOGOUT FAILED ${error}`, 500);
    }
    return successResponse(null, "User Logout Successfully", 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse("Server Side Error! " + error, 500);
    }
    return errorResponse(`Failed to Logout ${error}`, 500);
  }
}
