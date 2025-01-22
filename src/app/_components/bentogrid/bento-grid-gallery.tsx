'use client'

import ProductGallery from '@/components/product-gallery'
import { getNonSpecialProducts } from '@/db/actions'
import { ProductInDB } from '@/types'

export default function BentoGridGallery({
  initialProducts,
  total,
}: {
  initialProducts: ProductInDB[]
  total: number
}) {
  return (
    <ProductGallery
      initialProducts={initialProducts as unknown as ProductInDB[]}
      getProducts={
        getNonSpecialProducts as unknown as (
          offset: number,
          limit: number
        ) => Promise<{ data: ProductInDB[]; total: number }>
      }
      total={total}
    />
  )
}
