'use client'
import { Button } from '@/components/ui/button'

export default function CallToActionButton({
  disabled,
  onAction,
  text,
}: {
  disabled: boolean
  onAction: () => void
  text: string
}) {
  return (
    <Button
      className='w-full bg-primary hover:bg-purple-700 h-12 text-lg'
      onClick={() => onAction()}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}
