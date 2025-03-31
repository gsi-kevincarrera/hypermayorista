'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'

// Define types for order data
interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string // Keep as string for initial data, parse when needed
  status: string // Could be refined with an enum or literal types
  total: number
  items: OrderItem[]
}

// Datos de ejemplo para los pedidos
const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-12-15',
    status: 'Pendiente',
    total: 1250.0,
    items: [
      { name: 'Producto A', quantity: 5, price: 150.0 },
      { name: 'Producto B', quantity: 2, price: 250.0 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2023-12-10',
    status: 'Enviado',
    total: 3450.0,
    items: [
      { name: 'Producto C', quantity: 10, price: 120.0 },
      { name: 'Producto D', quantity: 5, price: 330.0 },
    ],
  },
  {
    id: 'ORD-003',
    date: '2023-12-05',
    status: 'Entregado',
    total: 780.0,
    items: [{ name: 'Producto E', quantity: 2, price: 390.0 }],
  },
  {
    id: 'ORD-004',
    date: '2023-11-28',
    status: 'Cancelado',
    total: 1500.0,
    items: [{ name: 'Producto F', quantity: 3, price: 500.0 }],
  },
  {
    id: 'ORD-005',
    date: '2023-11-20',
    status: 'Entregado',
    total: 2100.0,
    items: [{ name: 'Producto G', quantity: 7, price: 300.0 }],
  },
]

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null) // Type the state
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (status: string) => { // Add type string
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800' // Adjusted colors for visibility
      case 'Enviado':
        return 'bg-green-100 text-green-800' // Adjusted colors for visibility
      case 'Entregado':
        return 'bg-blue-100 text-blue-800' // Adjusted colors for visibility
      case 'Cancelado':
        return 'bg-red-100 text-red-800' // Adjusted colors for visibility (assuming destructive is red)
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const handleViewDetails = (order: Order) => { // Add type Order
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const formatDate = (dateString: string) => { // Add type string
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => { // Add type number
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount)
  }

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[150px]'>Número de Pedido</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className='text-right'>Total</TableHead>
              <TableHead className='text-center'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium'>{order.id}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell className='text-center'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleViewDetails(order)}
                    className='flex items-center gap-1'
                  >
                    <Eye className='h-4 w-4' />
                    <span className='hidden sm:inline'>Ver Detalles</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Detalles del Pedido {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Realizado el {selectedOrder && formatDate(selectedOrder.date)}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='font-medium'>Estado:</span>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>

              <div className='border rounded-md'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className='text-center'>Cantidad</TableHead>
                      <TableHead className='text-right'>Precio</TableHead>
                      <TableHead className='text-right'>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className='text-center'>
                          {item.quantity}
                        </TableCell>
                        <TableCell className='text-right'>
                          {formatCurrency(item.price)}
                        </TableCell>
                        <TableCell className='text-right'>
                          {formatCurrency(item.quantity * item.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='flex justify-between items-center font-medium text-lg'>
                <span>Total:</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
