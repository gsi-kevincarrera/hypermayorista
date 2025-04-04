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
import { useCategories } from '@/contexts/categories/hook'
import HeaderLogo from './header-logo'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const {
    state: { categories },
  } = useCategories()
  const [showSearch, setShowSearch] = useState(false)
  const [value, setValue] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
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
          <Link href='/'>
            <HeaderLogo />
          </Link>
          {showSearch && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}
              className='hidden sm:flex flex-1 justify-center items-center space-x-2 mx-4'
            >
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
                  {categories.slice(0, 10).map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>Buscar</Button>
            </form>
          )}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className='flex items-center space-x-1'>
              <UserButton />
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='rounded-full'>
                    {dropdownOpen ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                    <span className='sr-only'>Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link href='/account'>Mi espacio personal</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
