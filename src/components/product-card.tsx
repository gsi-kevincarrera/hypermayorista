import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import AddToCartButton from './add-to-cart-button'
import { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className='h-full flex flex-col bg-transparent border-none shadow-none relative'>
      <CardHeader className='p-0'>
        <div className='relative h-48 mb-2'>
          <Image
            src={product.imageUrl ?? '/imageplaceholder.webp'}
            alt={product.name}
            fill
            className='object-cover rounded-lg'
          />
          <AddToCartButton product={product} />
        </div>
      </CardHeader>
      <CardContent className='p-0 flex-grow flex flex-col'>
        <CardTitle className='text-base font-semibold mb-1'>
          {product.name}
        </CardTitle>
        <p className='text-sm text-gray-600 mb-2 flex-grow line-clamp-2'>
          {product.description}
        </p>
        <div className='flex flex-col items-start text-sm mb-2'>
          <span className='text-lg font-bold'>${product.price}</span>
          <span className='text-gray-500'>
            mínimo: {product.minQuantity} unidades
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
