'use client'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { useCart } from '@/contexts/cart-context'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AddToCartDrawer() {
  const { setSelectedProduct, selectedProduct, addToCart } = useCart()
  const [quantity, setQuantity] = useState(selectedProduct?.minQuantity || 1)

  useEffect(() => {
    if (selectedProduct?.minQuantity) {
      setQuantity(selectedProduct.minQuantity)
    }
  }, [selectedProduct])

  const confirmAddToCart = () => {
    if (!selectedProduct) return
    if (quantity < selectedProduct.minQuantity) {
      toast.error(
        `La cantidad mínima para este producto es ${selectedProduct.minQuantity}`
      )
      return
    }
    addToCart({
      ...selectedProduct,
      selectedQuantity: quantity,
      total: selectedProduct.price * quantity,
    })
    setSelectedProduct(null)
    setQuantity(1)
  }
  const goToCheckout = () => {
    console.log('Going to checkout with:', { ...selectedProduct, quantity })
    setSelectedProduct(null)
    setQuantity(1)
  }

  return (
    <Sheet
      open={selectedProduct !== null}
      onOpenChange={() => {
        setSelectedProduct(null)
        setQuantity(1)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar al Carrito</SheetTitle>
          <SheetDescription>
            Revisa tu selección antes de agregar al carrito
          </SheetDescription>
        </SheetHeader>
        {selectedProduct && (
          <div className='py-4'>
            <div className='flex items-center space-x-4'>
              <Image
                src={selectedProduct.imageUrl ?? '/imageplaceholder.webp'}
                alt={selectedProduct.name}
                width={80}
                height={80}
                className='rounded-md aspect-auto'
              />
              <div>
                <h3 className='font-semibold'>{selectedProduct.name}</h3>
                <p className='text-sm text-gray-500'>
                  ${selectedProduct.price} por unidad
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='quantity'
                className='block text-sm font-medium text-gray-700'
              >
                Cantidad
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <Button
                  type='button'
                  onClick={() =>
                    setQuantity(
                      Math.max(selectedProduct.minQuantity ?? 1, quantity - 1)
                    )
                  }
                  className='rounded-l-md'
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <Input
                  type='number'
                  name='quantity'
                  id='quantity'
                  className='flex-1 rounded-none text-center'
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        selectedProduct.minQuantity ?? 1,
                        parseInt(e.target.value) || 0
                      )
                    )
                  }
                  min={selectedProduct.minQuantity}
                />
                <Button
                  type='button'
                  onClick={() => setQuantity(quantity + 1)}
                  className='rounded-r-md'
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-lg font-semibold'>
                Total: $
                {new Intl.NumberFormat('es-CU', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format((Number(selectedProduct.price) ?? 0) * quantity)}
              </p>
            </div>
          </div>
        )}
        <SheetFooter className='sm:justify-center'>
          <Button onClick={confirmAddToCart}>Agregar al carrito</Button>
          <Button onClick={goToCheckout} variant='outline'>
            Ir al Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
