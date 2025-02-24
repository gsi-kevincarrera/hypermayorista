import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingSkeleton() {
  return (
    <div className='flex flex-col min-h-screen '>
      {/* Hero Section */}
      <section className='relative min-h-[600px] flex items-center justify-center text-white hero-pattern'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
          <div className='absolute inset-0 bg-purple-900/70' />
        </div>
        <div className='relative z-10 text-center space-y-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
            Revoluciona tu comercio mayorista
          </h1>
          <p className='text-xl sm:text-2xl md:text-3xl'>
            Conéctate con los mejores proveedores y encuentra las mejores
            ofertas en un solo lugar
          </p>
          <div
            className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4'
            id='hero'
          >
            <Input
              type='text'
              placeholder='Buscar productos...'
              className='w-full sm:w-64 text-black'
            />
            <Select>
              <SelectTrigger className='w-full sm:w-40 bg-white text-black'>
                <SelectValue placeholder='Categoría' />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className='sm:w-auto bg-black/60 hover:bg-black/50'>
              Buscar
            </Button>
          </div>
        </div>
      </section>

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
