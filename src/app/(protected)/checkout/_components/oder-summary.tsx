import { Card, CardContent } from '@/components/ui/card'
import { Info } from 'lucide-react'

export default function OrderSummary() {
  return (
    <div>
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>
            Resumen de la orden (3 productos)
          </h2>

          <div className='space-y-3 mb-6'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Subtotal</span>
              <span>$ 105.00</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Precio de la entrega</span>
              <span>$ 37.81</span>
            </div>
            <div className='flex justify-between text-red-500'>
              <span>Descuento de entrega</span>
              <span>- $ 20.00</span>
            </div>
            <div className='flex justify-between font-semibold pt-3 border-t'>
              <span>Total</span>
              <span>$ 122.81</span>
            </div>
          </div>

          <div className='text-sm text-center mb-6'>
            Ahorraste <span className='text-red-500'>$ 20.00</span> en esta
            orden!
          </div>

          <div className='bg-red-50 p-4 rounded-lg mb-6 flex items-start gap-2'>
            <Info className='text-red-500 h-5 w-5 mt-0.5' />
            <div>
              <p className='font-medium'>
                Paga ahora para $20 de descuento en la entrega!
              </p>
            </div>
          </div>

          {/* <div className='space-y-4'>
                <h3 className='font-semibold'>
                  Protecciones garantizadas
                </h3>

                <div className='flex gap-2'>
                  <Clock className='h-5 w-5 text-green-600' />
                  <div>
                    <p className='font-medium'>On-time Dispatch Guarantee</p>
                    <p className='text-sm text-gray-600'>
                      Dispatched within 3 days of payment or receive a 10% delay
                      compensation
                    </p>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Shield className='h-5 w-5 text-green-600' />
                  <div>
                    <p className='font-medium'>Secure payments</p>
                    <p className='text-sm text-gray-600'>
                      Every payment you make is secured with strict SSL
                      encryption and PCI DSS data protection protocols
                    </p>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <CheckCircle className='h-5 w-5 text-green-600' />
                  <div>
                    <p className='font-medium'>Standard refund policy</p>
                    <p className='text-sm text-gray-600'>
                      Claim a refund if your order doesn&apo;t ship, is missing,
                      or arrives with product issues
                    </p>
                  </div>
                </div>
              </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
