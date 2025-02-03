'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { ProductInDB } from '@/types'

export default function CallToActionButton({
  product,
}: {
  product: ProductInDB
}) {
  const { setSelectedProduct } = useCart()
  return (
    <Button
      className='w-full bg-primary hover:bg-purple-700 h-12 text-lg'
      onClick={() => setSelectedProduct(product)}
    >
      Iniciar Pedido
    </Button>
  )
}
