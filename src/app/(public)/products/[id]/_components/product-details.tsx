import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

import { ProductInDB } from '@/types'
import RelatedProducts from './related-products'
import SpecificationsTable from './specifications-table'
import ProductDescription from './product-description'
import PriceTiers from './price-tiers'
import ColorVariants from './color-variants'
import ImageContainer from './image-container'
import CallToActionButton from './call-to-action-button'

const priceTiers = [
  { units: '1 - 19', price: '$35.00' },
  { units: '20 - 199', price: '$34.00' },
  { units: '200 - 999', price: '$33.00' },
  { units: '>= 1000', price: '$32.00' },
]

export default function ProducDetails({
  product,
  relatedProducts,
}: {
  product: ProductInDB
  relatedProducts: ProductInDB[]
}) {
  return (
    <div className='container mx-auto p-6 mt-24 mb-16'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Left column: Images and related products */}
        <div className='w-full md:w-2/3 space-y-8'>
          <ImageContainer
            images={[product.imageUrl ?? '/imageplaceholder.webp']}
          />
          <RelatedProducts relatedProducts={relatedProducts} />
          <SpecificationsTable specifications={product.specifications} />
          <ProductDescription description={product.description ?? ''} />
        </div>

        {/* Right column: Product details */}
        <div className='w-full md:w-1/3 space-y-6 md:sticky md:top-6 self-start'>
          <div>
            <h1 className='text-2xl font-bold'>{product.name}</h1>
          </div>

          <div className='space-y-6'>
            <PriceTiers priceTiers={priceTiers} />
            <ColorVariants colors={[product.color ?? '']} />

            {/* Storage variants */}
            <div className='space-y-2'>
              <Label>Almacenamiento</Label>
              <RadioGroup defaultValue='1tb' className='grid grid-cols-2 gap-2'>
                <div>
                  <RadioGroupItem
                    value='1tb'
                    id='1tb'
                    className='peer sr-only'
                  />
                  <Label
                    htmlFor='1tb'
                    className='flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary'
                  >
                    1TB
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Camera specifications */}
            <div className='space-y-2'>
              <p className='text-sm font-medium'>Especificaciones de Cámara:</p>
              <ul className='text-sm text-muted-foreground space-y-1'>
                <li>• Cámara Trasera: 24.0MP</li>
                <li>• Cámara Frontal: 32MP</li>
              </ul>
            </div>

            {/* Call to action */}
            <CallToActionButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
