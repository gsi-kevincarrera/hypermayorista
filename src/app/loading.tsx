import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingSkeleton() {
  return (
    <div className='flex flex-col min-h-screen '>
      {/* Hero Section */}
      <div className='relative h-[620px] w-full bg-purple-900/70'>
        <div className='w-full max-w-3xl mx-auto mt-28 space-y-4'>
          {/* Main image skeleton */}
          <div className='relative w-full aspect-[21/9] mt-8'>
            <Skeleton className='absolute inset-0 rounded-lg' />
          </div>

          {/* Search section skeleton */}
          <div className='flex gap-2 justify-center items-center mt-8'>
            <Skeleton className='h-10 w-[300px]' />
            <Skeleton className='h-10 w-[150px]' />
            <Skeleton className='h-10 w-[100px]' />
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8 space-y-12 max-w-7xl sm:px-6 lg:px-8'>
        {/* Popular Categories */}
        <div className='space-y-4'>
          <Skeleton className='h-6 w-40' />
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='relative group cursor-pointer'>
                <Skeleton className='aspect-[4/3] w-full rounded-lg' />
                <Skeleton className='h-4 w-16 mt-2' />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className='space-y-4'>
          <Skeleton className='h-6 w-48' />
          <div className='relative'>
            <Skeleton className='aspect-[16/9] w-full rounded-lg' />
            <div className='p-4 space-y-2'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-5 w-24' />
              <div className='flex gap-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
          </div>
        </div>

        {/* Latest Acquisitions */}
        <div className='space-y-4'>
          <Skeleton className='h-6 w-48' />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='space-y-3'>
                <Skeleton className='aspect-[16/9] w-full rounded-lg' />
                <div className='space-y-2 p-2'>
                  <Skeleton className='h-5 w-3/4' />
                  <Skeleton className='h-4 w-1/3' />
                  <div className='flex gap-2'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-3 w-20' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
