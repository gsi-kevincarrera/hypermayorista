import { Skeleton } from '@/components/ui/skeleton'
import { Share2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='min-h-screen bg-background p-4'>
      <div className='max-w-7xl mx-auto p-6 mt-24 mb-16'>
        {/* Product Layout */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Left Column - Product Images */}
          <div className='w-full md:w-2/3 space-y-8'>
            {/* Thumbnail */}
            <div className='w-16 h-16'>
              <Skeleton className='w-full h-full rounded-lg' />
            </div>

            {/* Main Image */}
            <div className='relative aspect-square'>
              <Skeleton className='w-full h-full rounded-lg' />
              {/* Navigation Arrows */}
              <div className='absolute inset-0 flex justify-between items-center px-4'>
                <Skeleton className='w-10 h-10 rounded-full' />
                <Skeleton className='w-10 h-10 rounded-full' />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className='w-full md:w-1/3 space-y-6 md:sticky md:top-6 self-start'>
            <div className='flex justify-between items-start'>
              <Skeleton className='h-10 w-32' /> {/* Title */}
              <Share2 className='text-gray-400' size={24} />
            </div>

            {/* Price Range Section */}
            <div className='space-y-4'>
              <Skeleton className='h-6 w-48' />{' '}
              {/* "Seleccionar rango de precio" */}
              {/* Price Grid */}
              <div className='grid grid-cols-2 gap-4'>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className='h-24 rounded-lg' />
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className='space-y-2'>
              <Skeleton className='h-6 w-24' /> {/* "Color" */}
              <Skeleton className='h-12 w-32 rounded-lg' />
            </div>

            {/* Storage Selection */}
            <div className='space-y-2'>
              <Skeleton className='h-6 w-40' /> {/* "Almacenamiento" */}
              <Skeleton className='h-12 w-32 rounded-lg' />
            </div>

            {/* Specifications */}
            <div className='space-y-2'>
              <Skeleton className='h-6 w-56' /> {/* "Especificaciones" */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-4 w-40' />
              </div>
            </div>

            {/* Action Button */}
            <Skeleton className='h-12 w-full rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}
