'use client'
import { Button } from '@/components/ui/button'
import { ProductInCart } from '@/types'

export default function CallToActionButton({
  disabled,
  onAction,
}: {
  disabled: boolean
  onAction: () => void
}) {
  return (
    <Button
      className='w-full bg-primary hover:bg-purple-700 h-12 text-lg'
      onClick={() => onAction()}
      disabled={disabled}
    >
      Agregar al carrito
    </Button>
  )
}
