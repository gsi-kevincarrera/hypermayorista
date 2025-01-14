import Image from 'next/image'

export default function TrendingCategories({ trendingCategories }: { trendingCategories: any[] }) {
  return (
    <div className='bg-gray-50 p-6 rounded-lg'>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>
        Categorías destacadas
      </h3>
      <div className='grid grid-cols-2 gap-4'>
        {trendingCategories.map((category, index) => (
          <div
            key={index}
            className='relative overflow-hidden rounded-lg cursor-pointer'
          >
            <Image
              src={category.image}
              alt={category.name}
              width={200}
              height={150}
              className='object-cover w-full h-32'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent bg-opacity-50 flex items-center justify-center'>
              <div className='text-center text-white'>
                <h4 className='text-base sm:text-lg font-semibold'>
                  {category.name}
                </h4>
                <p className='text-sm'>{category.count} products</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
 }