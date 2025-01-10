import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Users, Globe, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: <BarChart className='h-8 w-8 text-purple-600' />,
    title: 'Data-Driven Insights',
    description:
      'Leverage advanced analytics to make informed business decisions.',
  },
  {
    icon: <Users className='h-8 w-8 text-purple-600' />,
    title: 'Global Network',
    description:
      'Connect with verified suppliers and buyers from around the world.',
  },
  {
    icon: <Globe className='h-8 w-8 text-purple-600' />,
    title: 'Seamless Integration',
    description:
      'Easily integrate our platform with your existing systems and workflows.',
  },
  {
    icon: <TrendingUp className='h-8 w-8 text-purple-600' />,
    title: 'Growth Opportunities',
    description:
      'Discover new markets and expand your business reach effortlessly.',
  },
]

export default function BusinessOverview() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Empowering Your Business
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
