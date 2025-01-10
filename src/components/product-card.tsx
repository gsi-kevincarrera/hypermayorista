import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import AddToCartButton from './add-to-cart-button'
import { Product } from '@/contexts/cart-context'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='p-0'>
        <div className='relative h-48'>
          <Image
            src={product.imageUrl || '/product1.jpg'}
            alt={product.name}
            fill
            className='object-cover rounded-t-lg'
          />
        </div>
      </CardHeader>
      <CardContent className='p-4 flex-grow flex flex-col'>
        <CardTitle className='text-base sm:text-lg mb-2'>
          {product.name}
        </CardTitle>
        <p className='text-sm text-gray-600 mb-2 flex-grow'>
          {product.description}
        </p>
        <div className='flex justify-between items-center text-sm mb-2'>
          <span>${product.price}</span>
        </div>
        <AddToCartButton product={product} />
      </CardContent>
    </Card>
  )
}
