
import WhyChooseUs from './_components/why-choose-us'
import CategoriesOverview from './_components/categories-overview'
import BentoGridShowcase from './_components/bentogrid/bento-grid-showcase'
import BusinessOverview from './_components/business-overview'
import Testimonials from './_components/testimonials'
import About from './_components/about'
import Hero from './_components/hero'

export default async function Home({
}: {
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {


  return (
    <main className='min-h-screen'>
      <Hero />
      <WhyChooseUs />
      <CategoriesOverview />
      <BentoGridShowcase />
      <BusinessOverview />
      <Testimonials />
      <About />
    </main>
  )
}
