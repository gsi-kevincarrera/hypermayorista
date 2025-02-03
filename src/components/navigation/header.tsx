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
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Header({
  categories,
}: {
  categories: { name: string; id: number }[]
}) {
  const [showSearch, setShowSearch] = useState(false)
  const [value, setValue] = useState('')
  const [category, setCategory] = useState<string | null>(null)
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

  const handleSearch = () => {
    if (value || category) {
      window.location.href = `/products?${
        value && `search=${encodeURIComponent(value)}`
      }${category ? `&category=${encodeURIComponent(category)}` : ''}`
    }
  }

  return (
    <header className='fixed top-0 left-0 right-0 bg-white z-50 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <Link
            href='/'
            className='text-xl sm:text-2xl font-bold text-purple-800'
          >
            <div className='flex items-center space-x-3'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 20 20'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-purple-600'
              >
                <path d='M13 2L11 12h6L9 22l2-10H7z'></path>
              </svg>

              <div className='font-bold text-4xl text-purple-600'>
                Hyper<span className='text-gray-700'>.Mayorista</span>
              </div>
            </div>
          </Link>
          {showSearch && (
            <div className='hidden sm:flex flex-1 justify-center items-center space-x-2 mx-4'>
              <Input
                type='text'
                placeholder='Buscar productos...'
                className='w-full max-w-xs'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Select onValueChange={(cat) => setCategory(cat)}>
                <SelectTrigger className='w-40'>
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
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
          )}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
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
