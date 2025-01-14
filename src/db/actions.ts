'use server'

import { eq, and, sql } from 'drizzle-orm'
import { db } from '.'
import { products, categories } from './schema'

export async function getNonSpecialProducts(
  offset: number,
  limit: number = 15
) {
  try {
    const data = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        description: products.description,
        categoryName: categories.name,
        minQuantity: products.minQuantity,
        availableQuantity: products.availableQuantity,
        color: products.color,
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

    return { data, total: dataCount.count}
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching products')
  }
}
