'use client'

import { ProductDetails as ProductDetailsType } from '@/types'
import PriceTiers from './price-tiers'
import ProductOptions from './product-options'
import CallToActionButton from './call-to-action-button'
import { useCallback, useEffect, useState } from 'react'
import { calculatePrice, getVariantByOptions } from '@/db/actions'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProductDetails({
  product,
}: {
  product: ProductDetailsType
}) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({})
  const [price, setPrice] = useState(product.basePrice * product.minQuantity)
  const [quantity, setQuantity] = useState(product.minQuantity)
  const [calculatingPrice, setCalculatingPrice] = useState(false)

  const updatePrice = useCallback(async () => {
    setCalculatingPrice(true)
    //Get variant by selected options, this is key to calculate the price using the price adjustments
    const variant = await getVariantByOptions(product.id, selectedOptions)
    if (variant) {
      const { totalPrice } = await calculatePrice(
        product.id,
        quantity,
        variant.id
      )
      setPrice(totalPrice)
    } else {
      //if there is no variant, calculate the price based on the base price and price breaks, ignoring price adjustments
      const { totalPrice } = await calculatePrice(product.id, quantity)
      setPrice(totalPrice)
    }
    setCalculatingPrice(false)
  }, [product.id, selectedOptions, quantity])

  const debouncedUpdatePrice = useDebouncedCallback(updatePrice, 500)

  useEffect(() => {
    const isAllRequiredOptionsSelected = () => {
      //Get required options
      const requiredOptions = product.options?.filter(
        (option) => option.isRequired
      )

      //Check if all required options are selected
      const allRequiredSelected = requiredOptions?.every(
        (option) => selectedOptions[option.name]
      )

      return allRequiredSelected
    }

    if (!isAllRequiredOptionsSelected()) return
    debouncedUpdatePrice()
  }, [
    selectedOptions,
    product.options,
    quantity,
    product.id,
    debouncedUpdatePrice,
  ])

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
          {calculatingPrice
            ? 'Calculando...'
            : `$ ${new Intl.NumberFormat('es-CU', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(Number(price) ?? 0)}`}
        </p>

        {/* Call to action */}
        <CallToActionButton disabled product={product} />
      </div>
    </div>
  )
}
