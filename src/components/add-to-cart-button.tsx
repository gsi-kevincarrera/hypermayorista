'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { cn } from '@/lib/utils'
import { ProductInDB } from '@/types'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product }: { product: ProductInDB }) {
  const { setSelectedProduct, isInCart } = useCart()
  return (
    <Button
      onClick={(e) => {
        setSelectedProduct(product)
      }}
      className={cn(
        'absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-400 hover:scale-105 z-20'
      )}
      size='icon'
      title='Agregar al carrito'
      disabled={isInCart(product.id)}
    >
      <ShoppingCart className='h-4 w-4  text-white' />
    </Button>
  )
}
