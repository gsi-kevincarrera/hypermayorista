import ProductGrid from '@/app/_components/product-grid'
import { getProducts } from '@/db/queries'
import Hero from '@/app/_components/hero'
import ProductGridContainer from './_components/product-grid-container'
import AppPagination from '@/components/navigation/app-pagination'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchP = await searchParams
  const { data, total, perPage } = await getProducts(searchP)
  const totalPages = Math.ceil(total / perPage)

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Hero />
      <ProductGridContainer>
        <ProductGrid products={data} />
        {totalPages > 1 && (
          <div className='mt-8'>
            <AppPagination
              currentPage={Number(searchP.page ?? '1')}
              totalPages={totalPages}
            />
          </div>
        )}
      </ProductGridContainer>
    </div>
  )
}
