import NotFound from '@/components/navigation/personalized-not-found'
import ProductDetail from '@/components/products/product-details'
import { getProductById } from '@/db/queries'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  return (
    <div>
      {product ? (
        <ProductDetail product={product} />
      ) : (
        <NotFound />
      )}
    </div>
  )
}
