import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SpecialOffers() {
  return (
    <div>
      <h3 className='text-xl sm:text-2xl font-semibold mb-4'>Special Offers</h3>
      <Card className='bg-gradient-to-r from-purple-600 to-purple-800 text-white'>
        <CardContent className='p-6'>
          <h4 className='text-lg sm:text-xl font-bold mb-2'>Summer Sale!</h4>
          <p className='mb-4'>
            Get up to 50% off on selected items. Limited time offer.
          </p>
          <Button variant='secondary'>Shop Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}
