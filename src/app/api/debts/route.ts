import { debtsSchema, debtFormSchema } from "@/schema/debts.schema";
import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { DBTables } from "@/constants/constant";
import { NextResponse } from "next/server";

/**
 * GET - /api/detbs?userId={userId}
 *
 * Fetched all the detbs of the specific user.
 *
 * @param {Request} request - The incoming HTTP request containing debt data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user to get the user detbs
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 *
 * @example Request
 * fetch("/api/detbs?userId=123e4567-e89b-12d3-a456-426614174000", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 * })
 *
 * @status 200 Debts fetch succesfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */

export async function GET(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      console.log("No userId found", userId);
      return errorResponse(
        "Invalid Request! Please Provide User Id in Search Params",
        400
      );
    }
    const { data, error } = await supabase
      .from(DBTables.DEBTS)
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return errorResponse("Failed to fetch debts from database", 500);
    }

    if (!data) {
      return errorResponse("No detbs found for this user", 404);
    }

    return successResponse(data, "Debts fetched successfully", 200);
  } catch (error: unknown) {
    console.log("Unexpected error occure during detbs fetching", error);
    if (error instanceof Error) {
      return errorResponse(`Interval Server Error: ${error}`, 500);
    }
    return errorResponse(
      `Failed to get debt, HTTP Server Error: ${error}`,
      500
    );
  }
}

/**
 * POST - /api/detbs?userId={userId}
 *
 * Add new Debt for the user
 *
 * @param {Request} request - The incoming HTTP request containing debt data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user add debt
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 *
 * @example Request
 * fetch("/api/detbs?userId=123e4567-e89b-12d3-a456-426614174000", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *      asset_type: 'investment',
 *      user_id: '123e4567-e89b-12d3-a456-426614174000',
 *      name: "Gold Ring",
 *      current_value: purchase_price,
 *      purchase_date: "18-05-2025",
 *      purchase_price: 234000,
 *      notes: "Gold ring as invesment",
 *   })
 * })
 *
 * @status 201 Debt added successfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    console.log("STARTING ADDING DEBTS...");
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("Search User ID Params: ", userId);
    const debt = await request.json();
    console.log("Request Body Debt:", debt);
    if (!userId) {
      console.log("No userId found", userId);
      return errorResponse(
        "Invalid Request! Please Provide User Id in Search Params",
        400
      );
    }
    console.log("Validating Debt");
    const validateDebt = debtFormSchema.safeParse(debt);
    if (!validateDebt.success) {
      const error = validateDebt.error.flatten().fieldErrors;
      console.log("Debt Validation Failed with Error: ", error);
      return errorResponse("Validation Failed", 400, error);
    }

    console.log("Starting... Insertion into the table");
    const { data, error } = await supabase
      .from(DBTables.DEBTS)
      .insert([debt])
      .select()
      .single();
    console.log("Insertion Complete");

    if (error) {
      console.log("Insertion Error", error);
      return errorResponse(`HTTP ERROR: ${error}`, 500);
    }
    if (!data) {
      console.log("Insertion complete but no data returned");
      return errorResponse(
        `Failed to add Debts : no data returned from database`,
        500
      );
    }
    console.log("Added Successfully: ", data);
    return successResponse(data, "Debt Added Succefully", 201);
  } catch (error: unknown) {
    console.log("Unexpected error occure during debt adding", error);
    if (error instanceof Error) {
      return errorResponse(`Interval Server Error:  ${error}`, 500);
    }
    return errorResponse(
      `Failed to add debt, HTTP Server Error: ${error}`,
      500
    );
  }
}

/**
 *  PATCH - /api/debts/userId={userId}
 *
 * Update Debt in database.
 *
 * @param {Request} request - The incoming HTTP request containing debt data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user update debt
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example Request
 * fetch("/api/detbs?userId=123e4567-e89b-12d3-a456-426614174000", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *      id: '123e4567-e89b-12d3-a456-oahdoiu9834',
 *      user_id: '123e4567-e89b-12d3-a456-426614174000',
 *      asset_type: 'investment',
 *      name: "Gold Ring",
 *      current_value: purchase_price,
 *      purchase_date: "18-05-2025",
 *      purchase_price: 234000,
 *      notes: "Gold ring as invesment",
 *   })
 * })
 *
 * @status 201 Debt updated successfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */
export async function PATCH(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const debt = await request.json();
    console.log("The USER ID to update or PATCH", userId);
    if (!userId) {
      console.log("No userId found", userId);
      return errorResponse(
        "Invalid Request! Please Provide User Id in Search Params",
        400
      );
    }
    const validateDebt = debtsSchema.partial().safeParse(debt);
    if (!validateDebt.success) {
      const error = validateDebt.error.flatten().fieldErrors;
      console.log("Debt Validation Failed with Error: ", error);
      return errorResponse("Validation Failed", 400, error);
    }
    const { data, error } = await supabase
      .from(DBTables.DEBTS)
      .update(debt)
      .eq("id", debt.id)
      .select()
      .single();
    if (error) {
      return errorResponse(`HTTP ERROR: ${error}`, 500);
    }
    if (!data) {
      return errorResponse(
        `Failed to update debt : no data returned from database`,
        500
      );
    }
    return successResponse(data, "Successfully Updated", 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(`Interval Server Error:  ${error}`, 500);
    }
    return errorResponse(
      `Failed to add debt, HTTP Server Error: ${error}`,
      500
    );
  }
}

/**
 * PATCH - /api/debts?id=${debtId}
 *
 * Delete a Debt from Database.
 *
 * @param {Object} params - URL parameters containing id(Debt ID)
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 * @example Request
 * fetch("/api/debts?id=${debtId}",{
 *      method: "DELETE",
 *      header: {
 *          'Content-Type' : 'application/json',
 *      }
 * })
 *
 * @status 200 Debt Deleted successfully
 * @status 400 Validation error
 * @status 500 Interval Server Error
 */
export async function DELETE(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return errorResponse(
        `Invalid Request! Please provide USER ID or DEBT ID in search params`,
        400
      );
    }
    const { error } = await supabase.from(DBTables.DEBTS).delete().eq("id", id);

    if (error) {
      return errorResponse("Failed to delete debt", 500);
    }

    return successResponse(null, "Debt deleted successfully", 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(`Interval Server Error:  ${error}`, 500);
    }
    return errorResponse(
      `Failed to add debt, HTTP Server Error: ${error}`,
      500
    );
  }
}
