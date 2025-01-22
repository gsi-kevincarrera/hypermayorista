import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { getProducts } from '@/db/queries'
import AppPagination from '@/components/navigation/app-pagination'
import ProductsGrid from './_components/products-grid'
import { ProductInDB } from '@/types'
import Filters from './_components/filters'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchP = await searchParams
  const { data, total, perPage } = await getProducts({ ...searchP, limit: 16 })
  const totalPages = Math.ceil(total / perPage)

  return (
    <div className='bg-white py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8 mt-8'>
          Productos para su inspiración
        </h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters for desktop */}
          <div className='hidden lg:block w-64 space-y-6'>
            <Filters filters={searchP} />
          </div>

          {/* Filters for mobile */}
          <div className='lg:hidden mb-4'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' className='w-full'>
                  <Filter className='mr-2 h-4 w-4' /> Filtros
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='w-[300px] sm:w-[400px] overflow-y-auto max-h-screen'
              >
                <SheetTitle>Filtros</SheetTitle>
                <div className='space-y-6 mt-6 pb-20'>
                  <Filters filters={searchP} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products grid */}
          <div className='flex-1'>
            <ProductsGrid data={data as ProductInDB[]} />

            {/* Pagination */}
            <div>
              {totalPages > 1 && (
                <div className='mt-8'>
                  <AppPagination
                    currentPage={Number(searchP.page ?? '1')}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
