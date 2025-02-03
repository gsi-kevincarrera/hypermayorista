'use client'

import CopyUrlDialog from '@/components/copy-url-dialog'
import MainCarousel from './main-carousel'
import Thumbnails from './thumbnails'
import { useEffect, useState } from 'react'
import { CarouselApi } from '@/components/ui/carousel'

export default function ImageContainer({ images }: { images: string[] }) {
  const [api, setApi] = useState<CarouselApi>()
  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])
  return (
    <div className='flex gap-4'>
      <Thumbnails images={images} api={api} />
      <div className='flex-1 relative'>
        <MainCarousel images={images} setApi={setApi} />
        <CopyUrlDialog />
      </div>
    </div>
  )
}
