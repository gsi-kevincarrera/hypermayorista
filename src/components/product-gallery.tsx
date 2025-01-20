'use client'
import ProductCard from './product-card'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ProductInDB } from '@/types'

const NUMBER_OF_PRODUCTS_TO_GET = 10
const INITIAL_OFFSET = 15

export default function ProductGallery({
  initialProducts,
  getProducts,
  total,
}: {
  initialProducts: ProductInDB[]
  getProducts: (
    offset: number,
    limit: number
  ) => Promise<{ data: ProductInDB[]; total: number }>
  total: number
}) {
  const [offset, setOffset] = useState(INITIAL_OFFSET)
  const [products, setProducts] = useState<ProductInDB[]>(initialProducts)
  const [isLoading, startTransition] = useTransition()
  const [isThereMore, setIsThereMore] = useState(initialProducts.length < total)

  const loadMoreProducts = () => {
    startTransition(async () => {
      setOffset(offset + NUMBER_OF_PRODUCTS_TO_GET)
      const { data, total } = await getProducts(
        offset,
        NUMBER_OF_PRODUCTS_TO_GET
      )
      setProducts((prevProducts) => [...prevProducts, ...data])
      setIsThereMore(() => total > products.length + data.length)
    })
  }

  if (!products.length) return <NoProductsFound />

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

function NoProductsFound() {
  return (
    <Card className='w-full max-w-md mx-auto bg-gray-50 border-none'>
      <CardContent className='flex flex-col items-center p-6'>
        <div className='relative w-full h-32 mb-6'>
          <Image
            src='/no-products.webp'
            alt='No products found'
            fill
            className='object-cover'
          />
        </div>
        <h3 className='text-2xl font-semibold mb-2'>
          No encontramos Productos
        </h3>
        <p className='text-center text-gray-600 mb-6'>
          No pudimos encontrar productos. Intenta cambiar los parámetros de
          búsqueda o revisa nuevamente más tarde.
        </p>
        <Button variant='outline'>Explorar todo el catálogo</Button>
      </CardContent>
    </Card>
  )
}
