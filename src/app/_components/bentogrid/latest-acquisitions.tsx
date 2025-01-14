'use client'
import 'keen-slider/keen-slider.min.css'

import ProductCard from '@/components/product-card'
import { Product } from '@/contexts/cart-context'
import { useKeenSlider } from 'keen-slider/react'

export default function LatestAcquisitions({
  products,
}: {
  products: Product[]
}) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 16 },
      },
    },
  })
  return (
    <div className='bg-gray-50 p-6 rounded-lg'>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>
        Ultimas Adquisiciones
      </h3>
      <div ref={sliderRef} className='keen-slider'>
        {products.map((product) => (
          <div key={product.id} className='keen-slider__slide'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
