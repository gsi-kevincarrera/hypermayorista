import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  min: number
  max?: number
  setQuantity: (quantity: number) => void
  disabled: boolean
  value: number
}

export default function InputQuantity({
  min,
  max,
  setQuantity,
  disabled,
  value,
}: Props) {
  return (
    <div>
      <Label htmlFor='quantity' className='block mb-2'>
        Cantidad:{' '}
        <span className='font-light text-xs'>
          (Mínimo {min} unidad(es))
          {max && ` (Máximo ${max} unidad(es))`}
        </span>
      </Label>
      <div className='flex rounded-md shadow-sm'>
        <Button
          type='button'
          onClick={() => setQuantity(Math.max(min, value - 1))}
          className='rounded-l-lg rounded-r-none'
          disabled={disabled}
        >
          <Minus className='h-4 w-4' />
        </Button>
        <Input
          type='number'
          name='quantity'
          id='quantity'
          className='flex-1 rounded-none text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          value={value}
          onChange={(e) => {
            const val = e.target.value
            if (val === '') {
              setQuantity(min)
            } else {
              const num = parseInt(val, 10)
              if (!isNaN(num)) {
                setQuantity(Math.min(Math.max(min, num), max ?? Infinity))
              }
            }
          }}
          min={min}
          max={max ?? undefined}
          disabled={disabled}
        />

        <Button
          type='button'
          onClick={() => setQuantity(Math.min(value + 1, max ?? Infinity))}
          className='rounded-r-lg rounded-l-none'
          disabled={disabled}
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
