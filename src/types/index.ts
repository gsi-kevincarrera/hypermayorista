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
  productId?: number
  name: string
  values: string[]
  isRequired: boolean
}

/**
 * Product variants
 */
export type ProductVariant = {
  id: number
  productId?: number
  options: Record<string, string>
  priceAdjustment: number
  stock: number
  sku?: string | null
}

/**
 * Quantity-based price scale
 */
export type PriceBreak = {
  id: number
  productId?: number
  variantId?: number | null
  minQuantity: number
  maxQuantity?: number | null
  unitPrice: number
}

/**
 * Complete product as stored in the database
 * Combination of previous types
 */
export type ProductDetails = BaseProduct & {
  options: ProductOption[] | null
  priceBreaks: PriceBreak[] | null
}

/**
 * Product in cart - Optimized to store only what's needed
 */
export type ProductInCart = {
  id: number
  name: string
  mainImageUrl: string | null
  unitPrice: number // Price calculated based on variant and quantity
  quantity: number
  total: number
  isSelected: boolean
  variantId?: number | null
  variantInfo?: string | null // Ex: "Size: XL, Color: Red" (for UI display)
  isBeingRemoved?: boolean
}

/**
 * Contract
 */
export type Contract = {
  id: number
  userId: string
  filePath: string
  status: 'pending' | 'approved' | 'rejected'
  reason?: string | null
  createdAt: Date
  isActive: boolean
}

/**
 * Address
 */
export type Address = {
  id: number
  userId: string
  fullName: string
  address: string
  province: string
  municipality: string
  phone: string
  isDefault: boolean | null // Allow null from DB
  additionalInfo?: string | null
  createdAt: Date | null // Allow null from DB
  updatedAt: Date | null // Allow null from DB
  isOptimistic?: boolean
}
