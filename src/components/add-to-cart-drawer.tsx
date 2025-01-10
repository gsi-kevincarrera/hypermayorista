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
import { useState } from 'react'

export default function AddToCartDrawer() {
  const { setSelectedProduct, selectedProduct, addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const confirmAddToCart = () => {
    if (!selectedProduct) return
    addToCart({ ...selectedProduct, moq: quantity })
    setSelectedProduct(null)
    setQuantity(1)
  }
  const goToCheckout = () => {
    // Implement checkout logic here
    console.log('Going to checkout with:', { ...selectedProduct, quantity })
    setSelectedProduct(null)
    setQuantity(1)
  }

  return (
    <Sheet
      open={selectedProduct !== null}
      onOpenChange={() => setSelectedProduct(null)}
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
                src={selectedProduct.imageUrl ?? '/product1.jpg'}
                alt={selectedProduct.name}
                width={80}
                height={80}
                className='rounded-md'
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
                Quantity
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <Button
                  type='button'
                  onClick={() =>
                    setQuantity(
                      Math.max(selectedProduct.moq ?? 1, quantity - 1)
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
                        selectedProduct.moq ?? 1,
                        parseInt(e.target.value) || 0
                      )
                    )
                  }
                  min={selectedProduct.moq}
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
                Total: ${(Number(selectedProduct.price) ?? 0) * quantity}
              </p>
            </div>
          </div>
        )}
        <SheetFooter>
          <Button onClick={confirmAddToCart}>Add to Cart</Button>
          <Button onClick={goToCheckout} variant='outline'>
            Go to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
