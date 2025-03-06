'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { ProductDetails } from '@/types'

export default function CallToActionButton({
  product,
  disabled,
}: {
  product: ProductDetails
  disabled?: boolean
}) {
  const { setSelectedProduct } = useCart()
  return (
    <Button
      className='w-full bg-primary hover:bg-purple-700 h-12 text-lg'
      onClick={() => setSelectedProduct(product)}
      disabled={disabled}
    >
      Iniciar Pedido
    </Button>
  )
}
