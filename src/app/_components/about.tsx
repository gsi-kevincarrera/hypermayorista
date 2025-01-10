import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold mb-6'>About B2B Trade</h2>
            <p className='text-gray-600 mb-6'>
              B2B Trade is a cutting-edge wholesale platform designed to
              revolutionize the way businesses connect and trade globally. Our
              mission is to empower companies of all sizes by providing them
              with the tools and network they need to thrive in the digital age.
            </p>
            <p className='text-gray-600 mb-6'>
              Founded in 2020, we&quot;ve quickly grown to become a trusted partner
              for thousands of businesses worldwide. Our platform combines
              advanced technology with a user-centric approach, ensuring a
              seamless and efficient trading experience for all our users.
            </p>
            <Button size='lg'>Learn More About Us</Button>
          </div>
          <div className='relative h-[400px] rounded-lg overflow-hidden shadow-xl'>
            <Image
              src='/about-image.jpg'
              alt='B2B Trade Team'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
