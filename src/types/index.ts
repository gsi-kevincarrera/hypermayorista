/**
 * Product category with support for nested categories
 */
export type Category = {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
  parentId?: number | null
  slug: string | null
}

/**
 * Base product with essential information
 * Optimized for fast initial loading
 */
export type BaseProduct = {
  id: number
  name: string
  description?: string | null
  basePrice: number
  minQuantity: number
  categoryId: number
  categoryName: string
  images: string[] | null
  specifications: Record<string, string> | unknown
  stock?: number | null
}

/**
 * Configurable options for each product
 */
export type ProductOption = {
  id: number
  productId: number
  name: string
  values: string[]
  isRequired: boolean
}

/**
 * Product variants
 */
export type ProductVariant = {
  id: number
  productId: number
  options: Record<string, string> | unknown
  priceAdjustment: number
  stock: number
  sku?: string | null
}

/**
 * Quantity-based price scale
 */
export type PriceBreak = {
  id: number
  productId: number
  variantId?: number | null
  minQuantity: number
  maxQuantity?: number | null
  unitPrice: number
}

/**
 * Complete product as stored in the database
 * Combination of previous types
 */
export type ProductInDB = BaseProduct & {
  options?: ProductOption[]
  variants?: ProductVariant[]
  priceBreaks?: PriceBreak[]
}

/**
 * Product in cart - Optimized to store only what's needed
 */
export type ProductInCart = {
  id: number
  variantId?: number | null
  name: string
  mainImageUrl: string | null
  quantity: number
  unitPrice: number // Price calculated based on variant and quantity
  total: number
  variantInfo?: string | null // Ex: "Size: XL, Color: Red" (for UI display)
}
