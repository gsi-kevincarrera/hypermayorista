import ProductGallery from '@/components/common/product-gallery'
import { getProductsByCategory } from '@/db/actions'
import { ProductInDB } from '@/types'

export default function CategoriesGallery({
  initialProducts,
  total,
}: {
  initialProducts: ProductInDB[]
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
