import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OrderHistory from './_components/order-history'
import Addresses from './_components/addresses'

export default function AccountPage() {
  return (
    <div className='container mx-auto p-6 mt-28 min-h-dvh'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Mi Cuenta</h1>
          <p className='text-muted-foreground mt-1'>
            Administra tus pedidos y direcciones
          </p>
        </div>
      </div>

      <Tabs defaultValue='orders' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 mb-8'>
          <TabsTrigger value='orders'>Historial de Pedidos</TabsTrigger>
          <TabsTrigger value='addresses'>Direcciones</TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pedidos</CardTitle>
              <CardDescription>
                Revisa el estado y los detalles de tus pedidos anteriores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='addresses'>
          <Card>
            <CardHeader>
              <CardTitle>Direcciones</CardTitle>
              <CardDescription>
                Administra tus direcciones de facturación y envío.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Addresses />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
