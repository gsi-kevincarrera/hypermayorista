import { useState } from 'react'
import Image from 'next/image'
import { CarouselApi } from '@/components/ui/carousel'

export default function Thumbnails({
  images,
  api,
}: {
  images: string[]
  api: CarouselApi
}) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  const handleImageHover = (index: number) => {
    setHoveredImage(index)
    api?.scrollTo(index)
  }

  return (
    <div className='flex flex-col gap-2'>
      {images.map((img, index) => (
        <button
          key={index}
          onMouseEnter={() => handleImageHover(index)}
          onMouseLeave={() => setHoveredImage(null)}
          className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
            hoveredImage === index || api?.selectedScrollSnap() === index
              ? 'border-primary'
              : 'border-transparent hover:border-purple-400'
          }`}
        >
          <Image
            src={img || '/imageplaceholder.webp'}
            alt={`Vista ${index + 1}`}
            fill
            className='object-cover'
          />
        </button>
      ))}
    </div>
  )
}
