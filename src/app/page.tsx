import Hero from '@/components/main-page/hero'
import ProductGrid from '@/components/main-page/product-grid'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Hero />
      <ProductGrid />
    </div>
  )
}
