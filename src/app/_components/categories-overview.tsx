'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useEffect, useState, useRef } from 'react'
import { type CarouselApi } from '@/components/ui/carousel'
import { Category } from '@/types'
import { useRouter } from 'next/navigation'

export default function CategoriesOverview({
  categories,
}: {
  categories: Category[]
}) {
  const [api, setApi] = useState<CarouselApi>()

  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()

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

  if (categories.length === 0) {
    return <div>No hay categorías disponibles</div>
  }
  return (
    <section className='py-12 sm:py-16 bg-gray-100' id='categories'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>
          Explorar Categorías
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full max-w-5xl mx-auto'
          setApi={setApi}
        >
          <CarouselContent className='-ml-2 sm:-ml-4'>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className='pl-2 sm:pl-4 md:basis-1/3 lg:basis-1/4 cursor-pointer'
                onClick={() => router.push(`/category/${category.slug}`)}
              >
                <div className='p-1'>
                  <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-600'>
                    <CardContent className='p-0'>
                      <div className='relative w-full aspect-square'>
                        <Image
                          src={category.imageUrl ?? '/imageplaceholder.webp'}
                          alt={category.name}
                          fill
                          className='object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/55 to-transparent flex items-end p-4'>
                          <div className='text-white'>
                            <h3 className='text-lg font-semibold'>
                              {category.name}
                            </h3>
                            <p className='text-sm'>+100 productos</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
    </section>
  )
}
