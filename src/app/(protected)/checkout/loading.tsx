import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='container mx-auto p-6 mt-28 min-h-dvh'>
      <div className='max-w-3xl mx-auto space-y-8'>
        {/* Header */}
        <div className='space-y-2'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-4 w-full max-w-md' />
        </div>

        {/* Form or Content Area */}
        <div className='border rounded-lg p-6 space-y-6 bg-white shadow-sm'>
          {/* Form Fields */}
          <div className='space-y-4'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-12 w-full' />
          </div>

          <div className='space-y-4'>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-12 w-full' />
          </div>

          <div className='space-y-4'>
            <Skeleton className='h-6 w-36' />
            <div className='grid grid-cols-2 gap-4'>
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
          </div>

          {/* Contract Upload Area */}
          <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <Skeleton className='h-6 w-48 mt-4' />
            <Skeleton className='h-4 w-64 mt-2' />
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end space-x-4 mt-6'>
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-10 w-32' />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className='border rounded-lg p-6 bg-white shadow-sm'>
          <Skeleton className='h-6 w-40 mb-4' />
          <div className='space-y-3'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex justify-between items-center py-2'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-12 w-12 rounded' />
                  <Skeleton className='h-4 w-40' />
                </div>
                <Skeleton className='h-4 w-16' />
              </div>
            ))}
          </div>
          <div className='border-t mt-4 pt-4'>
            <div className='flex justify-between items-center'>
              <Skeleton className='h-5 w-24' />
              <Skeleton className='h-5 w-20' />
            </div>
            <div className='flex justify-between items-center mt-2'>
              <Skeleton className='h-6 w-32 font-bold' />
              <Skeleton className='h-6 w-24 font-bold' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
