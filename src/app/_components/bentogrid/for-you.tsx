import ProductGallery from '@/components/product-gallery'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ForYou({ products }: { products: Product[] }) {
  return (
    <div className='bg-gray-50 p-6 rounded-lg w-full mt-7'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-xl sm:text-2xl font-semibold'>Productos para ti</h3>
          <Link
            href='/products'
            className='text-primary text-lg font-bold flex gap-1 items-center group'
          >
            Explorar todo el catálogo
            <ChevronRight className='h-5 w-5 ml-2 text-primary group-hover:scale-125 transition mt-1' />
          </Link>
      </div>
      <ProductGallery initialProducts={products} />
    </div>
  )
}
