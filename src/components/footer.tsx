import { Phone, Mail, X } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Contact */}
          <div className='space-y-4'>
            <Link href='/' className='flex items-center gap-2'>
              <span className='text-primary'>Hyper.</span>
              <span className='font-bold text-2xl'>Mayorista</span>
            </Link>
            <div className='space-y-2'>
              <p className='flex items-center gap-2'>
                <Phone className='h-4 w-4' />
                Llámanos: +53 55555555
              </p>
              <p className='flex items-center gap-2'>
                <Mail className='h-4 w-4' />
                Correo: soporte@hypermayorista.com
              </p>
              <p>Canal de Soporte de Whatsapp</p>
            </div>
          </div>

          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary'>
              Nuestra empresa
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Recogida en la tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* User Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary'>Usuarios</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Información personal
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Pedidos
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary'>
                  Contactos de entrega
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='border-t border-gray-700'>
        <div className='container mx-auto px-4 py-4'>
          <p className='text-center text-sm text-gray-400'>
            2024 Avangenio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
