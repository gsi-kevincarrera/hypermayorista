import { Category } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function TrendingCategories({
  trendingCategories,
}: {
  trendingCategories: Category[]
}) {
  return (
    <div className='bg-gray-50 p-6 rounded-lg'>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>
        Categorías destacadas
      </h3>
      <div className='grid grid-cols-2 gap-4'>
        {trendingCategories.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`}>
            <div className='relative overflow-hidden rounded-lg cursor-pointer hover:outline hover:outline-purple-600'>
              <Image
                src={category.imageUrl ?? '/imageplaceholder.webp'}
                alt={category.name}
                width={200}
                height={150}
                className='object-cover w-full h-32'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/55 to-transparent bg-opacity-50 flex items-center justify-center  '>
                <div className='text-center text-white'>
                  <h4 className='text-base sm:text-lg font-semibold'>
                    {category.name}
                  </h4>
                  <p className='text-sm'>+100 productos</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
