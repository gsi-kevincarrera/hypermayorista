'use client'

import ProductGallery from '@/components/product-gallery'
import { getNonSpecialProducts } from '@/db/actions'
import { Product } from '@/types'

export default function BentoGridGallery({
  initialProducts,
  total,
}: {
  initialProducts: Product[]
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
