import ProductGallery from '@/components/product-gallery'
import { getProductsByCategory } from '@/db/actions'
import { Product } from '@/types'

export default function CategoriesGallery({
  initialProducts,
  total,
}: {
  initialProducts: Product[]
  total: number
}) {
  return (
    <ProductGallery
      initialProducts={initialProducts}
      total={total}
      getProducts={getProductsByCategory}
    />
  )
}
