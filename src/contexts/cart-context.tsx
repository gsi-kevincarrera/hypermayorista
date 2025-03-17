'use client'

import { BaseProduct, ProductInCart } from '@/types'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import {
  getUserCart,
  addToCartDb,
  removeFromCartDb,
  updateCartItemSelectionDb,
  syncCartWithDb,
} from '@/db/queries'

interface CartContextType {
  cart: ProductInCart[]
  addToCart: (product: ProductInCart) => Promise<boolean>
  removeFromCart: (productId: number) => Promise<void>
  isInCart: (productId: number) => boolean
  selectedProduct: BaseProduct | null
  setSelectedProduct: (product: BaseProduct | null) => void
  toggleItemSelection: (productId: number) => void
  lastRemovedItem: ProductInCart | null
  undoRemove: () => void
  isLoading: boolean
  isAddingToCart: boolean
  removingItemIds: number[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Key used for localStorage
const CART_STORAGE_KEY = 'cart'

// Create a user-specific storage key
const getUserCartKey = (userId: string | null | undefined) => {
  return userId ? `${CART_STORAGE_KEY}_${userId}` : CART_STORAGE_KEY
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ProductInCart[]>([])
  const [selectedProduct, setSelectedProduct] = useState<BaseProduct | null>(
    null
  )
  const [lastRemovedItem, setLastRemovedItem] = useState<ProductInCart | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [removingItemIds, setRemovingItemIds] = useState<number[]>([])
  const router = useRouter()
  const { isSignedIn, userId } = useAuth()

  // Keep track of the previous user ID to detect user changes
  const prevUserIdRef = useRef<string | null | undefined>(null)

  // Load cart from database and sync with localStorage
  const loadCart = useCallback(async () => {
    const userChanged = prevUserIdRef.current !== userId
    prevUserIdRef.current = userId

    // Clear cart state when user changes or signs out
    if (userChanged) {
      setCart([])
    }

    if (!isSignedIn || !userId) {
      // If user is not signed in, clear cart and localStorage
      localStorage.removeItem(CART_STORAGE_KEY)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const userCartKey = getUserCartKey(userId)

      // Get cart from database (source of truth)
      const dbCart = await getUserCart(userId)

      // If user has changed, don't try to merge localStorage
      if (userChanged) {
        // User changed, just use DB cart and update localStorage
        setCart(dbCart)
        localStorage.setItem(userCartKey, JSON.stringify(dbCart))
      } else {
        // Same user, try to merge if needed
        const storedCart = JSON.parse(localStorage.getItem(userCartKey) || '[]')

        // If localStorage cart is different from DB cart, sync them
        if (JSON.stringify(dbCart) !== JSON.stringify(storedCart)) {
          // If localStorage has items but DB doesn't, sync localStorage to DB
          if (storedCart.length > 0 && dbCart.length === 0) {
            await syncCartWithDb(userId, storedCart)
            setCart(storedCart)
          } else {
            // Otherwise, DB is source of truth
            setCart(dbCart)
            localStorage.setItem(userCartKey, JSON.stringify(dbCart))
          }
        } else {
          // Both are the same, just set the cart
          setCart(dbCart)
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      // On error, use an empty cart
      setCart([])
    } finally {
      setIsLoading(false)
    }
  }, [isSignedIn, userId])

  // Effect to handle user changes and initial load
  useEffect(() => {
    loadCart()
  }, [loadCart])

  const addToCart = async (product: ProductInCart): Promise<boolean> => {
    if (!isSignedIn || !userId) {
      router.push('/sign-in')
      return false
    }

    setIsAddingToCart(true)
    try {
      // First update local state for immediate feedback
      setCart((prev) => {
        if (!prev.some((item) => item.id === product.id)) {
          const newCart = [product, ...prev]
          const userCartKey = getUserCartKey(userId)
          localStorage.setItem(userCartKey, JSON.stringify(newCart))
          return newCart
        }
        return prev
      })

      // Then update database
      if (userId) {
        await addToCartDb(userId, {
          productId: product.id,
          variantId: product.variantId,
          variantInfo: product.variantInfo,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
        })
      }

      return true
    } catch (error) {
      console.error('Error adding to cart in database:', error)
      return false
    } finally {
      setIsAddingToCart(false)
    }
  }

  const removeFromCart = async (productId: number) => {
    // Find the item to remove
    const itemToRemove = cart.find((item) => item.id === productId)
    if (!itemToRemove) return

    // Add to removing items list for optimistic UI
    setRemovingItemIds((prev) => [...prev, productId])

    // Store the item for potential undo
    setLastRemovedItem(itemToRemove)

    try {
      // Remove from database
      if (isSignedIn && userId) {
        await removeFromCartDb(userId, productId, itemToRemove.variantId)
      }

      // Update local state after DB operation succeeds
      setCart((prev) => {
        const newCart = prev.filter((item) => item.id !== productId)
        const userCartKey = getUserCartKey(userId)
        localStorage.setItem(userCartKey, JSON.stringify(newCart))
        return newCart
      })
    } catch (error) {
      console.error('Error removing item from cart:', error)
    } finally {
      // Remove from the removing list
      setRemovingItemIds((prev) => prev.filter((id) => id !== productId))
    }
  }

  const undoRemove = async () => {
    if (lastRemovedItem && userId) {
      setCart((prev) => {
        const newCart = [lastRemovedItem, ...prev]
        const userCartKey = getUserCartKey(userId)
        localStorage.setItem(userCartKey, JSON.stringify(newCart))

        // Add back to database
        if (isSignedIn && userId) {
          addToCartDb(userId, {
            productId: lastRemovedItem.id,
            variantId: lastRemovedItem.variantId,
            variantInfo: lastRemovedItem.variantInfo,
            quantity: lastRemovedItem.quantity,
            unitPrice: lastRemovedItem.unitPrice,
          }).catch((error) => {
            console.error('Error adding back to cart in database:', error)
          })
        }

        return newCart
      })
      setLastRemovedItem(null)
    }
  }

  const toggleItemSelection = async (productId: number) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        if (item.id === productId) {
          const updatedItem = { ...item, isSelected: !item.isSelected }

          // Update in database
          if (isSignedIn && userId) {
            updateCartItemSelectionDb(
              userId,
              productId,
              updatedItem.isSelected,
              item.variantId
            ).catch((error) => {
              console.error('Error updating item selection in database:', error)
            })
          }

          return updatedItem
        }
        return item
      })

      const userCartKey = getUserCartKey(userId)
      localStorage.setItem(userCartKey, JSON.stringify(newCart))
      return newCart
    })
  }

  const isInCart = (productId: number) => {
    return cart.some((p) => p.id === productId)
  }

  const selectProduct = (product: BaseProduct | null) => {
    if (product && !isSignedIn) {
      router.push('/sign-in')
      return
    }
    setSelectedProduct(product)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        selectedProduct,
        setSelectedProduct: selectProduct,
        toggleItemSelection,
        lastRemovedItem,
        undoRemove,
        isLoading,
        isAddingToCart,
        removingItemIds,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
