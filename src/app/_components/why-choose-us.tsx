import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, Truck, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck className='h-6 w-6' />,
    title: 'Proveedores Verificados',
    description:
      'Todos nuestros proveedores son examinados a fondo para garantizar la calidad y la fiabilidad.',
  },
  {
    icon: <Truck className='h-6 w-6' />,
    title: 'Entregas expandidas',
    description:
      'Ofrecemos tarifas de envío competitivas a destinos de todo el país.',
  },
  {
    icon: <Users className='h-6 w-6' />,
    title: 'Soporte Dedicado',
    description:
      'Tenemos un equipo de soporte dedicado para atender cualquiera de tus preocupaciones o dudas.',
  },
  {
    icon: <Zap className='h-6 w-6' />,
    title: 'Transacciones Rápidas',
    description:
      'Los procesos optimizados garantizan un cumplimiento de pedidos rápido y eficiente.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className='py-16 bg-white' id='why-us'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          ¿Por qué Elegirnos?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div key={index}>
              <Card className='h-full transition-transform duration-300 hover:scale-105 bg-gray-50'>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    {feature.icon}
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
