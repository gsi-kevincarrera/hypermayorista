'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Edit, Trash2, Plus } from 'lucide-react'

// Datos de ejemplo para las direcciones
const initialAddresses = {
  shipping: [
    {
      id: 1,
      name: 'Juan Pérez',
      street: 'Av. Insurgentes Sur 1602',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '03940',
      country: 'México',
      phone: '+52 55 1234 5678',
      isDefault: true,
    },
    {
      id: 2,
      name: 'María Rodríguez',
      street: 'Calle Reforma 222',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44600',
      country: 'México',
      phone: '+52 33 9876 5432',
      isDefault: false,
    },
  ],
}

export default function Addresses() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isAddShippingOpen, setIsAddShippingOpen] = useState(false)
  const [editingShippingId, setEditingShippingId] = useState<number | null>(
    null
  )

  const handleEditBilling = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para editar la dirección de facturación
    // En un caso real, esto enviaría los datos a un API

    // Simulación de editar la dirección
    const formData = new FormData(e.currentTarget)
    const updatedBilling = {
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
    }

    setAddresses({
      ...addresses,
    })
  }

  const handleAddShipping = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para añadir una nueva dirección de envío

    // Simulación de añadir una dirección
    const formData = new FormData(e.currentTarget)
    const newShipping = {
      id: addresses.shipping.length + 1,
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
      isDefault: addresses.shipping.length === 0, // Si es la primera dirección, será la predeterminada
    }

    setAddresses({
      ...addresses,
      shipping: [...addresses.shipping, newShipping],
    })

    setIsAddShippingOpen(false)
  }

  const handleEditShipping = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Simulación de editar la dirección
    const formData = new FormData(e.currentTarget)
    const updatedShipping = {
      id: editingShippingId,
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
      isDefault:
        addresses.shipping.find((addr) => addr.id === editingShippingId)
          ?.isDefault || false,
    }

    setAddresses({
      ...addresses,
      shipping: addresses.shipping.map((addr) =>
        addr.id === editingShippingId ? updatedShipping : addr
      ),
    })

    setEditingShippingId(null)
  }

  const handleDeleteShipping = (id: number) => {
    // Si se elimina la dirección predeterminada, la primera dirección restante se convierte en predeterminada
    const isRemovingDefault = addresses.shipping.find(
      (addr) => addr.id === id
    )?.isDefault
    let updatedShipping = addresses.shipping.filter((addr) => addr.id !== id)

    if (isRemovingDefault && updatedShipping.length > 0) {
      updatedShipping = updatedShipping.map((addr, index) =>
        index === 0 ? { ...addr, isDefault: true } : addr
      )
    }

    setAddresses({
      ...addresses,
      shipping: updatedShipping,
    })
  }

  const handleSetDefaultShipping = (id: number) => {
    setAddresses({
      ...addresses,
      shipping: addresses.shipping.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    })
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-medium'>Direcciones de Envío</h3>
        <Dialog open={isAddShippingOpen} onOpenChange={setIsAddShippingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Añadir Dirección
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Añadir Dirección de Envío</DialogTitle>
              <DialogDescription>
                Agrega una nueva dirección para recibir tus pedidos.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddShipping}>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Nombre Completo</Label>
                  <Input id='name' name='name' required />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='street'>Dirección</Label>
                  <Textarea id='street' name='street' required />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>Ciudad</Label>
                    <Input id='city' name='city' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>Estado</Label>
                    <Input id='state' name='state' required />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='zipCode'>Código Postal</Label>
                    <Input id='zipCode' name='zipCode' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='country'>País</Label>
                    <Input
                      id='country'
                      name='country'
                      defaultValue='México'
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Teléfono</Label>
                  <Input id='phone' name='phone' required />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Guardar Dirección</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {addresses.shipping.map((address) => (
          <Card
            key={address.id}
            className={`${address.isDefault ? 'border-primary' : ''}`}
          >
            <CardContent className='p-4'>
              <div className='flex justify-between items-start'>
                <div className='flex items-start gap-3'>
                  <MapPin className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <div>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>{address.name}</p>
                      {address.isDefault && (
                        <span className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full'>
                          Predeterminada
                        </span>
                      )}
                    </div>
                    {address.street}
                    <p>
                      {address.city}, {address.state}, {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <Dialog
                    open={editingShippingId === address.id}
                    onOpenChange={(open) => {
                      if (!open) setEditingShippingId(null)
                      else setEditingShippingId(address.id)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <Edit className='h-4 w-4' />
                        <span className='sr-only'>Editar dirección</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[500px]'>
                      <DialogHeader>
                        <DialogTitle>Editar Dirección de Envío</DialogTitle>
                        <DialogDescription>
                          Actualiza los detalles de esta dirección de envío.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEditShipping}>
                        <div className='space-y-4 py-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='name'>Nombre Completo</Label>
                            <Input
                              id='name'
                              name='name'
                              defaultValue={address.name}
                              required
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='street'>Dirección</Label>
                            <Textarea
                              id='street'
                              name='street'
                              defaultValue={address.street}
                              required
                            />
                          </div>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                              <Label htmlFor='city'>Ciudad</Label>
                              <Input
                                id='city'
                                name='city'
                                defaultValue={address.city}
                                required
                              />
                            </div>
                            <div className='space-y-2'>
                              <Label htmlFor='state'>Estado</Label>
                              <Input
                                id='state'
                                name='state'
                                defaultValue={address.state}
                                required
                              />
                            </div>
                          </div>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                              <Label htmlFor='zipCode'>Código Postal</Label>
                              <Input
                                id='zipCode'
                                name='zipCode'
                                defaultValue={address.zipCode}
                                required
                              />
                            </div>
                            <div className='space-y-2'>
                              <Label htmlFor='country'>País</Label>
                              <Input
                                id='country'
                                name='country'
                                defaultValue={address.country}
                                required
                              />
                            </div>
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='phone'>Teléfono</Label>
                            <Input
                              id='phone'
                              name='phone'
                              defaultValue={address.phone}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type='submit'>Guardar Cambios</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDeleteShipping(address.id)}
                    className='text-destructive hover:text-destructive/90 hover:bg-destructive/10'
                  >
                    <Trash2 className='h-4 w-4' />
                    <span className='sr-only'>Eliminar dirección</span>
                  </Button>
                </div>
              </div>
              {!address.isDefault && (
                <div className='mt-4 pt-4 border-t'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleSetDefaultShipping(address.id)}
                    className='w-full'
                  >
                    Establecer como predeterminada
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
