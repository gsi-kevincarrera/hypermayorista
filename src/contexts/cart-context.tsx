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
import { useDebouncedCallback } from 'use-debounce'

/**
 * Key used for localStorage to persist cart data between sessions
 */
const CART_STORAGE_KEY = 'cart'

/**
 * Creates a user-specific storage key for localStorage
 * @param userId - The user's ID from authentication
 * @returns A storage key that is either user-specific or generic
 */
const getUserCartKey = (userId: string | null | undefined) => {
  return userId ? `${CART_STORAGE_KEY}_${userId}` : CART_STORAGE_KEY
}

/**
 * Interface defining all cart operations and state available through the context
 */
interface CartContextType {
  /** Array of products currently in the cart */
  cart: ProductInCart[]

  /** Adds a product to the cart and syncs with database */
  addToCart: (product: ProductInCart) => Promise<boolean>

  /** Removes a product from the cart and syncs with database */
  removeFromCart: (productId: number, variantId: number | null) => Promise<void>

  /** Checks if a product is already in the cart */
  isInCart: (productId: number) => boolean

  /** Currently selected product (used for product details/add to cart flow) */
  selectedProduct: BaseProduct | null

  /** Sets the currently selected product, redirects to sign-in if not authenticated */
  setSelectedProduct: (product: BaseProduct | null) => void

  /** Toggles selection state of a specific item in cart (for checkout) */
  toggleItemSelection: (productId: number, variantId: number | null) => void

  /** Toggles selection state of all items in cart (for checkout) */
  toggleAllItemsSelection: (selected: boolean) => void

  /** Last item removed from cart (for undo functionality) */
  lastRemovedItem: ProductInCart | null

  /** Restores the last removed item back to the cart */
  undoRemove: () => void

  /** Indicates if the cart is currently loading */
  isLoading: boolean

  /** Indicates if an item is currently being added to cart */
  isAddingToCart: boolean

  /** IDs of items currently being removed (for optimistic UI updates) */
  removingItemIds: string[]
}

/**
 * Context that provides cart functionality throughout the application
 */
const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * CartProvider component that manages cart state and operations
 *
 * This provider implements a hybrid approach to cart management:
 * 1. Database is the source of truth for authenticated users
 * 2. LocalStorage is used for immediate updates and offline support
 * 3. Optimistic UI updates are used for better user experience
 * 4. Debounced operations are used to prevent excessive database calls
 *
 * @param children - React children to be wrapped by the provider
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // Core cart state
  const [cart, setCart] = useState<ProductInCart[]>([])
  const [selectedProduct, setSelectedProduct] = useState<BaseProduct | null>(
    null
  )
  const [lastRemovedItem, setLastRemovedItem] = useState<ProductInCart | null>(
    null
  )

  // UI state indicators
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [removingItemIds, setRemovingItemIds] = useState<string[]>([])

  // Hooks
  const router = useRouter()
  const { isSignedIn, userId } = useAuth()

  // Track user changes to handle sign-in/sign-out scenarios
  const prevUserIdRef = useRef<string | null | undefined>(null)

  /**
   * Loads cart data from database and syncs with localStorage
   *
   * This function handles several scenarios:
   * 1. User changes (sign-in/sign-out): Reset cart state
   * 2. Not signed in: Clear cart and localStorage
   * 3. Signed in: Load cart from database (source of truth)
   * 4. Conflict resolution: If localStorage and DB differ, determine which to use
   *
   * Design decision: Database is the source of truth, but we use localStorage
   * for immediate updates and offline support.
   */
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

  // Load cart on initial render and when authentication state changes
  useEffect(() => {
    loadCart()
  }, [loadCart])

  /**
   * Debounced function to update item selection in database
   *
   * Design decision: Use debouncing to prevent excessive database calls
   * when users rapidly toggle selections, improving performance and reducing
   * database load.
   */
  const debouncedUpdateDb = useDebouncedCallback(
    async (
      userId: string,
      productId: number,
      isSelected: boolean,
      variantId?: number | null
    ) => {
      try {
        await updateCartItemSelectionDb(
          userId,
          productId,
          isSelected,
          variantId
        )
      } catch (error) {
        console.error('Error updating item selection in database:', error)
      }
    },
    500
  )

  /**
   * Debounced function to update multiple items' selection states in database
   *
   * Design decision: Batch updates for multiple items to reduce database calls
   * and improve performance when selecting/deselecting all items.
   */
  const debouncedBulkUpdateDb = useDebouncedCallback(
    async (
      userId: string,
      items: {
        productId: number
        isSelected: boolean
        variantId?: number | null
      }[]
    ) => {
      try {
        // Process all updates in parallel
        await Promise.all(
          items.map((item) =>
            updateCartItemSelectionDb(
              userId,
              item.productId,
              item.isSelected,
              item.variantId
            )
          )
        )
      } catch (error) {
        console.error('Error updating multiple items in database:', error)
      }
    },
    500
  )

  /**
   * Adds a product to the cart
   *
   * Design decisions:
   * 1. Optimistic UI: Update local state immediately for better UX
   * 2. Database sync: Update database after local state for persistence
   * 3. Authentication check: Redirect to sign-in if not authenticated
   *
   * @param product - The product to add to the cart
   * @returns Promise resolving to success status
   */
  const addToCart = async (product: ProductInCart): Promise<boolean> => {
    if (!isSignedIn || !userId) {
      router.push('/sign-in')
      return false
    }

    setIsAddingToCart(true)

    try {
      const userCartKey = getUserCartKey(userId)

      // Determine if the product already exists in the cart
      const isUpdate = cart.some(
        (item) => item.id === product.id && item.variantId === product.variantId
      )

      // Create the new cart
      const newCart = isUpdate
        ? cart.map((item) =>
            item.id === product.id && item.variantId === product.variantId
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          )
        : [product, ...cart] // Add the product at the beginning if it doesn't exist

      // Update the cart state
      setCart(newCart)

      // Save the cart to localStorage
      localStorage.setItem(userCartKey, JSON.stringify(newCart))

      await addToCartDb(userId, {
        productId: product.id,
        variantId: product.variantId,
        variantInfo: product.variantInfo,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        isUpdate, // This flag is to avoid the query
      })

      return true
    } catch (error) {
      console.error('Error adding to cart:', error)
      return false
    } finally {
      setIsAddingToCart(false)
    }
  }

  /**
   * Removes a product from the cart
   *
   * Design decisions:
   * 1. Optimistic UI: Mark item as being removed immediately
   * 2. Undo functionality: Store removed item for potential restoration
   * 3. Database sync: Remove from database before updating local state
   *
   * @param productId - ID of the product to remove
   */
  const removeFromCart = async (
    productId: number,
    variantId: number | null
  ) => {
    // Find the item to remove
    const itemToRemove = cart.find(
      (item) => item.id === productId && item.variantId === variantId
    )
    if (!itemToRemove) return

    // Add to removing items list for optimistic UI
    setRemovingItemIds((prev) => [...prev, `${productId}-${variantId}`])

    // Store the item for potential undo
    setLastRemovedItem(itemToRemove)

    try {
      // Remove from database
      if (isSignedIn && userId) {
        await removeFromCartDb(userId, productId, itemToRemove.variantId)
      }

      // Update local state after DB operation succeeds
      setCart((prev) => {
        const newCart = prev.filter(
          (item) => item.id !== productId || item.variantId !== variantId
        )
        const userCartKey = getUserCartKey(userId)
        localStorage.setItem(userCartKey, JSON.stringify(newCart))
        return newCart
      })
    } catch (error) {
      console.error('Error removing item from cart:', error)
    } finally {
      // Remove from the removing list
      setRemovingItemIds((prev) =>
        prev.filter((id) => id !== `${productId}-${variantId}`)
      )
    }
  }

  /**
   * Restores the last removed item back to the cart
   *
   * Design decision: Provide undo functionality for accidental removals,
   * improving user experience by allowing easy recovery from mistakes.
   */
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

  /**
   * Toggles the selection state of a specific item in the cart
   *
   * Design decisions:
   * 1. Optimistic UI: Update local state immediately
   * 2. Debounced database update: Prevent excessive database calls
   *
   * @param productId - ID of the product to toggle selection
   */
  const toggleItemSelection = async (
    productId: number,
    variantId: number | null
  ) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        if (item.id === productId && item.variantId === variantId) {
          const updatedItem = { ...item, isSelected: !item.isSelected }

          // Schedule database update without blocking UI
          if (isSignedIn && userId) {
            debouncedUpdateDb(
              userId,
              productId,
              updatedItem.isSelected,
              item.variantId
            )
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

  /**
   * Toggles the selection state of all items in the cart
   *
   * Design decisions:
   * 1. Batch updates: Update all items at once for efficiency
   * 2. Debounced database update: Prevent excessive database calls
   *
   * @param selected - Whether to select or deselect all items
   */
  const toggleAllItemsSelection = async (selected: boolean) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        return { ...item, isSelected: selected }
      })

      // Schedule database update without blocking UI
      if (isSignedIn && userId) {
        const updateItems = newCart.map((item) => ({
          productId: item.id,
          isSelected: selected,
          variantId: item.variantId ?? null,
        }))

        debouncedBulkUpdateDb(userId, updateItems)
      }

      const userCartKey = getUserCartKey(userId)
      localStorage.setItem(userCartKey, JSON.stringify(newCart))
      return newCart
    })
  }

  /**
   * Checks if a product is already in the cart
   *
   * @param productId - ID of the product to check
   * @returns Boolean indicating if the product is in the cart
   */
  const isInCart = (productId: number) => {
    return cart.some((p) => p.id === productId)
  }

  /**
   * Sets the currently selected product
   *
   * Design decision: Redirect to sign-in if not authenticated,
   * ensuring users are signed in before proceeding with product selection.
   *
   * @param product - The product to select or null to clear selection
   */
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
        toggleAllItemsSelection,
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

/**
 * Custom hook to access the cart context
 *
 * Design decision: Provide a custom hook for easier access to cart functionality
 * throughout the application, with built-in error handling for misuse.
 *
 * @returns The cart context value
 * @throws Error if used outside of CartProvider
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
