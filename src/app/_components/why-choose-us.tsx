import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, Truck, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck className='h-6 w-6' />,
    title: 'Verified Suppliers',
    description:
      'All our suppliers are thoroughly vetted to ensure quality and reliability.',
  },
  {
    icon: <Truck className='h-6 w-6' />,
    title: 'Global Shipping',
    description:
      'We offer competitive shipping rates to destinations worldwide.',
  },
  {
    icon: <Users className='h-6 w-6' />,
    title: 'Dedicated Support',
    description:
      'Our team is available 24/7 to assist you with any queries or concerns.',
  },
  {
    icon: <Zap className='h-6 w-6' />,
    title: 'Fast Transactions',
    description:
      'Streamlined processes ensure quick and efficient order fulfillment.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Why Choose Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div key={index}>
              <Card className='h-full transition-transform duration-300 hover:scale-105'>
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
