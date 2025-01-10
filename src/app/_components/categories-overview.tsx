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

const categories = [
  { name: 'Electronics', count: 5000, image: '/electronics.jpg' },
  { name: 'Apparel', count: 3500, image: '/apparel.jpg' },
  { name: 'Home & Garden', count: 4200, image: '/home-garden.jpg' },
  { name: 'Beauty', count: 2800, image: '/beauty.jpg' },
  { name: 'Automotive', count: 1900, image: '/automotive.jpg' },
  { name: 'Sports & Outdoors', count: 3100, image: '/sports-outdoors.jpg' },
]

export default function CategoriesOverview() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
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

  return (
    <section className='py-12 sm:py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>
          Explore Categories
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full'
          setApi={setApi}
        >
          <CarouselContent className='-ml-2 sm:-ml-4'>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className='pl-2 sm:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
              >
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-4 sm:p-6'>
                      <div className='relative w-full h-full'>
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className='object-cover rounded-lg'
                        />
                        <div className='absolute inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center rounded-lg'>
                          <div className='text-center text-white'>
                            <h3 className='text-lg sm:text-xl font-semibold'>
                              {category.name}
                            </h3>
                            <p className='text-sm sm:text-base'>
                              {category.count.toLocaleString()} products
                            </p>
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
        <div className='py-2 text-center text-sm text-muted-foreground'>
          Slide {current} of {count}
        </div>
      </div>
    </section>
  )
}
