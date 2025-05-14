import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { DBTables } from "@/constants/constant";
import { NextResponse } from "next/server";
/**
 * GET - /api/user/profile?user-id={user-id}
 *
 * Retrieves the profile data for an authenticated user with the specified user-id.
 * This endpoint requires the user to be authenticated and can only access their own profile data.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @param {Object} params - Route parameters containing the user-id.
 * @param {string} params.user-id - The unique identifier of the user whose profile is being requested.
 * @returns {NextResponse<ApiResponse>} - Standardized API response using successResponse or errorResponse.
 *
 * @example Request
 * fetch("/api/user/profile?user-id=90eebb93-cb67-4de9-96be-a4d29529f", {
 *   method: "GET",
 *   headers: {
 *     "Authorization": "Bearer <access_token>"
 *   }
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Profile retrieved successfully",
 *   "data": {
 *     "profile": {
 *       "id": "90eebb93-cb67-4de9-96be-a4d29529f",
 *       "full_name": "John Doe",
 *       "email": "john@example.com",
 *       "avatar_url": "https://example.com/avatar.jpg",
 *       "currency": "USD",
 *       "theme": "light"
 *     }
 *   }
 * }
 *
 * @example Error Response - Unauthorized
 * {
 *   "success": false,
 *   "message": "Unauthorized access",
 *   "errors": {
 *     "auth": ["You must be logged in to access this resource"]
 *   }
 * }
 *
 * @example Error Response - Forbidden
 * {
 *   "success": false,
 *   "message": "Forbidden",
 *   "errors": {
 *     "access": ["You can only access your own profile"]
 *   }
 * }
 *
 * @example Error Response - Not Found
 * {
 *   "success": false,
 *   "message": "Profile not found",
 *   "errors": {
 *     "profile": ["No profile found for the specified user"]
 *   }
 * }
 *
 * @example Error Response - Server Error
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 *
 * @status 200 Profile retrieved successfully
 * @status 401 Unauthorized access
 * @status 403 Forbidden (trying to access another user's profile)
 * @status 404 Profile not found
 * @status 500 Internal server error
 */

export async function GET(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const url = new URL(request.url);
    const userId = url.searchParams.get("user-id");

    // Get current session
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !session.session) {
      return errorResponse("Unauthorized access", 401, {
        auth: ["You must be logged in to access this resource"],
      });
    }

    // Check if requested user ID matches authenticated user
    if (session.session.user.id !== userId) {
      return errorResponse("Forbidden", 403, {
        access: ["You can only access your own profile"],
      });
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from(DBTables.USER_PROFILES)
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      return errorResponse("Error fetching profile", 500);
    }

    if (!profile) {
      return errorResponse("Profile not found", 404, {
        profile: ["No profile found for the specified user"],
      });
    }

    return successResponse(profile, "Profile retrieved successfully", 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500);
    }
    return errorResponse("Internal server error", 500);
  }
}
