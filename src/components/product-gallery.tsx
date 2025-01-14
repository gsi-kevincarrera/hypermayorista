'use client'
import { Product } from '@/types'
import ProductCard from './product-card'
import { useState, useTransition } from 'react'
import { getNonSpecialProducts } from '@/db/actions'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'

const NUMBER_OF_PRODUCTS_TO_GET = 10
const INITIAL_OFFSET = 15

export default function ProductGallery({
  initialProducts,
}: {
  initialProducts: Product[]
}) {
  const [offset, setOffset] = useState(INITIAL_OFFSET)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isLoading, startTransition] = useTransition()
  const [isThereMore, setIsThereMore] = useState(true)

  const loadMoreProducts = () => {
    startTransition(async () => {
      setOffset(offset + NUMBER_OF_PRODUCTS_TO_GET)
      const { data, total } = await getNonSpecialProducts(
        offset,
        NUMBER_OF_PRODUCTS_TO_GET
      )
      setProducts((prevProducts) => [...prevProducts, ...data])
      setIsThereMore(() => total > products.length + data.length)
    })
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div className='absolute -bottom-16 left-0 right-0 w-full flex justify-center'>
        <Button
          className='min-w-36 h-16 hover:shadow-lg hover:scale-105 transition'
          onClick={loadMoreProducts}
          disabled={isLoading || !isThereMore}
        >
          {isLoading ? (
            <Loading />
          ) : isThereMore ? (
            'Ver más'
          ) : (
            'No hay más productos'
          )}
        </Button>
      </div>
    </div>
  )
}
