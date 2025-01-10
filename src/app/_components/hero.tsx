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

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {

    if (searchTerm) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchTerm
      )}`
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
        <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
          <Input
            type='text'
            placeholder='Search products...'
            className='w-full sm:w-64 text-black'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select>
            <SelectTrigger className='w-full sm:w-40 bg-white text-black'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleSearch}
            className='sm:w-auto bg-green-500 hover:bg-green-700'
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}
