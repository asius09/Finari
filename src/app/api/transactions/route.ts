import {
  transactionInputSchema,
  transactionSchema,
} from "@/schema/transaction.schema";
import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { DBTables } from "@/constants";
import { NextResponse } from "next/server";

/**
 * GET - /api/transactions?user={userId}&wallet={walletId}
 *
 * Fetches transactions for the specified user. If walletId is provided, filters transactions for that wallet.
 *
 * @param {Request} request - The incoming HTTP request
 * @returns {NextResponse<ApiResponse>} Standardized API response
 */
export async function GET(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = decodeURIComponent(searchParams.get("user") || "");
    const walletId = decodeURIComponent(searchParams.get("wallet") || "");

    if (!userId) {
      return errorResponse("User ID is required", 400);
    }

    let query = supabase
      .from(DBTables.TRANSACTIONS)
      .select("*")
      .eq("user_id", userId);

    if (walletId) {
      query = query.eq("wallet_id", walletId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Database error fetching transactions:", error);
      return errorResponse("Failed to fetch transactions", 500);
    }

    if (!data) {
      return errorResponse("No transactions found for this user", 404);
    }

    return successResponse(
      data,
      walletId
        ? "Transactions fetched successfully for wallet"
        : "Transactions fetched successfully for user",
      200
    );
  } catch (error: unknown) {
    console.error("Unexpected error during transaction fetch:", error);
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
 * POST - /api/transactions?user=${userId}
 *
 * Creates a new transaction for the specified user
 *
 * @param {Request} request - The incoming HTTP request
 * @returns {NextResponse<ApiResponse>} Standardized API response
 */
export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = decodeURIComponent(searchParams.get("user") || "");

    if (!userId) {
      return errorResponse("User ID is required", 400);
    }

    // Validate request body
    const validationResult = transactionInputSchema.safeParse(
      await request.json()
    );
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, errors);
    }

    const { wallet_id, amount, type, category, description, date } =
      validationResult.data;

    const { data, error } = await supabase
      .from(DBTables.TRANSACTIONS)
      .insert({
        user_id: userId,
        wallet_id,
        amount,
        type,
        category,
        description,
        date,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error creating transaction:", error);
      return errorResponse("Failed to create transaction", 500);
    }

    if (!data) {
      return errorResponse(
        "Transaction creation failed - no data returned",
        500
      );
    }

    return successResponse(data, "Transaction created successfully", 201);
  } catch (error: unknown) {
    console.error("Unexpected error during transaction creation:", error);
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
 * PATCH - /api/transactions?id={transactionId}
 *
 * Updates an existing transaction
 *
 * @param {Request} request - The incoming HTTP request
 * @returns {NextResponse<ApiResponse>} Standardized API response
 */
export async function PATCH(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const transactionId = decodeURIComponent(searchParams.get("id") || "");

    if (!transactionId) {
      return errorResponse("Transaction ID is required", 400);
    }

    // Validate request body
    const requestBody = await request.json();
    const validationResult = transactionSchema.safeParse(requestBody);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, errors);
    }

    const { wallet_id, amount, type, category, description, date, user_id } =
      validationResult.data;

    const { data, error } = await supabase
      .from(DBTables.TRANSACTIONS)
      .update({
        user_id,
        wallet_id,
        amount,
        type,
        category,
        description,
        date,
      })
      .eq("id", transactionId)
      .select()
      .single();

    if (error) {
      return errorResponse("Failed to update transaction", 500);
    }

    if (!data) {
      return errorResponse("Transaction update failed - no data returned", 500);
    }

    return successResponse(data, "Transaction updated successfully", 200);
  } catch (error: unknown) {
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
 * DELETE - /api/transactions?id={transactionId}
 *
 * Deletes a transaction
 *
 * @param {Request} request - The incoming HTTP request
 * @returns {NextResponse<ApiResponse>} Standardized API response
 */
export async function DELETE(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const transactionId = decodeURIComponent(searchParams.get("id") || "");

    if (!transactionId) {
      return errorResponse("Transaction ID is required", 400);
    }

    const { error } = await supabase
      .from(DBTables.TRANSACTIONS)
      .delete()
      .eq("id", transactionId);

    if (error) {
      console.error("Database error deleting transaction:", error);
      return errorResponse("Failed to delete transaction", 500);
    }

    return successResponse(null, "Transaction deleted successfully", 200);
  } catch (error: unknown) {
    console.error("Unexpected error during transaction deletion:", error);
    if (error instanceof Error) {
      return errorResponse(`Internal server error: ${error.message}`, 500);
    }
    return errorResponse(
      "An unexpected error occurred while processing your request",
      500
    );
  }
}
