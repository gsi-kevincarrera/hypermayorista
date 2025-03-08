'use client'
import { ShoppingCart, ShoppingCartIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { useCart } from '@/contexts/cart-context'
import { Checkbox } from '@/components/ui/checkbox'

export default function CartDrawer() {
  const { cart, removeFromCart } = useCart()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className='fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700'
          size='icon'
        >
          <ShoppingCart className='h-6 w-6' />
          {cart.length > 0 && (
            <span className='absolute top-0 right-0 h-6 w-6 text-xs bg-red-500 rounded-full flex items-center justify-center text-white'>
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
          <SheetDescription>
            <div className='flex justify-between items-center'>
              {cart.length === 0
                ? 'Tu carrito esta vacío'
                : `Tienes ${cart.length} producto${
                    cart.length > 1 ? 's' : ''
                  } en tu carrito`}
              <Button
                title='Ir al checkout'
                className='bg-gray-50/80 text-black hover:bg-secondary'
              >
                <ShoppingCartIcon className='h-5 w-5' />
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className='mt-4 space-y-4'>
          {cart.map((item, index) => (
            <div key={index} className='flex items-center gap-4'>
              <Checkbox defaultChecked={true} />
              <Card className='w-full'>
                <CardContent className='flex items-center justify-between p-4'>
                  <div className='flex items-center space-x-4'>
                    <Image
                      src={item.mainImageUrl ?? '/imageplaceholder.webp'}
                      alt={item.name}
                      width={50}
                      height={50}
                      className='object-cover rounded'
                    />
                    <div>
                      <h4 className='font-semibold'>{item.name}</h4>
                      <p className='text-sm text-gray-500'>
                        ${item.unitPrice} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <X className='h-5 w-5' />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <SheetFooter className='mt-6'>
            <Button className='w-full'>Ir al Checkout</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
