import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function ColorVariants({ colors }: { colors: string[] | null }) {
  console.log(colors)
  if (!colors?.[0]) return null
  return (
    <div className='space-y-2'>
      <Label>Color</Label>
      <RadioGroup defaultValue='white' className='grid grid-cols-4 gap-2'>
        {colors.length > 0 &&
          colors.map((color) => (
            <div key={color}>
              <RadioGroupItem
                value='white'
                id='white'
                className='peer sr-only'
              />
              <Label
                htmlFor='white'
                className='flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary'
              >
                {color}
              </Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  )
}
