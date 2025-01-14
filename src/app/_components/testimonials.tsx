import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const testimonials = [
  {
    name: 'Esteban Reyes',
    role: 'CEO, TechInnovate',
    content:
      'Hypermayorista ha revolucionado nuestra gestión de la cadena de suministro. La eficiencia de la plataforma y su alcance global han incrementado significativamente nuestra productividad.',
    avatar: '/avatar1.jpg',
  },
  {
    name: 'Miguel Fernández',
    role: 'Gerente de Compras, GlobalRetail',
    content:
      'La calidad de los proveedores en Hypermayorista es incomparable. Hemos encontrado socios confiables que nos han ayudado a escalar nuestras operaciones de manera fluida.',
    avatar: '/avatar2.jpg',
  },
  {
    name: 'Emma Rodríguez',
    role: 'Fundadora, EcoGoods',
    content:
      'Como pequeña empresa, Hypermayorista ha sido fundamental en nuestro crecimiento. La interfaz fácil de usar de la plataforma y su equipo de soporte son excepcionales.',
    avatar: '/avatar3.jpg',
  },
  {
    name: 'David Pérez',
    role: 'Director de Operaciones, AfriTech',
    content:
      'La red global de Hypermayorista ha abierto nuevos mercados para nosotros. Los análisis basados en datos han sido cruciales en nuestra estrategia de expansión internacional.',
    avatar: '/avatar4.jpg',
  },
]


export default function Testimonials() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Lo que dicen nuestros clientes
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full max-w-5xl mx-auto'
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex flex-col items-center text-center p-6'>
                      <Avatar className='w-20 h-20 mb-4'>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <blockquote className='text-gray-600 mb-4'>
                        &quot;{testimonial.content}&quot;
                      </blockquote>
                      <cite className='not-italic font-semibold'>
                        {testimonial.name}
                      </cite>
                      <p className='text-sm text-gray-500'>
                        {testimonial.role}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
