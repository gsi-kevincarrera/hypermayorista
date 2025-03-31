import { useRouter } from 'next/navigation'
import { startTransition, use, useOptimistic } from 'react'
import { useState } from 'react'
import { Address } from '@/types'
import { DBQueryResponse } from '@/types/core'
import { toast } from 'sonner'
import {
  addAddressDb,
  deleteAddressDb,
  setDefaultAddressDb,
  updateAddressDb,
} from '@/db/queries'

type OptimisticAction =
  | {
      type: 'add'
      payload: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
    }
  | {
      type: 'update'
      payload: Omit<Address, 'createdAt' | 'updatedAt'>
    }
  | {
      type: 'delete'
      payload: number
    }
  | {
      type: 'set_default'
      payload: number
    }

export default function useAddresses(
  addressesPromise: Promise<DBQueryResponse<Address[]>>
) {
  const router = useRouter()
  const result = use(addressesPromise)

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [isSettingDefault, setIsSettingDefault] = useState<number | null>(null)

  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(
    null
  )

  type OptimisticAddress = Address & {
    isOptimistic?: boolean
    optimisticType?: OptimisticAction['type']
  }

  const [optimisticAddresses, dispatchOptimisticAddress] = useOptimistic<
    OptimisticAddress[],
    OptimisticAction
  >(
    (result.data ?? []).map((addr) => ({ ...addr })) as OptimisticAddress[],
    (
      state: OptimisticAddress[],
      action: OptimisticAction
    ): OptimisticAddress[] => {
      switch (action.type) {
        case 'add':
          return [
            ...state,
            {
              ...action.payload,
              id: Date.now(),
              userId: 'optimistic-user',
              isDefault: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              isOptimistic: true,
              optimisticType: 'add',
            },
          ]
        case 'update':
          return state.map((addr) =>
            addr.id === action.payload.id
              ? {
                  ...addr,
                  ...action.payload,
                  isOptimistic: true,
                  optimisticType: 'update',
                }
              : addr
          )
        case 'delete':
          return state.map((addr) =>
            addr.id === action.payload
              ? { ...addr, isOptimistic: true, optimisticType: 'delete' }
              : addr
          )
        case 'set_default':
          return state.map((addr) => ({
            ...addr,
            isDefault: addr.id === action.payload,
            isOptimistic: true,
            optimisticType: 'set_default',
          }))
        default:
          return state
      }
    }
  )

  if (!result.success) {
    toast.error(
      'Error loading addresses: ' + (result.message || 'Unknown error')
    )
  }

  const currentAddresses = optimisticAddresses.filter(
    (addr) =>
      !(
        addr.isOptimistic &&
        optimisticAddresses.some(
          (a) => a.id === addr.id && a.isOptimistic === false
        )
      )
  )

  const handleAddAddress = async (
    values: Omit<
      Address,
      'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isDefault'
    >
  ) => {
    setIsSubmitting(true)
    setIsAddDialogOpen(false)

    const payloadForDispatch: Omit<
      Address,
      'id' | 'userId' | 'createdAt' | 'updatedAt'
    > = {
      ...values,
      isDefault: false,
    }

    startTransition(() => {
      dispatchOptimisticAddress({ type: 'add', payload: payloadForDispatch })
    })

    try {
      const response = await addAddressDb(values)
      if (!response.success) {
        toast.error(
          'Error agregando dirección: ' +
            (response.message || 'Error desconocido')
        )
      } else {
        toast.success('Dirección agregada con éxito')
        router.refresh()
      }
    } catch (error) {
      console.error('Error submitting address:', error)
      toast.error('Error inesperado al agregar dirección')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditAddressSubmit = async (
    values: Omit<Address, 'createdAt' | 'updatedAt' | 'isOptimistic'>
  ) => {
    if (!editingAddress) return
    setIsSubmitting(true)
    setIsEditDialogOpen(false)

    const optimisticUpdate = {
      ...values,
      isDefault: editingAddress.isDefault,
    }

    startTransition(() => {
      dispatchOptimisticAddress({ type: 'update', payload: optimisticUpdate })
    })

    try {
      const response = await updateAddressDb(optimisticUpdate)
      if (!response.success) {
        toast.error(
          'Error actualizando dirección: ' +
            (response.message || 'Error desconocido')
        )
      } else {
        toast.success('Dirección actualizada con éxito')
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating address:', error)
      toast.error('Error inesperado al actualizar dirección')
    } finally {
      setIsSubmitting(false)
      setEditingAddress(null)
    }
  }

  const handleDeleteAddress = (id: number) => {
    setDeletingAddressId(id)
  }

  const confirmDeleteAddress = async () => {
    if (!deletingAddressId) return

    const idToDelete = deletingAddressId
    setIsDeleting(idToDelete)
    setDeletingAddressId(null)

    startTransition(() => {
      dispatchOptimisticAddress({ type: 'delete', payload: idToDelete })
    })

    try {
      const response = await deleteAddressDb(idToDelete)
      if (!response.success) {
        toast.error(
          'Error eliminando dirección: ' +
            (response.message || 'Error desconocido')
        )
        router.refresh()
      } else {
        toast.success('Dirección eliminada con éxito')
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting address:', error)
      toast.error('Error inesperado al eliminar dirección')
      router.refresh()
    } finally {
      setIsDeleting(null)
    }
  }

  const handleSetDefault = async (id: number) => {
    setIsSettingDefault(id)

    startTransition(() => {
      dispatchOptimisticAddress({ type: 'set_default', payload: id })
    })

    try {
      const response = await setDefaultAddressDb(id)
      if (!response.success) {
        toast.error(
          'Error estableciendo predeterminada: ' +
            (response.message || 'Error desconocido')
        )
      } else {
        toast.success('Dirección predeterminada actualizada')
        router.refresh()
      }
    } catch (error) {
      console.error('Error setting default address:', error)
      toast.error('Error inesperado al establecer predeterminada')
    } finally {
      setIsSettingDefault(null)
    }
  }

  const openEditDialog = (address: Address) => {
    setEditingAddress(address)
    setIsEditDialogOpen(true)
  }

  return {
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
  }
}
