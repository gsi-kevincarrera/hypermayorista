'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Edit, Trash2, Plus, Loader2 } from 'lucide-react'
import { Address } from '@/types'
import { DBQueryResponse } from '@/types/core'
import useAddresses from '../_hooks/useAddresses'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export default function Addresses({
  addressesPromise,
}: {
  addressesPromise: Promise<DBQueryResponse<Address[]>>
}) {
  const {
    currentAddresses,
    isAddDialogOpen,
    isEditDialogOpen,
    editingAddress,
    isSubmitting,
    isDeleting,
    isSettingDefault,
    deletingAddressId,
    handleAddAddress,
    handleEditAddressSubmit,
    handleDeleteAddress,
    confirmDeleteAddress,
    handleSetDefault,
    openEditDialog,
    setIsAddDialogOpen,
    optimisticAddresses,
    setIsEditDialogOpen,
    setEditingAddress,
    setDeletingAddressId,
  } = useAddresses(addressesPromise)

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-medium'>Direcciones de Envío</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={isSubmitting}>
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
            <AddressForm
              onSubmit={handleAddAddress}
              isSubmitting={isSubmitting}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {currentAddresses.length === 0 &&
      !optimisticAddresses.some(
        (a) => a.isOptimistic && a.optimisticType !== 'delete'
      ) ? (
        <div className='text-center text-muted-foreground py-8'>
          No tienes direcciones guardadas.
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {currentAddresses.map((address) => (
            <Card
              key={address.id}
              className={`
                ${address.isDefault ? 'border-primary' : ''} 
                ${
                  address.isOptimistic
                    ? 'opacity-50 pointer-events-none animate-pulse'
                    : ''
                }
              `}
            >
              <CardContent className='p-4'>
                <div className='flex justify-between items-start'>
                  <div className='flex items-start gap-3'>
                    <MapPin className='h-5 w-5 text-muted-foreground mt-0.5' />
                    <div>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{address.fullName}</p>
                        {address.isDefault && (
                          <span className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full'>
                            Predeterminada
                          </span>
                        )}
                        {address.isOptimistic && (
                          <span className='text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full'>
                            Procesando...
                          </span>
                        )}
                      </div>
                      <p>{address.address}</p>
                      <p>
                        {address.municipality}, {address.province}
                      </p>
                      <p>{address.phone}</p>
                      {address.additionalInfo && (
                        <p className='text-sm text-muted-foreground'>
                          {address.additionalInfo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 items-end'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7'
                      onClick={() => openEditDialog(address)}
                      disabled={
                        isSubmitting || !!isDeleting || !!isSettingDefault
                      }
                    >
                      <Edit className='h-4 w-4' />
                      <span className='sr-only'>Editar dirección</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDeleteAddress(address.id)}
                      className='text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-7 w-7'
                      disabled={
                        isDeleting === address.id ||
                        isSubmitting ||
                        !!isSettingDefault
                      }
                    >
                      {isDeleting === address.id ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                      ) : (
                        <Trash2 className='h-4 w-4' />
                      )}
                      <span className='sr-only'>Eliminar dirección</span>
                    </Button>
                  </div>
                </div>
                {!address.isDefault && !address.isOptimistic && (
                  <div className='mt-4 pt-4 border-t'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleSetDefault(address.id)}
                      className='w-full'
                      disabled={
                        isSettingDefault === address.id ||
                        isSubmitting ||
                        !!isDeleting
                      }
                    >
                      {isSettingDefault === address.id ? (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      ) : null}
                      Establecer como predeterminada
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Editar Dirección de Envío</DialogTitle>
            <DialogDescription>
              Actualiza los detalles de esta dirección de envío.
            </DialogDescription>
          </DialogHeader>
          {editingAddress && (
            <AddressForm
              onSubmit={(values) =>
                handleEditAddressSubmit({
                  ...values,
                  id: editingAddress.id,
                  userId: editingAddress.userId,
                  isDefault: editingAddress.isDefault,
                })
              }
              isSubmitting={isSubmitting}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setEditingAddress(null)
              }}
              initialData={editingAddress}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deletingAddressId !== null}
        onOpenChange={(open: boolean) => !open && setDeletingAddressId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              tu dirección.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting === deletingAddressId}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAddress}
              disabled={isDeleting === deletingAddressId}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {isDeleting === deletingAddressId ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

interface AddressFormProps {
  onSubmit: (values: AddressFormValues) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
  initialData?: Partial<Address>
}

const cubanPhoneNumberRegex = /^(?:\+?53\s?)?(5\d{7})$/

const addressFormSchema = z.object({
  fullName: z.string().min(3, { message: 'El nombre es requerido.' }),
  address: z.string().min(5, { message: 'La dirección es requerida.' }),
  province: z.string().min(3, { message: 'La provincia es requerida.' }),
  municipality: z.string().min(3, { message: 'El municipio es requerido.' }),
  phone: z
    .string()
    .regex(cubanPhoneNumberRegex, { message: 'Número de teléfono inválido.' }),
  additionalInfo: z.string().optional().nullable(),
})

type AddressFormValues = z.infer<typeof addressFormSchema>

function AddressForm({
  onSubmit,
  onCancel,
  isSubmitting,
  initialData,
}: AddressFormProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: initialData?.fullName ?? '',
      address: initialData?.address ?? '',
      province: initialData?.province ?? '',
      municipality: initialData?.municipality ?? '',
      phone: initialData?.phone ?? '',
      additionalInfo: initialData?.additionalInfo ?? '',
    },
    mode: 'onChange',
  })

  const { isSubmitting: rhfIsSubmitting } = form.formState

  const combinedIsSubmitting = isSubmitting || rhfIsSubmitting

  const handleFormSubmit = form.handleSubmit(onSubmit)

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className='space-y-4'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo *</FormLabel>
              <FormControl>
                <Input disabled={combinedIsSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección *</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none'
                  disabled={combinedIsSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='province'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia *</FormLabel>
                <FormControl>
                  <Input disabled={combinedIsSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='municipality'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipio *</FormLabel>
                <FormControl>
                  <Input disabled={combinedIsSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono *</FormLabel>
              <FormControl>
                <Input type='tel' disabled={combinedIsSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='additionalInfo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Información Adicional (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Ej: Edificio azul, apartamento 3B'
                  disabled={combinedIsSubmitting}
                  {...field}
                  value={field.value ?? ''}
                  className='resize-none'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={combinedIsSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            disabled={combinedIsSubmitting || !form.formState.isDirty}
          >
            {combinedIsSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            {initialData ? 'Guardar Cambios' : 'Guardar Dirección'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
