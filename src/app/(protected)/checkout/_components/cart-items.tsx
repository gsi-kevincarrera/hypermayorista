import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Props {
  items: CartItem[]
  updateQuantity: (itemId: number, quantity: number) => void
}

export default function CartItems({ items, updateQuantity }: Props) {
  return (
    <div className='space-y-4'>
      {items.map((item) => (
        <Card key={item.id} className='flex flex-col h-full'>
          <CardContent className='flex items-center p-4'>
            <Image
              src={item.image}
              alt={item.name}
              className='w-20 h-20 object-cover rounded mr-4'
              width={40}
              height={40}
            />
            <div className='flex-grow'>
              <h3 className='font-semibold'>{item.name}</h3>
              <p className='text-gray-600'>CUP {item.price.toFixed(2)}</p>
            </div>
            <div className='flex items-center'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => updateQuantity(item.id, -1)}
              >
                <Minus className='h-4 w-4' />
              </Button>
              <span className='mx-2 w-8 text-center'>{item.quantity}</span>
              <Button
                variant='outline'
                size='icon'
                onClick={() => updateQuantity(item.id, 1)}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
