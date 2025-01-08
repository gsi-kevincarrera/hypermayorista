'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function AppPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const searchParams = useSearchParams()

  const buildUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', page.toString())
      return `/?${params.toString()}`
    },
    [searchParams]
  )
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={buildUrl(currentPage - 1)} />
            </PaginationItem>

            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={buildUrl(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href={buildUrl(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={buildUrl(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>

            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href={buildUrl(currentPage + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
