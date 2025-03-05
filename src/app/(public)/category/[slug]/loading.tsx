import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <div className='relative h-[400px] w-full'>
        <Skeleton className='w-full h-full' />
        <div className='absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/20'>
          <Skeleton className='h-12 w-48' /> {/* Title */}
          <Skeleton className='h-6 w-96' /> {/* Subtitle */}
        </div>
      </div>

      {/* Content Section */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Related Categories Section */}
        <div className='bg-white rounded-lg p-6 shadow-sm'>
          {/* "Categorias relacionadas" */}
          {/* Categories Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {[...Array(15)].map((_, i) => (
              <div key={i} className='flex flex-col items-center space-y-3'>
                <Skeleton className='w-full aspect-square rounded-lg' />
                <Skeleton className='h-4 w-24' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
