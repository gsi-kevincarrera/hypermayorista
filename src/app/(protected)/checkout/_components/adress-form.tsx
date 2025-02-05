import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function AddressForm() {
  return (
    <form className='space-y-6'>
      <div className='flex items-center gap-4'>
        <div className='flex-1'>
          <Label htmlFor='state'>Provincia *</Label>
          <Select defaultValue='habana'>
            <SelectTrigger>
              <SelectValue placeholder='Seleccionar provincia' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='habana'>La Habana</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex-1'>
          <Label htmlFor='state'>Municipio *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select state' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='NY'>New York</SelectItem>
              <SelectItem value='CA'>California</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='name'>Nombre(s) y apellidos *</Label>
          <Input id='name' placeholder='Escribe tu nombre completo' />
        </div>
        <div>
          <Label htmlFor='phone'>Número de teléfono *</Label>
          <div className='flex gap-2'>
            <Select defaultValue='+53'>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='+53' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='+53'>+53</SelectItem>
              </SelectContent>
            </Select>
            <Input id='phone' type='tel' className='flex-1' />
          </div>
          <p className='text-sm text-gray-500 mt-1'>
            Solo para actualizaciones del proceso de entrega
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor='address'>Dirección *</Label>
        <Input id='address' />
        {/* <Button
                variant='link'
                className='mt-1 h-auto p-0 text-purple-600'
              >
                Use my current location
              </Button> */}
      </div>

      {/* <div>
              <Label htmlFor='apartment'>
                Apartment, suite, unit, building, floor (optional)
              </Label>
              <Input id='apartment' />
            </div> */}

      <div className='flex items-center space-x-2'>
        <Checkbox id='default' />
        <label
          htmlFor='default'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Establecer como dirección por defecto
        </label>
      </div>
      <Button className=' mt-6 w-52 py-6 bg-purple-800 hover:bg-purple-900 text-white'>
        Continuar con el pago
      </Button>
    </form>
  )
}
