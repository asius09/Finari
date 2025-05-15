import { walletFormSchema } from "@/schema/wallet.schema";
import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { DBTables } from "@/constants/constant";
import { NextResponse } from "next/server";

/**
 * POST - /api/wallets?userId={userId}
 *
 * Creates a new wallet for the specified user.
 *
 * @param {Request} request - The incoming HTTP request containing wallet data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user creating the wallet
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example Request
 * fetch("/api/wallets?userId=123e4567-e89b-12d3-a456-426614174000", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     name: "My Wallet",
 *     type: "cash",
 *     balance: 1000
 *   })
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Wallet created successfully",
 *   "data": {
 *     "wallet": {
 *       "id": "wallet_123",
 *       "name": "My Wallet",
 *       "type": "cash",
 *       "balance": 1000,
 *       "created_at": "2023-01-01T00:00:00.000Z"
 *     }
 *   }
 * }
 *
 * @example Error Response - Validation
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": {
 *     "name": ["Wallet name is required"],
 *     "balance": ["Balance cannot be negative"]
 *   }
 * }
 *
 * @example Error Response - Server Error
 * {
 *   "success": false,
 *   "message": "Failed to create wallet"
 * }
 *
 * @status 201 Wallet created successfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = decodeURIComponent(searchParams.get("userId") || "");

    // Validate request body using Zod schema
    const validationResult = walletFormSchema.safeParse(await request.json());
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, errors);
    }

    if (!userId) {
      return errorResponse("User ID is required", 400);
    }

    const { name, type, balance } = validationResult.data;

    const { data, error } = await supabase
      .from(DBTables.WALLETS)
      .insert({
        name,
        type,
        balance,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error creating wallet:", error);
      return errorResponse("Failed to create wallet in database", 500);
    }

    if (!data) {
      return errorResponse(
        "Wallet creation failed - no data returned from database",
        500
      );
    }

    return successResponse(
      { wallet: data },
      "Wallet created successfully",
      201
    );
  } catch (error: unknown) {
    console.error("Unexpected error during wallet creation:", error);
    if (error instanceof Error) {
      return errorResponse(`Internal server error: ${error.message}`, 500);
    }
    return errorResponse(
      "An unexpected error occurred while processing your request",
      500
    );
  }
}

/**
 * POST - /api/wallets?userId={userId}
 *
 * Creates a new wallet for the specified user.
 *
 * @param {Request} request - The incoming HTTP request containing wallet data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user creating the wallet
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example Request
 * fetch("/api/wallets?userId=123e4567-e89b-12d3-a456-426614174000", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     name: "My Wallet",
 *     type: "cash",
 *     balance: 1000
 *   })
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Wallet created successfully",
 *   "data": {
 *     "wallet": {
 *       "id": "wallet_123",
 *       "name": "My Wallet",
 *       "type": "cash",
 *       "balance": 1000,
 *       "created_at": "2023-01-01T00:00:00.000Z"
 *     }
 *   }
 * }
 *
 * @example Error Response - Validation
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": {
 *     "name": ["Wallet name is required"],
 *     "balance": ["Balance cannot be negative"]
 *   }
 * }
 *
 * @example Error Response - Server Error
 * {
 *   "success": false,
 *   "message": "Failed to create wallet"
 * }
 *
 * @status 201 Wallet created successfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */

export async function GET(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = decodeURIComponent(searchParams.get("userId") || "");

    if (!userId) {
      return errorResponse("User ID is required", 400);
    }

    const { data, error } = await supabase
      .from(DBTables.WALLETS)
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Database error fetching wallets:", error);
      return errorResponse("Failed to fetch wallets from database", 500);
    }

    if (!data) {
      return errorResponse("No wallets found for this user", 404);
    }

    return successResponse(data, "Wallets fetched successfully", 200);
  } catch (error: unknown) {
    console.error("Unexpected error during wallet fetch:", error);
    if (error instanceof Error) {
      return errorResponse(`Internal server error: ${error.message}`, 500);
    }
    return errorResponse(
      "An unexpected error occurred while processing your request",
      500
    );
  }
}

/**
 * Handles DELETE requests to delete a wallet by ID
 *
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse<ApiResponse>>} - Response with success/error message
 *
 * @example Request
 * fetch("/api/wallets?id=wallet_123", {
 *   method: "DELETE"
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Wallet deleted successfully"
 * }
 *
 * @example Error Response - Missing ID
 * {
 *   "success": false,
 *   "message": "Wallet ID is required"
 * }
 *
 * @example Error Response - Database Error
 * {
 *   "success": false,
 *   "message": "Failed to delete wallet from database"
 * }
 *
 * @status 200 Wallet deleted successfully
 * @status 400 Wallet ID is required
 * @status 500 Internal server error
 */
export async function DELETE(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const walletId = decodeURIComponent(searchParams.get("id") || "");

    if (!walletId) {
      return errorResponse("Wallet ID is required", 400);
    }

    const { error } = await supabase
      .from(DBTables.WALLETS)
      .delete()
      .eq("id", walletId);

    if (error) {
      console.error("Database error deleting wallet:", error);
      return errorResponse("Failed to delete wallet from database", 500);
    }

    return successResponse(null, "Wallet deleted successfully", 200);
  } catch (error: unknown) {
    console.error("Unexpected error during wallet deletion:", error);
    if (error instanceof Error) {
      return errorResponse(`Internal server error: ${error.message}`, 500);
    }
    return errorResponse(
      "An unexpected error occurred while processing your request",
      500
    );
  }
}
/**
 * Handles PATCH requests to update a wallet
 *
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse<ApiResponse>>} - Response with success/error message
 *
 * @example Request
 * fetch("/api/wallets?id=wallet_123", {
 *   method: "PATCH",
 *   body: JSON.stringify({ name: "New Wallet Name", balance: 1000 })
 * })
 *
 * @example Success Response
 * {
 *   "success": true,
 *   "message": "Wallet updated successfully"
 * }
 *
 * @example Error Response - Missing ID
 * {
 *   "success": false,
 *   "message": "Wallet ID is required"
 * }
 *
 * @example Error Response - Database Error
 * {
 *   "success": false,
 *   "message": "Failed to update wallet in database"
 * }
 *
 * @status 200 Wallet updated successfully
 * @status 400 Wallet ID is required
 * @status 500 Internal server error
 */
export async function PATCH(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const walletId = decodeURIComponent(searchParams.get("id") || "");
    const body = await request.json();

    if (!walletId) {
      return errorResponse("Wallet ID is required", 400);
    }

    if (!body || Object.keys(body).length === 0) {
      return errorResponse("Update data is required", 400);
    }

    const { error } = await supabase
      .from(DBTables.WALLETS)
      .update(body)
      .eq("id", walletId);

    if (error) {
      console.error("Database error updating wallet:", error);
      return errorResponse("Failed to update wallet in database", 500);
    }

    return successResponse(null, "Wallet updated successfully", 200);
  } catch (error: unknown) {
    console.error("Unexpected error during wallet update:", error);
    if (error instanceof Error) {
      return errorResponse(`Internal server error: ${error.message}`, 500);
    }
    return errorResponse(
      "An unexpected error occurred while processing your request",
      500
    );
  }
}
