'use client'
import { Search, ShoppingCart } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

const categories = [
  'Todos los productos',
  'Alimentos',
  'Belleza y Salud',
  'Hogar y Decoración',
  'Ropa y Accesorios',
  'Partes y Piezas',
  'Material de O',
]

export default function Header() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className='sticky top-0 z-10'>
      <header className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4'>
          <div className='flex h-16 items-center gap-4'>
            <Link href='/' className='flex items-center gap-2'>
              <span className='text-primary'>Hyper.</span>
              <span className='font-bold text-2xl text-gray-800'>
                Mayorista
              </span>
            </Link>
            <div className='flex-1 flex gap-2'>
              <div className='relative flex-1 max-w-2xl'>
                <Input
                  className='w-full pl-3 pr-12 border-gray-300 focus:border-primary focus:ring-primary'
                  placeholder='Buscar productos...'
                />
                <Button
                  size='icon'
                  className='absolute right-0 top-0 h-full rounded-l-none bg-primary hover:bg-primary/90 text-white'
                >
                  <Search className='h-4 w-4' />
                  <span className='sr-only'>Search</span>
                </Button>
              </div>
            </div>
            <Button variant='ghost' className='gap-2 text-gray-700'>
              <ShoppingCart className='h-5 w-5' />
              <span>CUP 0,00</span>
            </Button>
          </div>
        </div>
      </header>

      <div className='bg-gray-100 py-2 relative'>
        <Carousel className='w-full max-w-screen-xl mx-auto'>
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className='basis-1/4 md:basis-1/6 lg:basis-1/8'
              >
                <Card className='bg-transparent border-none'>
                  <CardContent className='flex items-center justify-center p-2'>
                    <Button
                      variant='ghost'
                      className={`text-sm ${
                        index === activeCategory
                          ? 'text-primary font-semibold'
                          : 'text-gray-700'
                      }`}
                      onClick={() => setActiveCategory(index)}
                    >
                      {category}
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100' />
          <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100' />
        </Carousel>
      </div>
    </section>
  )
}
