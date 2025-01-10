import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Facebook,
  Twitter,
  LinkedinIcon as LinkedIn,
  Instagram,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>About B2B Trade</h3>
            <p className='text-gray-400'>
              Empowering businesses worldwide with innovative wholesale
              solutions.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <p className='text-gray-400'>
              1234 Trade Street, Business City, 56789
            </p>
            <p className='text-gray-400'>Email: info@b2btrade.com</p>
            <p className='text-gray-400'>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Newsletter</h3>
            <p className='text-gray-400 mb-2'>
              Stay updated with our latest offers
            </p>
            <div className='flex space-x-2'>
              <Input
                type='email'
                placeholder='Your email'
                className='bg-gray-800 border-gray-700'
              />
              <Button variant='secondary'>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>
            &copy; 2023 B2B Trade. All rights reserved.
          </p>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <Link
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <Facebook size={20} />
            </Link>
            <Link
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <Twitter size={20} />
            </Link>
            <Link
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <LinkedIn size={20} />
            </Link>
            <Link
              href='#'
              className='text-gray-400 hover:text-white transition-colors'
            >
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
