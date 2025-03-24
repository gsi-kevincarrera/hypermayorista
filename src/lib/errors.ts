/**
 * Error handling system for Hipermayorista
 *
 * This module provides a structured approach to error handling across the application
 * with consistent error types, serialization, and logging.
 */

// Base application error class
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public data?: any
  ) {
    super(message)
    this.name = 'AppError'
  }

  // Serialize error for logging or transmission
  serialize() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      data: this.data,
    }
  }
}

// Database-related errors
export class DatabaseError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 'DB_ERROR', 500, data)
    this.name = 'DatabaseError'
  }
}

// Validation errors (user input issues)
export class ValidationError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 'VALIDATION_ERROR', 400, data)
    this.name = 'ValidationError'
  }
}

// Authentication/Authorization errors
export class AuthError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 'AUTH_ERROR', 401, data)
    this.name = 'AuthError'
  }
}

// Not found errors
export class NotFoundError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 'NOT_FOUND', 404, data)
    this.name = 'NotFoundError'
  }
}

// Network-related errors
export class NetworkError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 'NETWORK_ERROR', 503, data)
    this.name = 'NetworkError'
  }
}

// Utility function to handle errors in async functions
export function handleAsyncError<T>(
  promise: Promise<T>,
  errorTransformer?: (error: any) => AppError
): Promise<[T | null, AppError | null]> {
  return promise
    .then((data) => [data, null] as [T, null])
    .catch((error) => {
      //If the error is an abort error, return null
      if (error.name === 'AbortError') {
        return [
          null,
          new AppError('Request was aborted', 'ABORTED_REQUEST', 499),
        ]
      }

      // If it's a network error
      if (
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch')
      ) {
        return [null, new NetworkError('Network error occurred', error)]
      }
      // Transform error if transformer provided
      if (errorTransformer) {
        return [null, errorTransformer(error)] as [null, AppError]
      }

      // If it's already an AppError, pass it through
      if (error instanceof AppError) {
        return [null, error] as [null, AppError]
      }

      // Default to generic AppError
      return [
        null,
        new AppError(
          error.message || 'An unexpected error occurred',
          'UNKNOWN_ERROR',
          500,
          { originalError: error }
        ),
      ] as [null, AppError]
    })
}

// Centralized error logger
export function logError(error: Error | AppError | unknown, context?: any) {
  if (error instanceof AppError) {
    console.error(`[${error.name}][${error.code}] ${error.message}`, {
      ...error.serialize(),
      context,
    })
  } else {
    // Type guard to check if error is an Error object with a message property
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    console.error(`[Error] ${errorMessage}`, {
      error,
      context,
    })
  }
}

// Parse error from server response
export function parseErrorFromResponse(response: any): AppError {
  try {
    // If the response is already an AppError or has the expected structure
    if (response && response.code && response.message) {
      switch (response.code) {
        case 'DB_ERROR':
          return new DatabaseError(response.message, response.data)
        case 'VALIDATION_ERROR':
          return new ValidationError(response.message, response.data)
        case 'AUTH_ERROR':
          return new AuthError(response.message, response.data)
        case 'NOT_FOUND':
          return new NotFoundError(response.message, response.data)
        case 'NETWORK_ERROR':
          return new NetworkError(response.message, response.data)
        default:
          return new AppError(
            response.message,
            response.code,
            response.status || 500,
            response.data
          )
      }
    }

    // Default generic error
    return new AppError(
      typeof response === 'string' ? response : 'An error occurred',
      'UNKNOWN_ERROR',
      500
    )
  } catch (e) {
    return new AppError('Failed to parse error response', 'PARSE_ERROR', 500)
  }
}
