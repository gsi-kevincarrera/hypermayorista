'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { XCircle, AlertTriangle, FileUp, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useUploadContract from '../_hooks/useUploadContract'

interface ContractRejectedProps {
  reason: string | null
}

export default function ContractRejected({ reason }: ContractRejectedProps) {
  const {
    file,
    handleFileChange,
    handleUpload,
    uploading,
    status,
    message,
  } = useUploadContract(true) // Pass true to deactivate previous contracts

  return (
    <div className='container mx-auto p-6 mt-28 min-h-dvh'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Contrato Rechazado
          </CardTitle>
          <CardDescription>
            Tu contrato no ha sido aprobado. Por favor, revisa los detalles a
            continuación.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-center py-6'>
            <div className='text-center space-y-4'>
              <div className='bg-destructive/10 p-4 rounded-full inline-block'>
                <XCircle className='h-16 w-16 text-destructive' />
              </div>
              <h2 className='text-xl font-semibold'>Contrato No Aprobado</h2>
            </div>
          </div>

          <Alert variant='destructive' className='border-destructive/50'>
            <AlertTriangle className='h-4 w-4' />
            <AlertTitle>Motivo del rechazo</AlertTitle>
            <AlertDescription>
              {reason ||
                'Tu contrato no cumple con los requisitos necesarios. Por favor, revisa y vuelve a intentarlo.'}
            </AlertDescription>
          </Alert>

          <div className='bg-muted p-6 rounded-lg space-y-4'>
            <h3 className='font-medium'>¿Qué hacer ahora?</h3>
            <ul className='list-disc pl-5 space-y-2'>
              <li>Revisa cuidadosamente el motivo del rechazo.</li>
              <li>Asegúrate de que el contrato esté correctamente firmado.</li>
              <li>
                Verifica que el documento sea legible y esté en formato PDF.
              </li>
              <li>
                Comprueba que hayas incluido toda la información requerida.
              </li>
            </ul>
          </div>

          <div className='bg-muted p-6 rounded-lg text-center space-y-4'>
            <h3 className='font-medium'>Sube un nuevo contrato</h3>
            <p className='text-sm text-muted-foreground'>
              Sube el contrato corregido en formato PDF (máximo 5MB)
            </p>
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors'>
                <Input
                  type='file'
                  id='contract-file'
                  accept='.pdf'
                  onChange={handleFileChange}
                  className='hidden'
                  disabled={uploading}
                />
                <label
                  htmlFor='contract-file'
                  className='flex flex-col items-center justify-center cursor-pointer'
                >
                  <FileUp className='h-10 w-10 text-muted-foreground mb-2' />
                  <p className='font-medium'>Haz clic para seleccionar</p>
                  <p className='text-sm text-muted-foreground'>
                    {file ? file.name : 'O arrastra y suelta aquí'}
                  </p>
                </label>
              </div>

              {file && (
                <p className='text-sm font-medium text-green-600'>
                  Archivo seleccionado: {file.name}
                </p>
              )}
            </div>
          </div>

          {status === 'success' && (
            <Alert className='bg-green-50 border-green-200'>
              <CheckCircle2 className='h-4 w-4 text-green-600' />
              <AlertTitle className='text-green-600'>¡Éxito!</AlertTitle>
              <AlertDescription className='text-green-700'>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant='destructive'>
              <AlertTriangle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className='bg-muted p-4 rounded-lg'>
            <p className='text-sm text-center'>
              Si necesitas ayuda, por favor contacta a nuestro equipo de soporte
              en{' '}
              <a
                href='mailto:soporte@hipermayorista.com'
                className='text-primary font-medium hover:underline'
              >
                soporte@hipermayorista.com
              </a>
            </p>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button
            onClick={handleUpload}
            className='w-full sm:w-auto'
            disabled={!file || uploading}
          >
            {uploading ? 'Subiendo...' : 'Subir Nuevo Contrato'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
