import { ShoppingCart } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

export default function Loading() {
  return (
    <div className='container mx-auto p-4 max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen mt-36'>
      <div className='grid lg:grid-cols-[250px_1fr] gap-8'>
        {/* Sidebar - Hidden on Mobile */}
        <div className='hidden lg:block space-y-8'>
          {/* Search */}
          <div className='space-y-2'>
            <Skeleton className='h-6 w-24' />
            <Skeleton className='h-10 w-full' />
          </div>

          {/* Category Filter */}
          <div className='space-y-4'>
            <Skeleton className='h-6 w-24' />
            <div className='space-y-3'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-24' />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='space-y-8'>
          {/* Grid of Products */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='space-y-3'>
                <div className='relative'>
                  <Skeleton className='aspect-[4/3] w-full rounded-lg' />
                  <Button
                    size='icon'
                    variant='ghost'
                    className='absolute top-2 right-2'
                  >
                    <ShoppingCart className='h-5 w-5 text-muted-foreground' />
                  </Button>
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-3/4' />
                  <Skeleton className='h-5 w-1/3' />
                  <div className='flex gap-2 text-sm text-muted-foreground'>
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-4 w-20' />
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
