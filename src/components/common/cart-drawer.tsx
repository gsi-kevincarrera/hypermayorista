'use client'
import {
  ShoppingCart,
  ShoppingCartIcon,
  X,
  ExternalLink,
  Undo2,
  Loader2,
} from 'lucide-react'
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
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useOptimistic, useTransition } from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const UNDO_TIMEOUT_MS = 5000
export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    toggleItemSelection,
    lastRemovedItem,
    undoRemove,
    removingItemIds,
  } = useCart()
  const router = useRouter()
  const [showUndoButton, setShowUndoButton] = useState(false)
  const [progressValue, setProgressValue] = useState(100)
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Use optimistic UI for cart items
  const [optimisticCart, addOptimisticRemoval] = useOptimistic(
    cart,
    (state, productId: number) =>
      state.map((item) =>
        item.id === productId ? { ...item, isBeingRemoved: true } : item
      )
  )

  // Reset the undo button when lastRemovedItem changes
  useEffect(() => {
    if (lastRemovedItem) {
      setShowUndoButton(true)
      setProgressValue(100)

      // Create progress animation
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const remainingPercent = 100 - (elapsedTime / UNDO_TIMEOUT_MS) * 100

        if (remainingPercent <= 0) {
          clearInterval(interval)
          setShowUndoButton(false)
        } else {
          setProgressValue(remainingPercent)
        }
      }, 50)

      // Auto-hide the undo button after timeout
      const timer = setTimeout(() => {
        clearInterval(interval)
        setShowUndoButton(false)
      }, UNDO_TIMEOUT_MS)

      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    }
  }, [lastRemovedItem])

  // Calculate total price only for selected items
  const getSelectedItemsCount = () => {
    return cart.filter((item) => item.isSelected).length
  }

  const getSelectedItemsTotal = () => {
    return cart
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.total, 0)
  }

  const handleCheckboxChange = (productId: number) => {
    toggleItemSelection(productId)
  }

  const handleRemoveItem = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault() // Prevent navigation when clicking the remove button

    // Apply optimistic UI update inside a transition
    startTransition(() => {
      addOptimisticRemoval(productId)
    })

    // Perform actual removal
    await removeFromCart(productId)
  }

  const handleUndoRemove = () => {
    undoRemove()
    setShowUndoButton(false)
  }

  const handleGoToCheckout = () => {
    setOpen(false) // Close the drawer
    router.push('/checkout')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className='fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700'
          size='icon'
          onClick={() => setOpen(true)}
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
                  } en el carrito`}
              {cart.length > 0 && (
                <Button
                  title='Ir al checkout'
                  className='bg-gray-50/80 text-black hover:bg-secondary'
                  disabled={getSelectedItemsCount() === 0}
                  onClick={handleGoToCheckout}
                >
                  <ShoppingCartIcon className='h-5 w-5 mr-2' />
                  Checkout
                </Button>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>

        {showUndoButton && lastRemovedItem && (
          <div className='mt-4 bg-muted/50 p-3 rounded-md'>
            <div className='flex items-center justify-between mb-2'>
              <div className='text-sm'>
                <span className='font-medium'>{lastRemovedItem.name}</span>{' '}
                eliminado del carrito
              </div>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-1'
                onClick={handleUndoRemove}
              >
                <Undo2 className='h-3.5 w-3.5' />
                Deshacer
              </Button>
            </div>
            <Progress
              value={progressValue}
              className='h-1 bg-muted-foreground/20'
              indicatorClassName='bg-purple-600'
            />
          </div>
        )}

        <div className='mt-4 space-y-4'>
          {optimisticCart.map((item, index) => {
            const isBeingRemoved =
              item.isBeingRemoved || removingItemIds.includes(item.id)

            return (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-4 transition-opacity duration-300',
                  isBeingRemoved ? 'opacity-50' : 'opacity-100'
                )}
              >
                <Checkbox
                  checked={item.isSelected}
                  onCheckedChange={() => handleCheckboxChange(item.id)}
                  disabled={isBeingRemoved}
                />
                <Link
                  href={`/products/${item.id}`}
                  className={cn(
                    'w-full hover:opacity-90 transition-opacity',
                    isBeingRemoved ? 'pointer-events-none' : ''
                  )}
                >
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
                          <div className='flex items-center gap-2'>
                            <h4 className='font-semibold'>{item.name}</h4>
                            <ExternalLink className='h-3 w-3 text-muted-foreground' />
                          </div>
                          {item.variantInfo && (
                            <Badge variant='outline' className='mt-1 text-xs'>
                              {item.variantInfo}
                            </Badge>
                          )}
                          <p className='text-sm text-gray-500 mt-1'>
                            $
                            {new Intl.NumberFormat('es-CU', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(item.unitPrice)}{' '}
                            x {item.quantity}
                          </p>
                          <p className='text-sm font-medium'>
                            Total: $
                            {new Intl.NumberFormat('es-CU', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(item.total)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={(e) => handleRemoveItem(e, item.id)}
                        className='text-red-500 hover:text-red-700'
                        disabled={isBeingRemoved || isPending}
                      >
                        {isBeingRemoved ? (
                          <Loader2 className='h-5 w-5 animate-spin' />
                        ) : (
                          <X className='h-5 w-5' />
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>
        {cart.length > 0 && (
          <SheetFooter className='mt-6 flex-col'>
            <div className='w-full py-4 border-t border-gray-200'>
              <div className='flex gap-2 items-center mb-2'>
                <span className='font-medium'>
                  Subtotal ({getSelectedItemsCount()} producto(s)):
                </span>
                <span>
                  $
                  {new Intl.NumberFormat('es-CU', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(getSelectedItemsTotal())}
                </span>
              </div>
              <Button
                className='w-full disabled:opacity-50'
                disabled={getSelectedItemsCount() === 0}
                onClick={handleGoToCheckout}
              >
                Ir al Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
