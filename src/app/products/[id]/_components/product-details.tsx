import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import AppBreadcrumb from '@/components/navigation/app-breadcrumb'
import { ProductInDB } from '@/types'

const relatedProducts = [
  {
    id: 1,
    name: 'Pasta Penne',
    price: 150.0,
    image: '/imageplaceholder.webp',
  },
  {
    id: 2,
    name: 'Pasta Fusilli',
    price: 160.0,
    image: '/imageplaceholder.webp',
  },
  {
    id: 3,
    name: 'Pasta Farfalle',
    price: 170.0,
    image: '/imageplaceholder.webp',
  },
  {
    id: 4,
    name: 'Pasta Rigatoni',
    price: 180.0,
    image: '/imageplaceholder.webp',
  },
]

export default function ProductDetails({ product }: { product: ProductInDB }) {
  return (
    <div className='min-h-screen bg-gray-50 mt-12'>
      <div className='container mx-auto px-4 py-8'>
        {/* Product Detail */}
        <div className='flex flex-col md:flex-row gap-8 mb-16'>
          {/* Image Gallery */}
          <div className='md:w-1/2'>
            <div className='flex gap-4'>
              <div className='w-1/5'>
                <div
                  className={
                    'mb-4 border-2 rounded cursor-pointer transition-al'
                  }
                >
                  <Image
                    src={'/imageplaceholder.webp'}
                    alt={`${product.name}`}
                    width={80}
                    height={80}
                    className='rounded'
                  />
                </div>
              </div>
              <div className='w-4/5'>
                <Image
                  src={'/imageplaceholder.webp'}
                  alt={product.name}
                  width={400}
                  height={400}
                  className='rounded-lg'
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className='md:w-1/2'>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p className='text-2xl font-semibold text-[#581c87] mb-4'>
              CUP {Number(product.price).toFixed(2)}
            </p>
            <p className='text-gray-600 mb-6'>{product.description}</p>
            <div className='flex gap-4 mb-6'>
              <Button className='flex-1 bg-[#581c87] hover:bg-[#4c1d6f] text-white'>
                <ShoppingCart className='mr-2 h-5 w-5' /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        <div>
          <h2 className='text-2xl font-bold mb-4'>
            Revisa también estas ofertas
          </h2>
          <Carousel className='w-full max-w-sm mx-auto md:max-w-full'>
            <CarouselContent>
              {relatedProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className='md:basis-1/3 lg:basis-1/4'
                >
                  <Link href={`/products/${product.id}`}>
                    <Card>
                      <CardContent className='flex flex-col items-center p-6'>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={150}
                          height={150}
                          className='mb-4 rounded'
                        />
                        <h3 className='font-semibold text-lg mb-2'>
                          {product.name}
                        </h3>
                        <p className='text-[#581c87] font-medium'>
                          CUP {product.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
