import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, Globe, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: <Users className='h-8 w-8 text-purple-600' />,
    title: 'Red Extensa',
    description:
      'Conecta con proveedores y clientes verificados, a lo largo de todo el mundo.',
  },
  {
    icon: <Globe className='h-8 w-8 text-purple-600' />,
    title: 'Gestión de Pedidos Sin Complicaciones',
    description:
      'Gestiona tus pedidos de forma eficiente con nuestro sistema de seguimiento.',
  },
  {
    icon: <TrendingUp className='h-8 w-8 text-purple-600' />,
    title: 'Oportunidades d crecimiento',
    description: 'Descubre nuevos mercados y expande tu negocio.',
  },
  {
    icon: <DollarSign className='h-8 w-8 text-purple-600' />,
    title: 'Soluciones de Pago Flexibles',
    description:
      ' Ofrecemos múltiples opciones de pago para facilitar las transacciones a tus clientes.',
  },
]

export default function BusinessOverview() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Empoderando tu negocio
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
            >
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
