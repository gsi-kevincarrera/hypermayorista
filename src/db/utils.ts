import { and, eq, ilike } from 'drizzle-orm'
import { Filters } from './queries'
import { categories, products } from './schema'

export const combineConditions = (filters: Filters) => {
  const conditions = []

  const { category, search } = filters

  if (search) {
    conditions.push(ilike(products.name, `%${category}%`))
  }
  if (category) {
    conditions.push(eq(categories.name, category))
  }

  return conditions.length ? and(...conditions) : undefined
}
