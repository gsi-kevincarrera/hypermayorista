import NotFound from '@/components/navigation/personalized-not-found'
import { getProductById } from '@/db/queries'
import ProductDetail from './_components/product-details'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  return (
    <div>{product ? <ProductDetail product={product} /> : <NotFound />}</div>
  )
}
