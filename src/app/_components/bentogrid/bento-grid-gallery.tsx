'use client'

import ProductGallery from '@/components/common/product-gallery'
import { getNonSpecialProducts } from '@/db/actions'
import { BaseProduct } from '@/types'

export default function BentoGridGallery({
  initialProducts,
  total,
}: {
  initialProducts: BaseProduct[]
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
