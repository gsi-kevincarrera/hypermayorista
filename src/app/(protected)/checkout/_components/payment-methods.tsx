import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type PaymentMethod = {
  id: string
  name: string
}

type PaymentMethodsProps = {
  methods: PaymentMethod[]
  selected: string
  onChange: (value: string) => void
}

export default function PaymentMethods({
  methods,
  selected,
  onChange,
}: PaymentMethodsProps) {
  return (
    <div>
      <RadioGroup value={selected} onValueChange={onChange}>
        {methods.map((method) => (
          <div key={method.id} className='flex items-center space-x-2 mb-4'>
            <RadioGroupItem value={method.id} id={method.id} />
            <Label htmlFor={method.id}>{method.name}</Label>
          </div>
        ))}
      </RadioGroup>
      {selected === 'credit-card' && (
        <div className='mt-4 space-y-4'>
          <Input placeholder='Card Number' />
          <div className='flex space-x-4'>
            <Input placeholder='MM/YY' className='w-1/2' />
            <Input placeholder='CVC' className='w-1/2' />
          </div>
          <Input placeholder='Cardholder Name' />
        </div>
      )}
    </div>
  )
}
