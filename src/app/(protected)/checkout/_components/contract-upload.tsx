'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Download, FileUp, CheckCircle2, AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import useUploadContract from '../_hooks/useUploadContract'

export default function ContractUpload() {
  const {
    file,
    handleFileChange,
    handleDownload,
    handleUpload,
    uploading,
    status,
    message,
  } = useUploadContract()

  return (
    <div className='container mx-auto p-6 mt-28 min-h-dvh'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Contrato de Hipermayorista
          </CardTitle>
          <CardDescription>
            Para continuar con tu compra, necesitas firmar y subir el contrato
            de Hipermayorista
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='bg-muted p-6 rounded-lg text-center space-y-4'>
            <h3 className='font-medium'>Paso 1: Descarga el contrato</h3>
            <p className='text-sm text-muted-foreground'>
              Descarga el contrato, imprímelo, fírmalo y escanéalo como PDF
            </p>
            <Button
              onClick={handleDownload}
              variant='outline'
              className='w-full sm:w-auto'
            >
              <Download className='mr-2 h-4 w-4' />
              Descargar Contrato
            </Button>
          </div>

          <div className='bg-muted p-6 rounded-lg text-center space-y-4'>
            <h3 className='font-medium'>Paso 2: Sube el contrato firmado</h3>
            <p className='text-sm text-muted-foreground'>
              Sube el contrato firmado en formato PDF (máximo 5MB)
            </p>
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors'>
                <Input
                  type='file'
                  id='contract-file'
                  accept='.pdf'
                  onChange={handleFileChange}
                  className='hidden'
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
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading || status === 'success'}
            className='w-full'
          >
            {uploading ? 'Subiendo...' : 'Subir Contrato Firmado'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
