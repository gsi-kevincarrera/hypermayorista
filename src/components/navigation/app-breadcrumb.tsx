import { Home } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

type BreadcrumbItem = {
  name: string
  href: string
  icon?: React.ReactNode
}

interface Props {
  items: BreadcrumbItem[]
}

export default function AppBreadcrumb({ items }: Props) {
  return (
    <Breadcrumb className='px-4 py-3'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/' className='flex items-center gap-2'>
            <Home />
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              href={item.href}
              className='flex items-center gap-2'
            >
              {item.icon}
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
