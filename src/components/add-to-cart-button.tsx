'use client'

import { Button } from '@/components/ui/button'
import { Product, useCart } from '@/contexts/cart-context'

export default function AddToCartButton({ product }: { product: Product }) {
  const { setSelectedProduct } = useCart()
  return (
    <Button
      onClick={() => setSelectedProduct(product)}
      className='w-full bg-purple-600 hover:bg-purple-700'
    >
      Add to Cart
    </Button>
  )
}
