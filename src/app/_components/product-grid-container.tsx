import { ShoppingCart } from 'lucide-react'

export default function ProductGridContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='bg-primary-foreground flex-grow'>
        <div className='container mx-auto px-4 py-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
            <ShoppingCart className='h-6 w-6' />
            Todos los productos
          </h2>
          {children}
        </div>
      </div>
    </div>
  )
}
