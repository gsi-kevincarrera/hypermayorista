import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ProductVariant } from '@/types'

interface ProductVariantsProps {
  variants: ProductVariant[]
}

export default function ProductVariants({ variants }: ProductVariantsProps) {
  if (variants.length === 0) return null
  return (
    <div className='space-y-2'>
      <Label>va</Label>
      <RadioGroup defaultValue='1tb' className='grid grid-cols-2 gap-2'>
        <div>
          <RadioGroupItem value='1tb' id='1tb' className='peer sr-only' />
          <Label
            htmlFor='1tb'
            className='flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary'
          >
            1TB
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
