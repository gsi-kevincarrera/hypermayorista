import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ProductOption } from '@/types'
import { SetStateAction } from '@/types/ts-types'

interface Props {
  options: ProductOption[] | null
  setSelectedValues: SetStateAction<Record<string, string>>
  selectedValues: Record<string, string>
}

export default function ProductOptions({
  options,
  setSelectedValues,
  selectedValues,
}: Props) {
  if (!options || options.length === 0) return null

  const handleValueChange = (optionName: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  return (
    <>
      {options.map((option) => (
        <div key={option.id} className='space-y-2'>
          <Label>{option.name}</Label>
          <RadioGroup
            className='grid grid-cols-2 gap-2'
            onValueChange={(value) => handleValueChange(option.name, value)}
          >
            {option.values.map((value) => (
              <div key={value}>
                <RadioGroupItem
                  value={value}
                  id={value}
                  className='peer sr-only'
                />
                <Label
                  htmlFor={value}
                  className='flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary'
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </>
  )
}
