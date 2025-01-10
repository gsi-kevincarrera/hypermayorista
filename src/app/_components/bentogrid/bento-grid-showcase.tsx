
import TopRanked from './top-ranked'
import LatestAcquisitions from './latest-acquisitions'
import TrendingCategories from './trending-categories'
import SpecialOffers from './special-offers'
import AddToCartDrawer from '@/components/add-to-cart-drawer'
import CartDrawer from '@/components/cart-drawer'
import { getLatestAcquisitons, getProducts, getTopRankedProducts } from '@/db/queries'

// const products = [
//   {
//     id: 1,
//     name: 'Wireless Earbuds',
//     description: 'High-quality sound, long battery life',
//     price: 50,
//     moq: 100,
//     image: '/product1.jpg',
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     description: 'Fitness tracking, notifications',
//     price: 80,
//     moq: 50,
//     image: '/product2.jpg',
//   },
//   {
//     id: 3,
//     name: 'Portable Charger',
//     description: '10000mAh, fast charging',
//     price: 20,
//     moq: 200,
//     image: '/product3.jpg',
//   },
//   {
//     id: 4,
//     name: 'Bluetooth Speaker',
//     description: 'Waterproof, 360° sound',
//     price: 30,
//     moq: 100,
//     image: '/product4.jpg',
//   },
//   {
//     id: 5,
//     name: 'Laptop Backpack',
//     description: 'Anti-theft, USB charging port',
//     price: 25,
//     moq: 100,
//     image: '/product5.jpg',
//   },
//   {
//     id: 6,
//     name: 'Wireless Mouse',
//     description: 'Ergonomic design, silent clicks',
//     price: 15,
//     moq: 200,
//     image: '/product6.jpg',
//   },
//   {
//     id: 7,
//     name: 'LED Desk Lamp',
//     description: 'Adjustable brightness, touch control',
//     price: 20,
//     moq: 100,
//     image: '/product7.jpg',
//   },
//   {
//     id: 8,
//     name: 'Fitness Tracker',
//     description: 'Heart rate monitor, sleep tracking',
//     price: 40,
//     moq: 100,
//     image: '/product8.jpg',
//   },
//   {
//     id: 9,
//     name: 'Wireless Keyboard',
//     description: 'Slim design, multi-device',
//     price: 30,
//     moq: 100,
//     image: '/product9.jpg',
//   },
// ]

const trendingCategories = [
  { name: 'Smart Home', count: 1200, image: '/smart-home.jpg' },
  { name: 'Wearable Tech', count: 800, image: '/wearable-tech.jpg' },
  { name: 'Office Supplies', count: 1500, image: '/office-supplies.jpg' },
  { name: 'Eco-Friendly', count: 600, image: '/eco-friendly.jpg' },
]

export default async function BentoGridShowcase() {
  const [topRankedProducts, latestAcquisitions] =
    await Promise.all([
      getTopRankedProducts(),
      getLatestAcquisitons(),
    ])
  return (
    <section className='py-12 sm:py-16 bg-gray-100' id='products-section'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>
          Nuestros Productos
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <TopRanked products={topRankedProducts} />
            <LatestAcquisitions products={latestAcquisitions} />
          </div>
          <div className='space-y-8'>
            <TrendingCategories trendingCategories={trendingCategories} />
            <SpecialOffers />
          </div>
        </div>
      </div>
      <AddToCartDrawer />
      <CartDrawer />
    </section>
  )
}
