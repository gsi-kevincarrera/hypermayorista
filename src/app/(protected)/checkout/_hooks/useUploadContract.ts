import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { saveContract, deactivatePreviousContracts } from '@/db/actions'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function useUploadContract(deactivatePrevious = false) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { user } = useUser()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Check if file is PDF
      if (selectedFile.type !== 'application/pdf') {
        setStatus('error')
        setMessage('Por favor, sube un archivo PDF')
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setStatus('error')
        setMessage('El archivo no debe exceder 5MB')
        return
      }

      setFile(selectedFile)
      setStatus('idle')
      setMessage('')
    }
  }

  const handleDownload = () => {
    // Create a link to download the contract PDF
    const link = document.createElement('a')
    link.href = '/contract.pdf'
    link.download = 'contrato-hipermayorista.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleUpload = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Por favor, selecciona un archivo primero')
      return
    }

    try {
      setUploading(true)

      // If deactivatePrevious is true, deactivate previous contracts first
      if (deactivatePrevious) {
        const deactivateResult = await deactivatePreviousContracts(user?.id)

        if (!deactivateResult.success) {
          throw new Error(deactivateResult.error)
        }
      }

      // Upload file to Supabase Storage
      const fileName = `contract-${Date.now()}.pdf`
      const { error: storageError } = await supabase.storage
        .from('contracts')
        .upload(fileName, file)

      if (storageError) {
        throw new Error(storageError.message)
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('contracts')
        .getPublicUrl(fileName)

      const filePath = urlData.publicUrl

      // Use server action to save contract to database
      const result = await saveContract(filePath, user?.id ?? null)

      if (!result.success) {
        throw new Error(result.error)
      }

      setStatus('success')
      setMessage('Contrato subido exitosamente. Tu solicitud está en revisión.')

      // Refresh the page after a short delay to show the pending status
      setTimeout(() => {
        router.refresh()
      }, 300)
    } catch (error) {
      console.error('Error uploading contract:', error)
      setStatus('error')
      setMessage(
        error instanceof Error ? error.message : 'Error al subir el contrato'
      )
    } finally {
      setUploading(false)
    }
  }

  return {
    file,
    handleFileChange,
    handleDownload,
    handleUpload,
    uploading,
    status,
    message,
  }
}
