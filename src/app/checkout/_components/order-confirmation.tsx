import { CheckCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'

export default function OrderConfirmation() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-center'>
        <CheckCircle className='text-green-500 w-16 h-16' />
      </div>
      <h2 className='text-2xl font-semibold text-center'>Orden Confirmada</h2>
      <p className='text-center'>
        Gracias por su compra. Su orden ha sido recibida y está siendo
        procesada.
      </p>
      <Button className='w-full' onClick={() => (window.location.href = '/')}>
        Continuar comprando
      </Button>
    </div>
  )
}
