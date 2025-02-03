import { ArrowLeft } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent } from '../../../../components/ui/card'
import { Separator } from '../../../../components/ui/separator'

interface Props {
  subtotal: number
  deliveryFee: number
  total: number
  goForward: () => void
  goBack: () => void
  currentStep: number
  steps: string[]
}

export default function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  goForward,
  goBack,
  currentStep,
  steps,
}: Props) {
  return (
    <div className='lg:w-1/3'>
      <Card className='sticky top-4'>
        <CardContent className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Resumen de la orden</h2>
          <div className='space-y-2 mb-6'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>CUP {subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Gastos de envío</span>
              <span>CUP {deliveryFee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>CUP {total.toFixed(2)}</span>
            </div>
          </div>
          <div className='space-y-4'>
            {currentStep < steps.length - 1 && (
              <Button
                onClick={goForward}
                className='w-full bg-[#581c87] hover:bg-[#4c1d6f] text-white'
              >
                {currentStep === steps.length - 2
                  ? 'Confirmar Orden'
                  : 'Continuar'}
              </Button>
            )}
            {currentStep > 0 && (
              <Button onClick={goBack} variant='outline' className='w-full'>
                <ArrowLeft className='mr-2 h-4 w-4' /> Atrás
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
