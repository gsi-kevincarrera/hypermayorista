import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClockIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ContractPending() {
  return (
    <div className='container mx-auto p-6 mt-28 min-h-dvh'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Contrato de Hipermayorista
          </CardTitle>
          <CardDescription>
            Tu contrato ha sido enviado y está pendiente de aprobación
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-center py-10'>
            <div className='text-center space-y-4'>
              <div className='bg-primary/10 p-4 rounded-full inline-block'>
                <ClockIcon className='h-16 w-16 text-primary' />
              </div>
              <h2 className='text-xl font-semibold'>Contrato en Revisión</h2>
              <p className='text-muted-foreground max-w-md'>
                Nuestro equipo está revisando tu contrato. Este proceso puede
                tomar un tiempo.
              </p>
            </div>
          </div>

          <Alert className='bg-blue-50 border-blue-200'>
            <AlertTitle className='text-primary'>¿Qué sigue?</AlertTitle>
            <AlertDescription className='text-primary/90'>
              <ul className='list-disc pl-5 space-y-2 mt-2'>
                <li>
                  Te notificaremos por correo electrónico cuando tu contrato sea
                  aprobado.
                </li>
                <li>
                  Una vez aprobado, podrás continuar con tu proceso de compra.
                </li>
                <li>
                  Si hay algún problema con tu contrato, te contactaremos para
                  solicitar correcciones.
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className='bg-muted p-4 rounded-lg'>
            <p className='text-sm text-center'>
              Si tienes alguna pregunta, por favor contacta a nuestro servicio
              al cliente al{' '}
              <a
                href='mailto:soporte@hipermayorista.com'
                className='text-primary font-medium hover:underline'
              >
                soporte@hipermayorista.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
