import { db } from '@/../drizzle.config'
import { products } from '@/db/schema'
import { eq, ilike, sql } from 'drizzle-orm'
import { combineConditions } from './utils'

export type Filters = {
  search?: string
  category?: string
  page?: number
}

export async function getProducts(filters: Filters) {
  const combinedConditions = combineConditions(filters)
  const { page = 1 } = filters
  const PRODUCTS_PER_PAGE = 10

  try {
    const data = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        description: products.description,
        category: products.category,
      })
      .from(products)
      .where(combinedConditions)
      .limit(PRODUCTS_PER_PAGE)
      .offset((Number(page) - 1) * PRODUCTS_PER_PAGE)

    const [dataCount] = await db
      .select({
        count: sql`count(*)`.mapWith(Number),
      })
      .from(products)
      .where(combinedConditions)

    return { data, total: dataCount.count, perPage: PRODUCTS_PER_PAGE }
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching products')
  }
}

export async function getTopRankedProducts() {
  return await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      imageUrl: products.imageUrl,
      description: products.description,
      category: products.category,
    })
    .from(products)
    .limit(5)
}

export async function getLatestAcquisitons() {
  return await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      imageUrl: products.imageUrl,
      description: products.description,
      category: products.category,
    })
    .from(products)
    .limit(5)
}

export async function getProductById(id: number) {
  const [product] = await db.select().from(products).where(eq(products.id, id))

  if (!product) {
    return null
  }

  return product
}

export async function getProductsByName(name: string) {
  return await db.select().from(products).where(ilike(products.name, name))
}
