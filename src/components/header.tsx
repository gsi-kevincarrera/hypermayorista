'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { User } from 'lucide-react'
import { usePathname } from 'next/navigation'

const categories = [
  'All',
  'Electronics',
  'Apparel',
  'Home & Garden',
  'Beauty',
  'Automotive',
]

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        setShowSearch(rect.top <= 0)
      } else if (pathname !== '/') {
        setShowSearch(true)
      } else {
        setShowSearch(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <header className='fixed top-0 left-0 right-0 bg-white z-50 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <Link
            href='/'
            className='text-xl sm:text-2xl font-bold text-purple-800'
          >
            HyperMayorista
          </Link>
          {showSearch && (
            <div className='hidden sm:flex flex-1 justify-center items-center space-x-2 mx-4'>
              <Input
                type='text'
                placeholder='Buscar productos...'
                className='w-full max-w-xs'
              />
              <Select>
                <SelectTrigger className='w-40'>
                  <SelectValue placeholder='Categoría' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>Buscar</Button>
            </div>
          )}
          <Button variant='ghost' size='icon'>
            <User className='h-5 w-5' />
          </Button>
        </div>
        {showSearch && (
          <div className='sm:hidden py-2 flex items-center space-x-2'>
            <Input
              type='text'
              placeholder='Buscar productos...'
              className='w-full'
            />
            <Select>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='Categoría' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Buscar</Button>
          </div>
        )}
      </div>
    </header>
  )
}
