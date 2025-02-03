'use client'

import { ProductInCart, ProductInDB } from '@/types'
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
  selectedProduct: ProductInDB | null
  setSelectedProduct: (product: ProductInDB | null) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ProductInCart[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductInDB | null>(
    null
  )
  const router = useRouter()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCart(storedCart)
    }
  }, [isSignedIn])

  const addToCart = (product: ProductInCart) => {
    setCart((prev) => {
      if (!prev.some((item) => item.id === product.id)) {
        const newCart = [...prev, product]
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
      }
      return prev
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const isInCart = (productId: number) => {
    return cart.some((p) => p.id === productId)
  }

  const selectProduct = (product: ProductInDB | null) => {
    if (!isSignedIn) {
      router.push('/sign-in')
      console.log('No estas logueado')
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
