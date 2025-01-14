'use client'
import 'keen-slider/keen-slider.min.css'

import ProductCard from '@/components/product-card'
import { useKeenSlider } from 'keen-slider/react'
import { Product } from '@/types'
import { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function LatestAcquisitions({
  products,
}: {
  products: Product[]
}) {
  const [api, setApi] = useState<CarouselApi>()

  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    const startTimer = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        api?.scrollNext()
      }, 5000) // Change slide every 5 seconds
    }

    if (api) {
      startTimer()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [api, current])

  if (products.length === 0) {
    return null
  }
  return (
    <div className='bg-gray-50 p-6 rounded-lg w-full mt-7'>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>
        Ultimas Adquisiciones
      </h3>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full '
        setApi={setApi}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className='pl-2 sm:pl-4 md:basis-1/3 lg:basis-1/4'
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden sm:block'>
          <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2' />
          <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2' />
        </div>
      </Carousel>
      <div className='flex justify-center mt-4'>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === current ? 'bg-purple-800' : 'bg-gray-300'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
