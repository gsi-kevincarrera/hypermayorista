import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold mb-6'>
              Acerca de Hipermayorista
            </h2>
            <p className='text-gray-600 mb-6'>
              En <strong>Hipermayorista</strong>, nos dedicamos a ofrecer
              soluciones innovadoras y eficientes para el comercio mayorista,
              conectando a empresas de todo el mundo en un solo lugar. Nuestra
              plataforma optimiza la gestión de compras y ventas, brindando a
              nuestros usuarios una experiencia fluida y segura.
            </p>
            <p className='text-gray-600 mb-6'>
              Gracias a nuestra afiliación con <strong>Avangenio</strong>, una
              de las empresas más prestigiosas del país, contamos con el
              respaldo de una entidad de renombre que avala la calidad y
              fiabilidad de nuestros servicios. Esta alianza nos permite ofrecer
              a nuestros clientes un nivel de excelencia y confianza sin igual,
              facilitando el acceso a proveedores de alta calidad y una red de
              contactos global. Nuestro compromiso es impulsar el crecimiento de
              tu negocio, ayudándote a expandir tus operaciones y mejorar la
              eficiencia de tus procesos comerciales, todo con el soporte de un
              equipo dedicado y siempre a la vanguardia de la tecnología.
            </p>
            <Button size='lg'>Aprende más sobre nosotros</Button>
          </div>
          <div className='relative h-[400px] rounded-lg overflow-hidden shadow-xl'>
            <Image
              src='/about-image.webp'
              alt='Hipermayorista Team'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
