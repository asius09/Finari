import { assetCreateSchema } from "@/schema/asset.schema";
import { createClient } from "@/utils/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/types/api-response";
import { DBTables } from "@/constants";
import { NextResponse } from "next/server";

/**
 * GET - /api/assets?userId={userId}
 *
 * Fetched all the assets of the specific user.
 *
 * @param {Request} request - The incoming HTTP request containing asset data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user to get the user assets
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 *
 * @example Request
 * fetch("/api/assets?userId=123e4567-e89b-12d3-a456-426614174000", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 * })
 *
 * @status 200 Assets fetch succesfully
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
      .from(DBTables.ASSETS)
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Database error fetching assets:", error);
      return errorResponse("Failed to fetch assets from database", 500);
    }

    if (!data) {
      return errorResponse("No assets found for this user", 404);
    }

    return successResponse(data, "Assets fetched successfully", 200);
  } catch (error: unknown) {
    console.log("Unexpected error occure during assets fetching", error);
    if (error instanceof Error) {
      return errorResponse(`Interval Server Error: ${error}`, 500);
    }
    return errorResponse(
      `Failed to get asset, HTTP Server Error: ${error}`,
      500
    );
  }
}

/**
 * POST - /api/assets?userId={userId}
 *
 * Add new Asset for the user
 *
 * @param {Request} request - The incoming HTTP request containing asset data
 * @param {Object} params - URL parameters containing userId
 * @param {string} params.userId - The ID of the user add asset
 *
 * @returns {NextResponse<ApiResponse>} Standardized API response using successResponse or errorResponse
 *
 *
 * @example Request
 * fetch("/api/assets?userId=123e4567-e89b-12d3-a456-426614174000", {
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
 * @status 201 Wallet created successfully
 * @status 400 Validation error
 * @status 500 Internal server error
 */

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    console.log("STARTING ADDING ASSET...");
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("Search User ID Params: ", userId);
    const asset = await request.json();
    console.log("Request Body Asset:", asset);
    if (!userId) {
      console.log("No userId found", userId);
      return errorResponse(
        "Invalid Request! Please Provide User Id in Search Params",
        400
      );
    }
    console.log("Validating Asset");
    const validateAsset = assetCreateSchema.safeParse(asset);
    if (!validateAsset.success) {
      const error = validateAsset.error.flatten().fieldErrors;
      console.log("Validation Failed with Error: ", error);
      return errorResponse("Validation Failed", 400, error);
    }

    console.log("Starting... Insertion into the table");
    const { data, error } = await supabase
      .from(DBTables.ASSETS)
      .insert([asset])
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
        `Failed to add Assets : no data returned from database`,
        500
      );
    }
    console.log("Added Successfully: ", data);
    return successResponse(data, "Asset Added Succefully", 201);
  } catch (error: unknown) {
    console.log("Unexpected error occure during asset adding", error);
    if (error instanceof Error) {
      return errorResponse(`Interval Server Error:  ${error}`, 500);
    }
    return errorResponse(
      `Failed to add asset, HTTP Server Error: ${error}`,
      500
    );
  }
}
