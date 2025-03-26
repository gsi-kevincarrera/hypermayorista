import { PriceBreak, ProductDetails, ProductOption } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isAllRequiredOptionsSelected = (
  product:
    | ProductDetails
    | {
        options: ProductOption[] | null
        priceBreaks: PriceBreak[] | null
      },
  selectedOptions: Record<string, string>
) => {
  const requiredOptions = product.options?.filter((option) => option.isRequired)

  // If no required options, return true
  if (!requiredOptions || requiredOptions.length === 0) return true

  // Check if all required options are selected
  return requiredOptions.every((option) => selectedOptions[option.name])
}

export const isInPriceBreakLimits = (
  quantity: number,
  priceBreakLimits: { minQuantity: number; maxQuantity: number | null }
) => {
  return (
    quantity >= priceBreakLimits.minQuantity &&
    (priceBreakLimits.maxQuantity === null ||
      quantity <= priceBreakLimits.maxQuantity)
  )
}
