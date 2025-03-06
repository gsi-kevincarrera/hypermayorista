import { BaseProduct, ProductDetails } from '@/types'
import RelatedProducts from './related-products'
import SpecificationsTable from './specifications-table'
import ProductDescription from './product-description'
import ImageContainer from './image-container'
import ProductDetailsComponent from './product-details'

export default function ProducDetailsPage({
  product,
  relatedProducts,
}: {
  product: ProductDetails
  relatedProducts: BaseProduct[]
}) {
  return (
    <div className='container mx-auto p-6 mt-24 mb-16'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Left column: Images and related products */}
        <div className='w-full md:w-2/3 space-y-8'>
          <ImageContainer
            images={[product.images?.[0] ?? '/imageplaceholder.webp']}
          />
          <RelatedProducts relatedProducts={relatedProducts} />
          <SpecificationsTable specifications={product.specifications} />
          <ProductDescription description={product.description ?? ''} />
        </div>

        {/* Right column: Product details */}
        <ProductDetailsComponent product={product} />
      </div>
    </div>
  )
}
