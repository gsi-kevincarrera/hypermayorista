import ProductGallery from '@/components/common/product-gallery'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import BentoGridGallery from './bento-grid-gallery'
import { ProductInDB } from '@/types'

export default function ForYou({
  products,
  total,
}: {
  products: ProductInDB[]
  total: number
}) {
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
      <BentoGridGallery initialProducts={products} total={total} />
    </div>
  )
}
