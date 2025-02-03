import ProductCard from '@/components/common/product-card'
import { Button } from '@/components/ui/button'
import { ProductInDB } from '@/types'
import { Search } from 'lucide-react'
import Link from 'next/link'

export default function ProductsGrid({ data }: { data: ProductInDB[] }) {
  return (
    <div className='flex-1'>
      {data.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <NoSearchResults />
      )}
    </div>
  )
}

export function NoSearchResults() {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 text-center bg-primary/5 rounded-lg'>
      <Search className='w-16 h-16 mb-6 text-blackimary/60' />
      <h2 className='text-2xl font-bold mb-2 text-black'>
        No se encontraron productos
      </h2>
      <p className='text-lg mb-6 text-black/80'>
        No pudimos encontrar ningún producto que coincida con tu búsqueda.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button asChild className='bg-primary hover:contrast-125'>
          <Link href='/products'>
            <Search className='mr-2 h-4 w-4' />
            Ver todos los productos
          </Link>
        </Button>
      </div>
      <p className='mt-8 text-sm text-black/70'>
        Intenta buscar cambiar los parámetros de búsqueda o revisa nuevamente
        más tarde.
      </p>
    </div>
  )
}
