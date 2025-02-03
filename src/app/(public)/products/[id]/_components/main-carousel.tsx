import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

export default function MainCarousel({
  images,
  setApi,
}: {
  images: string[]
  setApi: Dispatch<SetStateAction<any | undefined>>
}) {
  return (
    <Carousel setApi={setApi} className='w-full relative'>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className='relative aspect-square rounded-lg overflow-hidden'>
              <Image
                src={img || '/imageplaceholder.webp'}
                alt={`Tablet Android Vista ${index + 1}`}
                fill
                className='object-contain'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='pointer-events-auto absolute left-1' />
      <CarouselNext className='pointer-events-auto absolute right-1' />
    </Carousel>
  )
}
