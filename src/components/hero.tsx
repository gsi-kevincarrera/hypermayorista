import { Button } from './ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className='bg-primary'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center gap-8 px-4 py-12'>
        <div className='flex-1 space-y-4'>
          <h1 className='text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl'>
            La Ruta al Éxito Mayorista
          </h1>
          <p className='text-lg text-primary-foreground/90'>
            Productos al por mayor, negocios al por mayor. Descubre la
            plataforma que impulsa tu comercio al siguiente nivel
          </p>
          <Button className='bg-white text-primary hover:bg-gray-100'>
            Ver catálogo de productos
          </Button>
        </div>
        <div className='flex-1'>
          <Image
            alt='Shopping couple'
            className='aspect-[4/3] overflow-hidden rounded-xl object-cover'
            height='400'
            src='/hero.webp'
            width='600'
          />
        </div>
      </div>
    </section>
  )
}
