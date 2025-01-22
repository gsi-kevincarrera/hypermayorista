import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getCategoryBySlug } from '@/db/queries'
import CategoryHero from './_components/category-hero'
import SubcategoriesList from './_components/subcategories-list'
import { getProductsByCategory } from '@/db/actions'
import CategoriesGallery from './_components/categories-gallery'
import { cn } from '@/lib/utils'
import { ProductInDB } from '@/types'

interface CategoryProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryProps) {
  const _params = await params
  const { category, subcategories } = await getCategoryBySlug(_params.slug)
  const { data, total } = await getProductsByCategory(category.id, 0)

  return (
    <div className='min-h-screen'>
      <CategoryHero categoryName={category.name} />
      {subcategories.length > 0 && (
        <SubcategoriesList subcategories={subcategories} />
      )}
      <div
        className={cn(
          'bg-gray-50 px-16 py-6 rounded-lg w-full mt-7 relative ',
          { 'min-h-[800px]': total > 5, 'min-h-[450px]': total <= 5 }
        )}
      >
        <CategoriesGallery initialProducts={data} total={total} />
      </div>
    </div>
  )
}
