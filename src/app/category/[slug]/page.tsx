import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getCategoryBySlug } from '@/db/queries'

interface CategoryProps {
  params: {
    slug: string
  }
}

const hotPicks = [
  {
    id: 1,
    name: '6 functions Full automatic pvc mdf woodworking edge banding machine',
    image: '/wood-machine.jpg',
    priceRange: '$1,399.00-1,999.00',
    minOrder: '1 set',
    category: 'Wood Based Panels Machinery',
  },
  {
    id: 2,
    name: 'Small sachets spices powder automatic filling machine coffee packaging machine',
    image: '/packaging-machine.jpg',
    priceRange: '$95.00-415.00',
    minOrder: '1 set',
    category: 'Multi-Function Packaging Machines',
  },
  {
    id: 3,
    name: 'Automatic Home Socks Making Machine Sock Knitting Machine',
    image: '/sock-machine.jpg',
    priceRange: '$3,580.00-3,980.00',
    minOrder: '1 set',
    category: 'Sock Knitting Machines',
  },
]

export default async function CategoryPage({ params }: CategoryProps) {
  const { category, subcategories } = await getCategoryBySlug(params.slug)

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[400px] flex items-center justify-center'>
        <Image
          src='/banner.webp'
          alt='Industrial Machinery'
          fill
          className='object-cover brightness-50'
          priority
        />
        <div className='relative z-10 text-center text-white'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4'>
            {category.name}
          </h1>
          <p className='text-xl'>Descubre productos nuevos y en tendencia</p>
        </div>
      </div>

      {/* Subcategories Section - Overlapping Card */}
      {subcategories.length && (
        <div className='relative -mt-32 z-20 px-4'>
          <Card className='max-w-7xl mx-auto shadow-lg'>
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold mb-6'>
                Categorias relacionadas
              </h2>
              <ScrollArea className='w-full whitespace-nowrap rounded-lg'>
                <div className='flex w-max space-x-4 pb-4'>
                  {subcategories.map((subcategory, index) => (
                    <Link
                      key={index}
                      href={`/category/${subcategory.slug}`}
                      className='inline-block'
                    >
                      <Card className='w-[140px] hover:border-purple-600 transition-colors'>
                        <CardContent className='p-4'>
                          <div className='aspect-square relative mb-3'>
                            <Image
                              src={
                                subcategory.imageUrl || '/imageplaceholder.webp'
                              }
                              alt={subcategory.name}
                              fill
                              className='object-contain'
                            />
                          </div>
                          <p className='text-sm text-center line-clamp-2'>
                            {subcategory.name}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hot Picks Section */}
      <div className='bg-gray-50 py-12 mt-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold mb-8'>Expert-curated hot picks</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {hotPicks.map((product, index) => (
              <Card
                key={product.id}
                className='overflow-hidden hover:border-purple-600 transition-colors'
              >
                <CardContent className='p-0'>
                  <div className='relative'>
                    <div className='absolute top-4 left-4 bg-orange-400 text-white px-2 py-1 rounded text-sm'>
                      #{index + 1}
                    </div>
                    <div className='aspect-video relative'>
                      <Image
                        src={product.image || '/imageplaceholder.webp'}
                        alt={product.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold text-lg mb-2'>
                      {product.category}
                    </h3>
                    <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
                      {product.name}
                    </p>
                    <div className='space-y-2'>
                      <p className='text-xl font-bold text-purple-600'>
                        {product.priceRange}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Min. order: {product.minOrder}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='mt-8 text-center'>
            <Button variant='outline' className='group'>
              View All Products
              <ChevronRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
