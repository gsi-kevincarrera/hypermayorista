import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

type DeliveryOption = {
  id: string
  name: string
  price: number
  duration: string
}

interface Props {
  options: DeliveryOption[]
  selectedDelivery: string
  onSelect: (value: string) => void
}

export default function DeliveryOptions({
  options,
  selectedDelivery,
  onSelect,
}: Props) {
  return (
    <RadioGroup value={selectedDelivery} onValueChange={onSelect}>
      {options.map((option) => (
        <div key={option.id} className='flex items-center space-x-2 mb-4'>
          <RadioGroupItem value={option.id} id={option.id} />
          <Label htmlFor={option.id} className='flex-grow'>
            <span className='font-semibold'>{option.name}</span>
            <span className='block text-sm text-gray-500'>
              {option.duration}
            </span>
          </Label>
          <span>CUP {option.price.toFixed(2)}</span>
        </div>
      ))}
    </RadioGroup>
  )
}
