import { and, eq, ilike, inArray, sql } from 'drizzle-orm'
import { Filters } from './queries'
import { categories, products } from './schema'

export const combineConditions = (filters: Filters, categoryIds?: number[]) => {
  const conditions = []

  const { search } = filters

  if (search) {
    conditions.push(ilike(products.name, `%${search}%`))
  }
  if (categoryIds && categoryIds.length > 0) {
    conditions.push(inArray(products.categoryId, categoryIds))
  }

  return conditions.length ? and(...conditions) : undefined
}
