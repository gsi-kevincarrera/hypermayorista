import ProductCard from '@/components/product-card'
import { Product } from '@/types'

export default function TopRanked({ products }: { products: Product[] }) {
  return (
    <div className='bg-gray-50 p-6 rounded-lg'>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>
        Productos Destacados
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.slice(0, 6).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
