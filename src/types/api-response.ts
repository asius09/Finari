import { NextResponse } from "next/server";

/**
 * Generic API response type with type safety
 * @template T - Type of the data payload
 * @property {boolean} success - Indicates if the request was successful
 * @property {string} message - Response message
 * @property {T} [data] - Optional response data
 * @property {Record<string, string[]>} [errors] - Optional error details
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

/**
 * Creates a standardized success response
 * @template T - Type of the data payload
 * @param {T} data - The response data
 * @param {string} [message='Success'] - Success message
 * @param {number} [status=200] - HTTP status code
 * @returns {NextResponse<ApiResponse<T>>} - Standardized success response
 * @example
 * successResponse({ user: { id: 1, name: 'John' } }, 'User created', 201)
 */
export function successResponse<T>(
  data: T,
  message: string = "Success",
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * Creates a standardized error response
 * @param {string} [message='Something went wrong'] - Error message
 * @param {number} [status=500] - HTTP status code
 * @param {Record<string, string[]>} [errors] - Optional error details
 * @returns {NextResponse<ApiResponse>} - Standardized error response
 * @example
 * errorResponse('Validation failed', 400, { email: ['Invalid email format'] })
 */
export function errorResponse(
  message: string = "Something went wrong",
  status: number = 500,
  errors?: Record<string, string[]>
): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}
