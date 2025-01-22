'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function PriceTiers({
  priceTiers,
}: {
  priceTiers: { units: string; price: string }[]
}) {
  const [selectedTier, setSelectedTier] = useState('1 - 19')

  return (
    <div className='space-y-2'>
      <Label>Seleccionar rango de precio</Label>
      <div className='grid grid-cols-2 gap-2'>
        {priceTiers.map((tier) => (
          <Button
            key={tier.units}
            variant={selectedTier === tier.units ? 'default' : 'outline'}
            className={`h-auto flex flex-col items-start p-4 ${
              selectedTier === tier.units ? 'bg-primary text-white' : ''
            }`}
            onClick={() => setSelectedTier(tier.units)}
          >
            <span className='text-sm'>{tier.units} unidades</span>
            <span className='text-lg font-bold'>{tier.price}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
