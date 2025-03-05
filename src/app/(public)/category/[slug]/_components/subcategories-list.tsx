import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Category } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function SubcategoriesList({
  subcategories,
}: {
  subcategories: Category[]
}) {
  return (
    <div className='relative -mt-32 z-20 px-4'>
      <Card className='max-w-7xl mx-auto shadow-lg'>
        <CardContent className='p-6'>
          <h2 className='text-xl font-semibold mb-6'>
            Categorías relacionadas
          </h2>
          <ScrollArea className='w-full whitespace-nowrap rounded-lg'>
            <div className='flex w-max space-x-4 pb-4'>
              {subcategories.map((subcategory, index) => (
                <Link
                  key={subcategory.id}
                  href={`/category/${subcategory.slug}`}
                  className='inline-block'
                >
                  <Card className='w-[140px] hover:border-purple-600 transition-colors'>
                    <CardContent className='p-4'>
                      <div className='aspect-square relative mb-3'>
                        <Image
                          src={subcategory.imageUrl || '/imageplaceholder.webp'}
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
  )
}
