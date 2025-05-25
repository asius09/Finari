# API Response Types

The `api-response` module exports two types and two functions to standardize API responses:

## Types

### `ApiResponse<T>`

A generic API response type with type safety.

- `success`: Indicates if the request was successful (`boolean`).
- `message`: Response message (`string`).
- `data`: Optional response data (`T`).
- `errors`: Optional error details (`Record<string, string[]>`).

## Functions

### `successResponse<T>(data: T, message: string = "Success", status: number = 200): NextResponse<ApiResponse<T>>`

Creates a standardized success response.

- `data`: The response data (`T`).
- `message`: Success message (`string`).
- `status`: HTTP status code (`number`).

Returns a standardized success response.

### `errorResponse(message: string = "Something went wrong", status: number = 500, errors?: Record<string, string[]>): NextResponse<ApiResponse>`

Creates a standardized error response.

- `message`: Error message (`string`).
- `status`: HTTP status code (`number`).
- `errors`: Optional error details (`Record<string, string[]>`).

Returns a standardized error response.
