'use server'

import { eq, and, sql, getTableColumns } from 'drizzle-orm'
import { db } from '.'
import { products, categories } from './schema'

export async function getNonSpecialProducts(
  offset: number,
  limit: number = 15
) {
  const { updated_at, created_at, featured, latest_acquisition, ...rest } =
    getTableColumns(products)
  try {
    const data = await db
      .select({
        ...rest,
        categoryName: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(
        and(
          eq(products.featured, false),
          eq(products.latest_acquisition, false)
        )
      )
      .limit(limit)
      .offset(offset)

    const [dataCount] = await db
      .select({
        count: sql`count(*)`.mapWith(Number),
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(
        and(
          eq(products.featured, false),
          eq(products.latest_acquisition, false)
        )
      )

    return { data, total: dataCount.count }
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching products')
  }
}

export async function getProductsByCategory(
  categoryId: number,
  offset: number,
  limit: number = 15
) {
  const { updated_at, created_at, featured, latest_acquisition, ...rest } =
    getTableColumns(products)
  try {
    const data = await db
      .select({
        ...rest,
        categoryName: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(categories.id, categoryId))
      .limit(limit)
      .offset(offset)

    const [dataCount] = await db
      .select({
        count: sql`count(*)`.mapWith(Number),
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(categories.id, categoryId))

    return { data, total: dataCount.count }
  } catch (error) {
    console.log(error)
    throw error
  }
}
