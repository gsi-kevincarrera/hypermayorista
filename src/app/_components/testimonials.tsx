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
    name: 'Sarah Johnson',
    role: 'CEO, TechInnovate',
    content:
      'B2B Trade has revolutionized our supply chain management. The platforms efficiency and global reach have significantly boosted our productivity.',
    avatar: '/avatar1.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Procurement Manager, GlobalRetail',
    content:
      'The quality of suppliers on B2B Trade is unmatched. We have found reliable partners that have helped us scale our operations seamlessly.',
    avatar: '/avatar2.jpg',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Founder, EcoGoods',
    content:
      'As a small business, B2B Trade has been instrumental in our growth. The platforms user-friendly interface and support team are exceptional.',
    avatar: '/avatar3.jpg',
  },
  {
    name: 'David Okonkwo',
    role: 'Operations Director, AfriTech',
    content:
      'Hypermayorista global network has opened up new markets for us. The data-driven insights have been crucial in our international expansion strategy.',
    avatar: '/avatar4.jpg',
  },
]

export default function Testimonials() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          What Our Clients Say
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
