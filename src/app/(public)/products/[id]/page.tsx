import NotFound from '@/components/navigation/personalized-not-found'
import {
  getProductById,
  getProducts,
  getRelatedProductsByCategory,
} from '@/db/queries'
import ProductDetailsPage from './_components/product-details-page'

/**
 * Product detail page component that handles the display of a specific product and its related items
 *
 * The type casting and transformations are necessary because:
 * 1. The raw product data from the database stores specifications as a generic type
 * 2. We need to explicitly cast specifications to Record<string, string> for type safety
 * 3. This same transformation needs to be applied to related products to maintain consistency
 *
 * If no product is found, it displays a NotFound component instead
 *
 * @param params - Contains the product ID from the dynamic route parameters
 * @returns A React component displaying either product details or NotFound
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  const relatedProducts = product
    ? await getRelatedProductsByCategory(product.categoryId, product.id)
    : []

  return (
    <div>
      {product ? (
        <ProductDetailsPage
          product={product}
          relatedProducts={relatedProducts}
        />
      ) : (
        <NotFound />
      )}
    </div>
  )
}
