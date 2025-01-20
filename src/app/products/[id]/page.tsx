import NotFound from '@/components/navigation/personalized-not-found'
import { getProductById } from '@/db/queries'
import ProductDetails from './_components/product-details'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  return (
    <div>{product ? <ProductDetails product={product} /> : <NotFound />}</div>
  )
}
