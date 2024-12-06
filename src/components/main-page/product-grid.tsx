import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { getAllProducts } from '@/db/queries'
import Link from 'next/link'

export default async function ProductGrid() {
  const products = await getAllProducts()

  return (
    <main>
      <div className='bg-primary-foreground flex-grow'>
        <div className='container mx-auto px-4 py-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
            <ShoppingCart className='h-6 w-6' />
            Todos los productos
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {products.length ? (
              products.map((product) => (
                <Card key={product.id} className='flex flex-col h-full'>
                  <CardHeader className='p-0'>
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        className='w-full h-40 object-cover cursor-pointer'
                        width={400}
                        height={400}
                      />
                    </Link>
                  </CardHeader>
                  <CardContent className='px-4 pt-4 flex-grow'>
                    <h4
                      className='font-semibold text-gray-800 mb-1 cursor-pointer'
                    >
                      {product.name}
                    </h4>
                    <p className='text-primary font-bold mb-2'>
                    {product.price} CUP
                    </p>
                    <p className='text-sm text-gray-600 line-clamp-3'>
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className='px-4 mt-auto'>
                    <Button
                      className='w-full bg-primary hover:bg-primary text-primary-foreground'
                      size='sm'
                    >
                      Añadir
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className='flex items-center justify-center h-full'>
                <div className='text-center'>
                  <p className='text-primary'>No hay productos disponibles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
