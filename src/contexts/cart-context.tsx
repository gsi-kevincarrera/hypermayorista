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
} from 'react'

interface CartContextType {
  cart: ProductInCart[]
  addToCart: (product: ProductInCart) => void
  removeFromCart: (productId: number) => void
  isInCart: (productId: number) => boolean
  selectedProduct: BaseProduct | null
  setSelectedProduct: (product: BaseProduct | null) => void
  toggleItemSelection: (productId: number) => void
  lastRemovedItem: ProductInCart | null
  undoRemove: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ProductInCart[]>([])
  const [selectedProduct, setSelectedProduct] = useState<BaseProduct | null>(
    null
  )
  const [lastRemovedItem, setLastRemovedItem] = useState<ProductInCart | null>(
    null
  )
  const router = useRouter()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCart(storedCart)
    } else {
      setCart([])
    }
  }, [isSignedIn])

  const addToCart = (product: ProductInCart) => {
    setCart((prev) => {
      if (!prev.some((item) => item.id === product.id)) {
        const newCart = [product, ...prev]
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
      }
      return prev
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const itemToRemove = prev.find((item) => item.id === productId)
      if (itemToRemove) {
        setLastRemovedItem(itemToRemove)
      }
      const newCart = prev.filter((item) => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const undoRemove = () => {
    if (lastRemovedItem) {
      setCart((prev) => {
        const newCart = [lastRemovedItem, ...prev]
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
      })
      setLastRemovedItem(null)
    }
  }

  const toggleItemSelection = (productId: number) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        if (item.id === productId) {
          return { ...item, isSelected: !item.isSelected }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const isInCart = (productId: number) => {
    return cart.some((p) => p.id === productId)
  }

  const selectProduct = (product: BaseProduct | null) => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    setSelectedProduct(product)
  }

  return (
    <CartContext
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
      }}
    >
      {children}
    </CartContext>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
