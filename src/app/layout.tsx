import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/contexts/cart-context'
import AddToCartDrawer from '@/components/add-to-cart-drawer'
import CartDrawer from '@/components/cart-drawer'
import { getAllCategoriesNames } from '@/db/queries'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hipermayorista | Compra a lo grande',
  description: 'Una plataforma para compras en el mercado mayorista',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getAllCategoriesNames()
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header categories={categories} />
        <CartProvider>
          {children}
          <AddToCartDrawer />
          <CartDrawer />
        </CartProvider>
        <Footer />
        <Toaster richColors closeButton position='top-right' />
      </body>
    </html>
  )
}
