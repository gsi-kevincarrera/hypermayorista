'use client'
import AppTooltip from '@/components/common/app-tooltip'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PriceBreak } from '@/types'
import { SetStateAction } from '@/types/ts-types'
import { HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PriceTiers({
  priceTiers,
  quantity,
}: {
  priceTiers: PriceBreak[] | null
  quantity: number
}) {
  const [selectedTier, setSelectedTier] = useState(priceTiers?.[0]?.id ?? -1)

  useEffect(() => {
    //Select the tier that has the quantity within its range
    const tier = priceTiers?.find(
      (tier) =>
        quantity >= tier.minQuantity &&
        (!tier.maxQuantity || quantity <= tier.maxQuantity)
    )
    if (tier) {
      setSelectedTier(tier.id)
      return
    }

    setSelectedTier(-1)
  }, [quantity, priceTiers])
  if (!priceTiers || priceTiers.length === 0) return null

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <Label>Precio base por unidad</Label>

        <AppTooltip trigger={<HelpCircle size={16} />}>
          <p>
            Se pueden apllicar cargos adicionales, dependiendo de las variantes
            seleccionadas
          </p>
        </AppTooltip>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        {priceTiers.map((tier) => (
          <Button
            key={tier.id}
            variant={selectedTier === tier.id ? 'default' : 'outline'}
            className={`h-auto flex flex-col items-start p-4 cursor-default ${
              selectedTier === tier.id ? 'bg-primary text-white' : ''
            }`}
          >
            {tier.maxQuantity ? (
              <span className='text-sm'>
                {tier.minQuantity} - {tier.maxQuantity} unidades
              </span>
            ) : (
              <span className='text-sm'>
                {' '}
                {'>='}
                {tier.minQuantity} unidades
              </span>
            )}
            <span className='text-lg font-bold'>${tier.unitPrice}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
