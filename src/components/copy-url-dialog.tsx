'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useState } from 'react'

const currentUrl = window.location.href

export default function CopyUrlDialog() {
  const [open, setOpen] = useState(false)

  return (
    <div className='absolute top-4 right-4'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full bg-white/80 backdrop-blur-sm'
          >
            <Share2 className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Compartir producto</DialogTitle>
            <DialogDescription>
              Comparte este producto con tus amigos y familiares.
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Input id='link' defaultValue={currentUrl} readOnly />
            </div>
            <Button
              type='submit'
              size='sm'
              className='px-3'
              onClick={() => {
                navigator.clipboard.writeText(currentUrl)
                setOpen(false)
              }}
            >
              Copiar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
