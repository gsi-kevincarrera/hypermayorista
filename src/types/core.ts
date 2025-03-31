/**
 * Represents the standard response format for database query functions.
 */
export type DBQueryResponse<T> = {
  success: boolean
  message: string | null
  code: number
  data: T | null // Allow null data on error
}
