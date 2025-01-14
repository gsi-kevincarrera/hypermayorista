import { categories, products } from '@/db/schema'
import { eq, ilike, isNull, sql } from 'drizzle-orm'
import { combineConditions } from './utils'
import { db } from '@/db'

//Product queries
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
        categoryName: categories.name,
        minQuantity: products.minQuantity,
        availableQuantity: products.availableQuantity,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(combinedConditions)
      .limit(PRODUCTS_PER_PAGE)
      .offset((Number(page) - 1) * PRODUCTS_PER_PAGE)

    const [dataCount] = await db
      .select({
        count: sql`count(*)`.mapWith(Number),
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
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
      categoryName: categories.name,
      minQuantity: products.minQuantity,
      availableQuantity: products.availableQuantity,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
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
      categoryName: categories.name,
      minQuantity: products.minQuantity,
      availableQuantity: products.availableQuantity,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .limit(3)
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

//Category queries

export async function getMainCategories() {
  try {
    return await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        imageUrl: categories.imageUrl,
      })
      .from(categories)
      .where(isNull(categories.parentId))
      .orderBy(categories.name)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching categories')
  }
}