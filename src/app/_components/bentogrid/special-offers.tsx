import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SpecialOffers() {
  return (
    <div className='bg-gray-50 p-6 rounded-lg '>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>Ofertas Especiales</h3>
      <Card className='bg-gradient-to-r from-purple-600 to-purple-800 text-white'>
        <CardContent className='p-6'>
          <h4 className='text-lg sm:text-xl font-bold mb-2'>Compra por Transfermovil!</h4>
          <p className='mb-4'>
            Obtén un descuento del 6% por usar los servicios de Transfermovil.
          </p>
          <Button variant='secondary'>Comprar ahora</Button>
        </CardContent>
      </Card>
    </div>
  )
}
