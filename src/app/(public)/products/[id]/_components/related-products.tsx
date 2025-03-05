import ProductCard from '@/components/common/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { BaseProduct } from '@/types'

export default function RelatedProducts({
  relatedProducts,
}: {
  relatedProducts: BaseProduct[]
}) {
  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>Productos Relacionados</h3>
      <Carousel className='w-full relative'>
        <CarouselContent>
          {relatedProducts.map((product) => (
            <CarouselItem key={product.id} className='md:basis-1/3'>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='pointer-events-auto absolute left-1' />
        <CarouselNext className='pointer-events-auto absolute right-1' />
      </Carousel>
    </div>
  )
}
