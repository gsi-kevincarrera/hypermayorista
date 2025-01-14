'use client'

import { Button } from '@/components/ui/button'
import { Product, useCart } from '@/contexts/cart-context'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product }: { product: Product }) {
  const { setSelectedProduct, isInCart } = useCart()
  return (
    <Button
      onClick={() => setSelectedProduct(product)}
      className={cn(
        'absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-400 hover:scale-105'
      )}
      size='icon'
      title='Agregar al carrito'
      disabled={isInCart(product.id)}
    >
      <ShoppingCart className='h-4 w-4  text-white' />
    </Button>
  )
}
