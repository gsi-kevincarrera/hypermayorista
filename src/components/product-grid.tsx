'use client'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const products = [
  {
    id: 1,
    name: 'Gallo Espaguettini al huevo 250g',
    price: 'CUP 190.00',
    description:
      'Pasta italiana con una textura suave y sedosa. Se cocina en pocos minutos y es ideal para acompañar con salsas ligeras y frescas.',
    image: '/natilla.webp',
  },
  {
    id: 2,
    name: 'Vodka Borjska Bianca 70cl',
    price: 'CUP 1,600.00',
    description:
      'Vodka puro y frío para saborear en plenitud o en cócteles armoniosos. Botella 70 cl.',
    image: '/natilla.webp',
  },
  {
    id: 3,
    name: 'Natilla Chocolate Promolac 1kg',
    price: 'CUP 2,114.14',
    description:
      'Disfruta del sabor rico y cremoso de la Natilla de Chocolate Promolac. Hecha con el mejor chocolate de calidad.',
    image: '/natilla.webp',
  },
  {
    id: 4,
    name: 'Vinagre de Miel y Frutas Tropicales 1L',
    price: 'CUP 430.00',
    description: 'Sabor tropical con beneficios para tu bienestar.',
    image: '/natilla.webp',
  },
  {
    id: 5,
    name: 'Vino de Miel y Jengibre 750ml',
    price: 'CUP 614.00',
    description: 'La energía y vitalidad del jengibre en cada copa.',
    image: '/natilla.webp',
  },
  {
    id: 5,
    name: 'Vino de Miel y Jengibre 750ml',
    price: 'CUP 614.00',
    description: 'La energía y vitalidad del jengibre en cada copa.',
    image: '/natilla.webp',
  },
  {
    id: 5,
    name: 'Vino de Miel y Jengibre 750ml',
    price: 'CUP 614.00',
    description: 'La energía y vitalidad del jengibre en cada copa.',
    image: '/natilla.webp',
  },
]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null as any)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <main>
      <div className='bg-primary-foreground flex-grow'>
        <div className='container mx-auto px-4 py-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
            <ShoppingCart className='h-6 w-6' />
            Todos los productos
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {products.map((product) => (
              <Card key={product.id} className='flex flex-col h-full'>
                <CardHeader className='p-0'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className='w-full h-40 object-cover cursor-pointer'
                    onClick={() => openProductModal(product)}
                    width={400}
                    height={400}
                  />
                </CardHeader>
                <CardContent className='px-4 pt-4 flex-grow'>
                  <h4
                    className='font-semibold text-gray-800 mb-1 cursor-pointer'
                    onClick={() => openProductModal(product)}
                  >
                    {product.name}
                  </h4>
                  <p className='text-primary font-bold mb-2'>{product.price}</p>
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
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <Image
                  src='/natilla.webp'
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className='w-full h-auto rounded-lg'
                />
              </div>
              <div className='space-y-4'>
                <DialogDescription>
                  {selectedProduct.description}
                </DialogDescription>
                <p className='text-2xl font-bold text-primary'>
                  {selectedProduct.price}
                </p>
                <div className='flex gap-4'>
                  <Button className='flex-1 bg-primary hover:bg-primary text-primary-foreground'>
                    Añadir al carrito
                  </Button>
                  <Button className='flex-1' variant='outline'>
                    Ir a pagar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
