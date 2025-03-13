import { useCart } from '@/contexts/cart-context'
import { calculatePrice, getVariantByOptions } from '@/db/actions'
import { getProductById } from '@/db/queries'
import { ProductOption, PriceBreak } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
export default function useConfirmAddToCart() {
  const { setSelectedProduct, selectedProduct, addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({})
  const [price, setPrice] = useState(0)
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState<{
    options: ProductOption[] | null
    priceBreaks: PriceBreak[] | null
  } | null>(null)

  useEffect(() => {
    setQuantity(selectedProduct?.minQuantity || 1)
    setPrice(
      (selectedProduct?.basePrice ?? 0) * (selectedProduct?.minQuantity || 1)
    )
  }, [selectedProduct])

  // Fetch product details when a product is selected
  useEffect(() => {
    if (!selectedProduct) return

    const fetchProductDetails = async () => {
      setLoading(true)
      try {
        // Use the server action to get product details
        const details = await getProductById(selectedProduct.id)
        if (details) {
          setProductDetails({
            options: details.options || null,
            priceBreaks: details.priceBreaks || null,
          })
        }
      } catch (error) {
        console.error('Error fetching product details:', error)
        toast.error('No se pudieron cargar los detalles del producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
    // Reset selected options when product changes
    setSelectedOptions({})
  }, [selectedProduct])

  const updatePrice = useCallback(async () => {
    if (!selectedProduct) return

    // Check if we need to call the server action
    const hasOptions =
      productDetails?.options && productDetails.options.length > 0
    const hasPriceBreaks =
      productDetails?.priceBreaks && productDetails.priceBreaks.length > 0
    const hasSelectedOptions = Object.keys(selectedOptions).length > 0

    // If there are no options or price breaks, calculate price locally
    if (!hasOptions && !hasPriceBreaks) {
      setPrice(selectedProduct.basePrice * quantity)
      return
    }

    // If there are options but none are selected, and no price breaks, calculate locally
    if (hasOptions && !hasSelectedOptions && !hasPriceBreaks) {
      setPrice(selectedProduct.basePrice * quantity)
      return
    }

    setIsCalculatingPrice(true)
    try {
      // Only call getVariantByOptions if there are selected options
      if (hasSelectedOptions) {
        const variant = await getVariantByOptions(
          selectedProduct.id,
          selectedOptions
        )

        if (variant) {
          const { totalPrice } = await calculatePrice(
            selectedProduct.id,
            quantity,
            variant.id
          )
          setPrice(totalPrice)
          return
        }
      }

      // If we have price breaks or no variant was found, calculate price based on base price and price breaks
      if (hasPriceBreaks) {
        const { totalPrice } = await calculatePrice(
          selectedProduct.id,
          quantity
        )
        setPrice(totalPrice)
      } else {
        // Fallback to simple calculation
        setPrice(selectedProduct.basePrice * quantity)
      }
    } catch (error) {
      console.error('Error calculating price:', error)
      toast.error(
        'Ha ocurrido un error inesperado, verifique su conexión a internet'
      )
      // Fallback to base calculation if server action fails
      setPrice(selectedProduct.basePrice * quantity)
    } finally {
      setIsCalculatingPrice(false)
    }
  }, [selectedProduct, selectedOptions, quantity, productDetails])

  const debouncedUpdatePrice = useDebouncedCallback(updatePrice, 500)

  useEffect(() => {
    if (!selectedProduct || !productDetails) return

    const isAllRequiredOptionsSelected = () => {
      // Get required options
      const requiredOptions = productDetails.options?.filter(
        (option) => option.isRequired
      )

      // If no required options, return true
      if (!requiredOptions || requiredOptions.length === 0) return true

      // Check if all required options are selected
      return requiredOptions.every((option) => selectedOptions[option.name])
    }

    // Is valid if all required options are selected and quantity is within the range
    const valid =
      isAllRequiredOptionsSelected() &&
      quantity >= (selectedProduct.minQuantity || 1) &&
      (!selectedProduct.stock || quantity <= selectedProduct.stock)

    setIsFormValid(valid)
    if (!valid) return
    debouncedUpdatePrice()
  }, [
    selectedOptions,
    quantity,
    selectedProduct,
    productDetails,
    debouncedUpdatePrice,
  ])

  const confirmAddToCart = () => {
    if (!selectedProduct || !isFormValid || loading) return

    if (quantity < selectedProduct.minQuantity) {
      toast.error(
        `La cantidad mínima para este producto es ${selectedProduct.minQuantity}`
      )
      return
    }

    // Create variant info string for display
    const variantInfo = Object.entries(selectedOptions)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')

    addToCart({
      id: selectedProduct.id,
      mainImageUrl: selectedProduct.images?.[0] ?? '/imageplaceholder.webp',
      name: selectedProduct.name,
      unitPrice: price / quantity, // Calculate unit price from total
      total: price,
      quantity,
      variantInfo: Object.keys(selectedOptions).length > 0 ? variantInfo : null,
    })

    toast.success('Producto agregado al carrito')
    setSelectedProduct(null)
    setQuantity(1)
    setSelectedOptions({})
    setProductDetails(null)
  }

  const goToCheckout = () => {
    if (!isFormValid || loading) return
    console.log('Going to checkout with:', {
      ...selectedProduct,
      quantity,
      options: selectedOptions,
      price,
    })
    setSelectedProduct(null)
    setQuantity(1)
    setSelectedOptions({})
    setProductDetails(null)
  }

  return {
    confirmAddToCart,
    goToCheckout,
    quantity,
    setQuantity,
    selectedOptions,
    setSelectedOptions,
    price,
    isFormValid,
    loading,
    selectedProduct,
    setSelectedProduct,
    productDetails,
    isCalculatingPrice,
  }
}
