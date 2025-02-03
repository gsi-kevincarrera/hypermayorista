//TODO: Remove the manually set slider values when the slider is updated depending on if its price or km

'use client'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { RefreshCcw, PlusIcon } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

type FilterType = 'toggle' | 'range' | 'search'
const FILTER_LIMIT_STEP = 5
const DEFAULT_SLIDER_VALUE = [0, 100000]

interface FilterCardProps {
  label: string
  currentValue?: string | string[]
  urlParam: string
  values?: string[]
  type?: FilterType
  toggleSelectionType?: 'single' | 'multiple'
  sliderRange?: number[]
  sliderCurrency?: string
}

export default function FilterCard({
  label,
  currentValue,
  type,
  values,
  urlParam,
  toggleSelectionType = 'multiple',
  sliderRange,
  sliderCurrency,
}: FilterCardProps) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  const [updatedSearchValue, setUpdatedSearchValue] = useState(currentValue)
  const [toggleValue, setToggleValue] = useState<string | string[]>(
    searchParams.getAll(urlParam)
  )

  const [showedFilterLimit, setShowedFilterLimit] = useState(FILTER_LIMIT_STEP)
  const [sliderValue, setSliderValue] = useState<number[]>(
    sliderRange ?? DEFAULT_SLIDER_VALUE
  )

  useEffect(() => {
    const minPriceFromUrl = searchParams.get('priceMin')
    const minKmFromUrl = searchParams.get('kmMin')

    if (minPriceFromUrl && urlParam == 'priceMin') {
      setSliderValue([
        Number(minPriceFromUrl),
        Number(searchParams.get('priceMax')),
      ])
    }

    if (minKmFromUrl && urlParam == 'kmMin') {
      setSliderValue([Number(minKmFromUrl), Number(searchParams.get('kmMax'))])
    }
  }, [searchParams, urlParam])

  const onChangeSearchQuery = (value: string) => {
    setUpdatedSearchValue(value)
    debouncedUpdateSearchQuery(value)
  }

  const debouncedUpdateSearchQuery = useDebouncedCallback((value: string) => {
    if (value.trim()) {
      params.set(urlParam, value)
      params.delete('page')
    } else {
      params.delete(urlParam)
    }
    router.replace(`/products?${params.toString()}`)
  }, 300)

  const handleFilterChange = useDebouncedCallback(
    (filterKey: string, value: string | string[]) => {
      params.delete(filterKey)
      if (Array.isArray(value)) {
        value.forEach((val) => params.append(filterKey, val))
      } else if (value) {
        params.append(filterKey, value)
      }
      params.set('page', '1')
      router.replace(`/products?${params.toString()}`)
    },
    300
  )

  const handleSliderChange = useDebouncedCallback((values: number[]) => {
    if (urlParam.includes('price')) {
      params.set('priceMin', values[0].toString())
      params.set('priceMax', values[1].toString())
      router.replace(`/products?${params.toString()}`)
    }

    if (urlParam.includes('km')) {
      params.set('kmMin', values[0].toString())
      params.set('kmMax', values[1].toString())
      router.replace(`/products?${params.toString()}`)
    }
  }, 400)

  const handleCleanSlider = () => {
    setSliderValue(sliderRange ?? DEFAULT_SLIDER_VALUE)
    if (urlParam.includes('price')) {
      params.delete('priceMin')
      params.delete('priceMax')
      router.replace(`/products?${params.toString()}`)
    }
    if (urlParam.includes('km')) {
      params.delete('kmMin')
      params.delete('kmMax')
      router.replace(`/products?${params.toString()}`)
    }
  }

  switch (type) {
    case 'search':
      return (
        <div className='bg-gray-50 p-6 rounded-lg'>
          <h3 className='font-semibold mb-4'>{label}</h3>
          <Input
            type='text'
            value={updatedSearchValue}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            placeholder='Buscar...'
            className='w-full'
          />
        </div>
      )
    case 'toggle':
      return (
        <div className='bg-gray-50 p-6 rounded-lg'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-semibold'>{label}</h3>
            {toggleSelectionType === 'multiple' && (
              <button
                title='Limpiar'
                onClick={() => {
                  setToggleValue([])
                  params.delete(urlParam)
                  router.replace(`/products?${params.toString()}`)
                }}
                disabled={!toggleValue.length}
                className='disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <RefreshCcw size={16} />
              </button>
            )}
          </div>

          {values && toggleSelectionType === 'single' ? (
            <ToggleGroup
              value={
                typeof toggleValue === 'string' ? toggleValue : toggleValue[0]
              }
              type='single'
              onValueChange={(value: string) => {
                setToggleValue(value)
                handleFilterChange(urlParam, value)
              }}
              className='flex flex-wrap justify-start'
            >
              {values
                .slice(0, showedFilterLimit)
                .map((val: string, index: number) => (
                  <ToggleGroupItem value={val} key={index}>
                    {val}
                  </ToggleGroupItem>
                ))}
              <PlusButton
                onClick={() =>
                  setShowedFilterLimit((prev) => prev + FILTER_LIMIT_STEP)
                }
                disabled={showedFilterLimit >= values.length}
              />
            </ToggleGroup>
          ) : (
            <ToggleGroup
              value={typeof toggleValue !== 'string' ? toggleValue : undefined}
              type='multiple'
              onValueChange={(value: string[]) => {
                setToggleValue(value)
                handleFilterChange(urlParam, value)
              }}
              className='flex flex-wrap justify-start'
            >
              {values
                ?.slice(0, showedFilterLimit)
                .map((val: string, index: number) => (
                  <ToggleGroupItem value={val} key={index}>
                    {val}
                  </ToggleGroupItem>
                ))}
              <PlusButton
                onClick={() => setShowedFilterLimit((prev) => prev + 4)}
                disabled={showedFilterLimit >= (values?.length ?? 100)}
              />
            </ToggleGroup>
          )}
        </div>
      )
    case 'range':
      return (
        <div className='bg-gray-50 p-6 rounded-lg'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-semibold mb-4'>{label}</h3>
            <button
              title='Limpiar'
              onClick={() => {
                handleCleanSlider()
              }}
              disabled={
                sliderValue[0] === sliderRange?.[0] &&
                sliderValue[1] === sliderRange?.[1]
              }
              className='disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <RefreshCcw size={16} />
            </button>
          </div>

          <Slider
            defaultValue={sliderRange ?? DEFAULT_SLIDER_VALUE}
            min={sliderRange?.[0] ?? 0}
            max={sliderRange?.[1] ?? 100000}
            step={50}
            value={sliderValue}
            onValueChange={(newValues) => {
              setSliderValue(newValues)
              handleSliderChange(newValues)
            }}
          />
          <div className='flex justify-between mt-3'>
            <span>
              {sliderValue[0]} {sliderCurrency}
            </span>
            <span>
              {sliderValue[1]} {sliderCurrency}
            </span>
          </div>
        </div>
      )
  }
}

function PlusButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      title='Mostrar más'
      className='hover:bg-blue-400 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={disabled}
      onClick={onClick}
    >
      <PlusIcon size={16} />
    </button>
  )
}
