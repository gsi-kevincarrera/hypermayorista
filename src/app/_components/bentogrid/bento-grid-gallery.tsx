'use client'

import ProductGallery from '@/components/common/product-gallery'
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
      initialProducts={initialProducts}
      getProducts={getNonSpecialProducts}
      total={total}
    />
  )
}
