import { categories, products } from '@/db/schema'
import { and, eq, ilike, isNull, sql } from 'drizzle-orm'
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
  const TOP_RANKED_PRODUCTS_LIMIT = 6
  try {
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
        color: products.color,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.featured, true))
      .limit(TOP_RANKED_PRODUCTS_LIMIT)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching products')
  }
}

export async function getLatestAcquisitons() {
  const LATEST_ACQUISITIONS_LIMIT = 10
  try {
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
        color: products.color,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.latest_acquisition, true))
      .limit(LATEST_ACQUISITIONS_LIMIT)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching products')
  }
}

export async function getProductById(id: number) {
  const [product] = await db
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
    .where(eq(products.id, id))

  if (!product) {
    return null
  }

  return product
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
        slug: categories.slug,
      })
      .from(categories)
      .where(isNull(categories.parentId))
      .orderBy(categories.name)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching categories')
  }
}

export async function getFeaturedCategories() {
  const CATEGORIES_LIMIT = 4
  try {
    return await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        slug: categories.slug,
        imageUrl: categories.imageUrl,
      })
      .from(categories)
      .where(eq(categories.featured, true))
      .orderBy(categories.name)
      .limit(CATEGORIES_LIMIT)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching categories')
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const [category] = await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        imageUrl: categories.imageUrl,
      })
      .from(categories)
      .where(eq(categories.slug, slug))

    const subcategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        imageUrl: categories.imageUrl,
        slug: categories.slug,
      })
      .from(categories)
      .where(eq(categories.parentId, category.id))

    return { category, subcategories }
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching category')
  }
}
