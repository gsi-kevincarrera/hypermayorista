import Link from 'next/link'
import {
  UserCircleIcon,
  MapPinIcon,
  Clipboard,
  ArrowRight,
  HomeIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AppBreadcrumb from '@/components/navigation/app-breadcrumb'

export default function ModernMyAccount() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Breadcrumb */}
      <div className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-3'>
          <AppBreadcrumb
            items={[
              { name: 'Mi cuenta', href: '/account', icon: <UserCircleIcon /> },
            ]}
          />
        </div>
      </div>

      {/* Account Sections */}
      <div className='container mx-auto px-4 py-12'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>Mi cuenta</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='bg-[#581c87] bg-opacity-10 rounded-full p-3 mr-4'>
                  <UserCircleIcon className='h-8 w-8 text-[#581c87]' />
                </div>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Información personal
                </h2>
              </div>
              <p className='text-gray-600 mb-6'>
                Actualice su información personal y gestione sus preferencias de
                cuenta.
              </p>
              <Button
                variant='outline'
                className='w-full justify-between text-[#581c87] border-[#581c87] hover:bg-[#581c87] hover:text-white transition-colors'
              >
                <span>Ver detalles</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Button>
            </CardContent>
          </Card>

          <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='bg-[#581c87] bg-opacity-10 rounded-full p-3 mr-4'>
                  <MapPinIcon className='h-8 w-8 text-[#581c87]' />
                </div>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Direcciones de entrega
                </h2>
              </div>
              <p className='text-gray-600 mb-6'>
                Administre sus direcciones de entrega y configure sus
                preferencias de envío.
              </p>
              <Button
                variant='outline'
                className='w-full justify-between text-[#581c87] border-[#581c87] hover:bg-[#581c87] hover:text-white transition-colors'
              >
                <span>Gestionar direcciones</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Button>
            </CardContent>
          </Card>

          <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='bg-[#581c87] bg-opacity-10 rounded-full p-3 mr-4'>
                  <Clipboard className='h-8 w-8 text-[#581c87]' />
                </div>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Historial de pedidos
                </h2>
              </div>
              <p className='text-gray-600 mb-6'>
                Revise su historial de compras y obtenga detalles de sus pedidos
                anteriores.
              </p>
              <Button
                variant='outline'
                className='w-full justify-between text-[#581c87] border-[#581c87] hover:bg-[#581c87] hover:text-white transition-colors'
              >
                <span>Ver pedidos</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className='mt-12 text-center'>
          <Button className='bg-[#581c87] hover:bg-[#4c1d6f] text-white transition-colors px-8 py-3 text-lg'>
            <ArrowRight className='mr-2 h-6 w-6' />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  )
}
