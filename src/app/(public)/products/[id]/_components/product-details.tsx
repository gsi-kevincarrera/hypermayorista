'use client'

import { ProductDetails as ProductDetailsType } from '@/types'
import PriceTiers from './price-tiers'
import ProductOptions from './product-options'
import CallToActionButton from './call-to-action-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useConfirmAddToCart from '@/hooks/useConfirmAddToCart'

export default function ProductDetails({
  product,
}: {
  product: ProductDetailsType
}) {
  const {
    quantity,
    selectedOptions,
    setSelectedOptions,
    price,
    isCalculatingPrice,
    isFormValid,
    setQuantity,
    confirmAddToCart,
    isAddingToCart,
    goToCheckout,
  } = useConfirmAddToCart(product)

  return (
    <div className='w-full md:w-1/3 space-y-6 md:sticky md:top-6 self-start'>
      <div>
        <h1 className='text-2xl font-bold'>{product.name}</h1>
      </div>

      <div className='space-y-6'>
        <PriceTiers priceTiers={product.priceBreaks} quantity={quantity} />

        {/* Options */}
        <ProductOptions
          options={product.options}
          selectedValues={selectedOptions}
          setSelectedValues={setSelectedOptions}
        />

        {/* Quantity */}
        <div className='space-y-2'>
          <Label htmlFor='quantity'>
            Cantidad:{' '}
            <span className='font-light text-xs'>
              (Mínimo {product.minQuantity} unidad(es)) (Máximo {product.stock}{' '}
              unidad(es))
            </span>
          </Label>
          <Input
            type='number'
            id='quantity'
            name='quantity'
            max={product.stock ?? undefined}
            min={product.minQuantity}
            value={quantity}
            onChange={(e) => {
              const val = e.target.value
              const num = parseInt(val, 10)
              if (!isNaN(num)) {
                setQuantity(
                  Math.min(
                    Math.max(product.minQuantity, num),
                    product.stock ?? num
                  )
                )
              }
            }}
          />
        </div>

        <p>
          Precio:{' '}
          {isCalculatingPrice
            ? 'Calculando...'
            : `$ ${new Intl.NumberFormat('es-CU', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(Number(price) ?? 0)}`}
        </p>

        {/* Call to action */}
        <div className='flex gap-2'>
          <CallToActionButton
            disabled={isCalculatingPrice || !isFormValid || isAddingToCart}
            onAction={confirmAddToCart}
            text='Agregar al carrito'
          />
          <CallToActionButton
            disabled={isCalculatingPrice || !isFormValid || isAddingToCart}
            onAction={goToCheckout}
            text='Comprar'
          />
        </div>
      </div>
    </div>
  )
}
