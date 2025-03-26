'use client'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import Image from 'next/image'
import PriceTiers from '@/app/(public)/products/[id]/_components/price-tiers'
import ProductOptions from '@/app/(public)/products/[id]/_components/product-options'
import { Label } from '@/components/ui/label'
import useConfirmAddToCart from '@/hooks/useConfirmAddToCart'
import InputQuantity from './input-quantity'

export default function AddToCartDrawer() {
  const {
    confirmAddToCart,
    goToCheckout,
    quantity,
    setQuantity,
    selectedOptions,
    setSelectedOptions,
    price,
    isFormValid,
    loading,
    isAddingToCart,
    selectedProduct,
    setSelectedProduct,
    productDetails,
    isCalculatingPrice,
  } = useConfirmAddToCart()

  return (
    <Drawer
      open={selectedProduct !== null}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedProduct(null)
        }
      }}
    >
      <DrawerContent className='max-h-[85vh] '>
        <div className='mx-auto w-full max-w-4xl px-4'>
          <DrawerHeader className='px-0'>
            <DrawerTitle>Agregar al Carrito</DrawerTitle>
            <DrawerDescription>
              Revisa tu selección antes de agregar al carrito
            </DrawerDescription>
          </DrawerHeader>

          {selectedProduct && (
            <div className='py-2'>
              {/* Product Header */}
              <div className='grid grid-cols-2 gap-4 items-center mb-6'>
                <div className='flex items-center space-x-4'>
                  <Image
                    src={
                      selectedProduct.images?.[0] ?? '/imageplaceholder.webp'
                    }
                    alt={selectedProduct.name}
                    width={80}
                    height={80}
                    className='rounded-md aspect-auto'
                  />
                  <div>
                    <h3 className='font-semibold'>{selectedProduct.name}</h3>
                    <p className='text-sm text-gray-500'>
                      Precio base: ${selectedProduct.basePrice} por unidad
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Descripción</Label>
                  <p className='text-sm text-gray-500 truncate'>
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className='flex justify-center items-center py-8'>
                  <Loader2 className='h-8 w-8 animate-spin text-primary' />
                  <span className='ml-2'>
                    Cargando detalles del producto...
                  </span>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Left Column */}
                  <div className='flex justify-end flex-col gap-4'>
                    {/* Price Tiers */}
                    <div className='pt-0'>
                      <PriceTiers
                        priceTiers={productDetails?.priceBreaks || null}
                        quantity={quantity}
                      />
                    </div>

                    {/* Quantity */}
                    <InputQuantity
                      min={selectedProduct.minQuantity}
                      max={selectedProduct.stock ?? undefined}
                      setQuantity={setQuantity}
                      disabled={loading || isCalculatingPrice}
                      value={quantity}
                    />

                    {/* Price */}
                    <div className='mt-6'>
                      <p className='text-lg font-semibold flex items-center gap-2'>
                        Precio Total:{' '}
                        {isCalculatingPrice ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          `$ ${new Intl.NumberFormat('es-CU', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }).format(Number(price) ?? 0)}`
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-6'>
                    {/* Product Options */}
                    {productDetails?.options &&
                    productDetails.options.length > 0 ? (
                      <div>
                        <h4 className='font-medium mb-2'>
                          Opciones de Producto
                        </h4>
                        <ProductOptions
                          options={productDetails.options}
                          selectedValues={selectedOptions}
                          setSelectedValues={setSelectedOptions}
                        />
                      </div>
                    ) : (
                      <p className=' text-gray-500'>
                        No hay variantes disponibles para este producto.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DrawerFooter className='flex-row gap-2 justify-center mt-4 px-0'>
            <Button
              onClick={confirmAddToCart}
              className='flex-1 max-w-[200px]'
              disabled={
                !isFormValid || loading || isCalculatingPrice || isAddingToCart
              }
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Agregando...
                </>
              ) : (
                'Agregar al carrito'
              )}
            </Button>
            <Button
              onClick={goToCheckout}
              variant='outline'
              className='flex-1 max-w-[200px]'
              disabled={
                !isFormValid || loading || isCalculatingPrice || isAddingToCart
              }
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Procesando...
                </>
              ) : (
                'Ir al Checkout'
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
