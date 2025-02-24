import { MapPin, Shield } from 'lucide-react'
import OrderSummary from './oder-summary'
import AddressForm from './adress-form'

export default function Shipping() {
  return (
    <div className='container mx-auto p-6 mt-28 min-h-screen'>
      <div className='grid lg:grid-cols-3 gap-8 relative'>
        <div className='lg:col-span-2'>
          <div className='flex items-center gap-2 mb-4'>
            <MapPin className='text-purple-800' />
            <h2 className='text-xl font-semibold'>Dirección de entrega</h2>
          </div>

          <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2'>
            <Shield className='text-green-600 h-5 w-5' />
            <p className='text-green-700 text-sm'>
              Tu información personal será solo utilizada para el proceso de
              entrega.
            </p>
          </div>
          <AddressForm />
        </div>
        <OrderSummary />
      </div>
    </div>
  )
}
