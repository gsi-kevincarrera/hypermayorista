import { useCart } from '@/contexts/cart-context'
import { calculatePrice, getVariantByOptions } from '@/db/actions'
import { getProductById } from '@/db/queries'
import { ProductOption, PriceBreak } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
import { useRouter } from 'next/navigation'
import { isAllRequiredOptionsSelected } from '@/lib/utils'
import { ProductDetails } from '@/types'

export default function useConfirmAddToCart(productOverride?: ProductDetails) {
  const { setSelectedProduct, selectedProduct, addToCart, isAddingToCart } =
    useCart()

  // If a product override is provided, use it instead of the selected product
  const product = useMemo(
    () => productOverride || selectedProduct,
    [productOverride, selectedProduct]
  )

  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({})
  const [price, setPrice] = useState(0)
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [productDetails, setProductDetails] = useState<{
    options: ProductOption[] | null
    priceBreaks: PriceBreak[] | null
  } | null>(null)

  // Track the selected variant ID
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  )

  useEffect(() => {
    if (!product) return
    setQuantity(product.minQuantity || 1)
    setPrice((product.basePrice ?? 0) * (product.minQuantity || 1))
  }, [product])

  // Fetch product details when a product is selected
  useEffect(() => {
    if (!product) return

    const fetchProductDetails = async () => {
      setLoading(true)
      try {
        // Use the server action to get product details
        const details = await getProductById(product.id)
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
    // Reset selected options and variant ID when product changes
    setSelectedOptions({})
    setSelectedVariantId(null)
  }, [product])

  const updatePrice = useCallback(async () => {
    if (!product) return

    // Check if we need to call the server action
    const hasOptions =
      productDetails?.options && productDetails.options.length > 0
    const hasPriceBreaks =
      productDetails?.priceBreaks && productDetails.priceBreaks.length > 0

    // If there are no options or price breaks, calculate price locally
    if (!hasOptions && !hasPriceBreaks) {
      setPrice(product.basePrice * quantity)
      return
    }

    setIsCalculatingPrice(true)
    try {
      //Get variant by selected options, this is key to calculate the price using the price adjustments
      const variant = await getVariantByOptions(product.id, selectedOptions)

      if (variant) {
        // Store the variant ID for later use
        setSelectedVariantId(variant.id)

        const { totalPrice } = await calculatePrice(
          product.id,
          quantity,
          variant.id
        )
        setPrice(totalPrice)
        return
      }

      // If we have price breaks or no variant was found, calculate price based on base price and price breaks
      if (hasPriceBreaks) {
        const { totalPrice } = await calculatePrice(product.id, quantity)
        setPrice(totalPrice)
      } else {
        // Fallback to simple calculation
        setPrice(product.basePrice * quantity)
      }

      // No variant was found, reset the variant ID
      setSelectedVariantId(null)
    } catch (error) {
      console.error('Error calculating price:', error)
      toast.error(
        'Ha ocurrido un error inesperado, verifique su conexión a internet'
      )
      // Fallback to base calculation if server action fails
      setPrice(product.basePrice * quantity)
    } finally {
      setIsCalculatingPrice(false)
    }
  }, [product, selectedOptions, quantity, productDetails])

  const debouncedUpdatePrice = useDebouncedCallback(updatePrice, 500)

  useEffect(() => {
    if (!product || !productDetails) return

    // Is valid if all required options are selected and quantity is within the range
    const valid =
      isAllRequiredOptionsSelected(productDetails, selectedOptions) &&
      quantity >= (product.minQuantity || 1) &&
      (!product.stock || quantity <= product.stock)

    setIsFormValid(valid)
    if (!valid) return
    debouncedUpdatePrice()
  }, [selectedOptions, quantity, product, productDetails, debouncedUpdatePrice])

  const confirmAddToCart = async () => {
    if (!product || !isFormValid || loading || isAddingToCart) return

    if (quantity < product.minQuantity) {
      toast.error(
        `La cantidad mínima para este producto es ${product.minQuantity}`
      )
      return
    }

    try {
      // Create variant info string for display
      const variantInfo = Object.entries(selectedOptions)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')

      const success = await addToCart({
        id: product.id,
        variantId: selectedVariantId,
        mainImageUrl: product.images?.[0] ?? '/imageplaceholder.webp',
        name: product.name,
        unitPrice: price / quantity, // Calculate unit price from total
        total: price,
        quantity,
        variantInfo:
          Object.keys(selectedOptions).length > 0 ? variantInfo : null,
        isSelected: true,
        isBeingRemoved: false,
      })

      if (success) {
        toast.success('Producto agregado al carrito')
        // Don't close the drawer immediately for an smooth behavior
        if (!productOverride) {
          setTimeout(() => {
            setSelectedProduct(null)
            setSelectedOptions({})
            setProductDetails(null)
            setSelectedVariantId(null)
          }, 500)
        }
      } else {
        toast.error('Error al agregar al carrito. Intente nuevamente.')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Error al agregar al carrito. Intente nuevamente.')
    }
  }

  const goToCheckout = () => {
    if (!isFormValid || loading) return

    // First add to cart
    confirmAddToCart().then(() => {
      // Then navigate to checkout
      router.push('/checkout')
    })
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
    isAddingToCart: isAddingToCart,
  }
}
