import WhyChooseUs from './_components/why-choose-us'
import CategoriesOverview from './_components/categories-overview'
import BentoGridShowcase from './_components/bentogrid/bento-grid-showcase'
import BusinessOverview from './_components/business-overview'
import Testimonials from './_components/testimonials'
import About from './_components/about'
import Hero from './_components/hero'
import { getMainCategories } from '@/db/queries'

export default async function Home() {
  const mainCategories = await getMainCategories()
  return (
    <main className='min-h-screen'>
      <Hero />
      {/* <WhyChooseUs /> */}
      <CategoriesOverview categories={mainCategories} />
      <BentoGridShowcase />
      <BusinessOverview />
      <Testimonials />
      <About />
    </main>
  )
}
