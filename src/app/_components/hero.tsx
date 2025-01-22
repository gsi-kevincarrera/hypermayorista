'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  'All',
  'Electronics',
  'Apparel',
  'Home & Garden',
  'Beauty',
  'Automotive',
]

export default function Hero({
  categories,
}: {
  categories: { name: string; id: number }[]
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const handleSearch = () => {
    if (searchTerm || category) {
      window.location.href = `/products?${
        searchTerm && `search=${encodeURIComponent(searchTerm)}`
      }${category ? `&category=${encodeURIComponent(category)}` : ''}`
    }
  }
  return (
    <section className='relative min-h-[600px] flex items-center justify-center text-white hero-pattern'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className='absolute inset-0 bg-purple-900/70' />
      </div>
      <div className='relative z-10 text-center space-y-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
          Revoluciona tu comercio mayorista
        </h1>
        <p className='text-xl sm:text-2xl md:text-3xl'>
          Conéctate con los mejores proveedores y encuentra las mejores ofertas
          en un solo lugar
        </p>
        <div
          className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4'
          id='hero'
        >
          <Input
            type='text'
            placeholder='Buscar productos...'
            className='w-full sm:w-64 text-black'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select onValueChange={(cat) => setCategory(cat)}>
            <SelectTrigger className='w-full sm:w-40 bg-white text-black'>
              <SelectValue placeholder='Categoría' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleSearch}
            className='sm:w-auto bg-green-500 hover:bg-green-700'
          >
            Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}
