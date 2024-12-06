import { ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface NotFoundProps {
  message?: string
}

export default function NotFound({
  // eslint-disable-next-line quotes
  message = "Oops! No pudimos encontrar lo que estaba buscando.",
}: NotFoundProps) {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg text-center'>
        <h1 className='text-9xl font-bold text-[#581c87]'>404</h1>
        <p className='mt-4 text-xl text-gray-600'>{message}</p>
        <div className='mt-6'>
          <Link href='/'>
            <Button
              asChild
              className='bg-[#581c87] hover:bg-[#4c1d6f] text-white'
            >
              <div>
                <ShoppingBasket className='mr-2 h-4 w-4' />
                Seguir comprando
              </div>
            </Button>
          </Link>
        </div>
        <p className='mt-8 text-sm text-gray-500'>
        Si crees que esto es un error, por favor contacta a nuestro equipo de soporte.
        </p>
      </div>
    </div>
  )
}
