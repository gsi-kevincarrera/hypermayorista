import TopRanked from './top-ranked'
import LatestAcquisitions from './latest-acquisitions'
import TrendingCategories from './trending-categories'
import SpecialOffers from './special-offers'
import AddToCartDrawer from '@/components/add-to-cart-drawer'
import CartDrawer from '@/components/cart-drawer'
import {
  getFeaturedCategories,
  getLatestAcquisitons,
  getTopRankedProducts,
} from '@/db/queries'
import ForYou from './for-you'
import { getNonSpecialProducts } from '@/db/actions'

export default async function BentoGridShowcase() {
  const [
    topRankedProducts,
    latestAcquisitions,
    trendingCategories,
    forYouProducts,
  ] = await Promise.allSettled([
    getTopRankedProducts(),
    getLatestAcquisitons(),
    getFeaturedCategories(),
    getNonSpecialProducts(0),
  ])
  return (
    <section className='py-12 sm:py-16 bg-white' id='products-section'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>
          Nuestros Productos
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <TopRanked
              products={
                topRankedProducts.status === 'fulfilled'
                  ? topRankedProducts.value
                  : []
              }
            />
          </div>
          <div className='flex flex-col justify-between gap-6'>
            <TrendingCategories
              trendingCategories={
                trendingCategories.status === 'fulfilled'
                  ? trendingCategories.value
                  : []
              }
            />
            <SpecialOffers />
          </div>
        </div>
        <LatestAcquisitions
          products={
            latestAcquisitions.status === 'fulfilled'
              ? latestAcquisitions.value
              : []
          }
        />
        <ForYou
          products={
            forYouProducts.status === 'fulfilled' ? forYouProducts.value.data : []
          }
          total={forYouProducts.status === 'fulfilled' ? forYouProducts.value.total : 0}
        />
      </div>
      <AddToCartDrawer />
      <CartDrawer />
    </section>
  )
}
