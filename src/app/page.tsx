import Hero from '@/components/hero'
import ProductGrid from '@/components/product-grid'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Hero />
      <ProductGrid />
    </div>
  )
}
