import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import AddToCartButton from './add-to-cart-button'
import Link from 'next/link'
import { BaseProduct } from '@/types'

interface Props {
  product: BaseProduct
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className='h-full flex flex-col bg-transparent border-none shadow-none relative'>
      <AddToCartButton product={product} />
      <Link href={`/products/${product.id}`}>
        <CardHeader className='p-0'>
          <div className='relative h-48 mb-2'>
            <Image
              src={product.images?.[0] ?? '/imageplaceholder.webp'}
              alt={product.name}
              fill
              className='object-cover rounded-lg'
            />
          </div>
        </CardHeader>
        <CardContent className='p-0 flex-grow flex flex-col'>
          <CardTitle className='text-base font-semibold mb-1'>
            {product.name}
          </CardTitle>
          <p className='text-sm text-gray-600 mb-2 flex-grow line-clamp-1'>
            {product.description}
          </p>
          <div className='flex flex-col items-start text-sm mb-2'>
            <span className='text-lg font-bold'>${product.basePrice}</span>
            <span className='text-gray-500'>
              mínimo: {product.minQuantity} unidades
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
