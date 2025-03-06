import {
  categories,
  priceBreaks,
  productOptions,
  products,
  productVariants,
} from '@/db/schema'
import {
  eq,
  isNull,
  sql,
  getTableColumns,
  and,
  not,
  inArray,
} from 'drizzle-orm'
import { combineConditions } from './utils'
import { db } from '@/db'

//Product queries
export type Filters = {
  search?: string
  category?: string
  page?: number
  limit?: number
}

export async function getProducts(filters: Filters) {
  const { page = 1, category } = filters
  const PRODUCTS_PER_PAGE = filters.limit || 10
  const { updated_at, created_at, ...rest } = getTableColumns(products)

  let categoryIds: number[] | undefined = undefined

  if (category) {
    //  Resolve category ids
    const categoryQuery = Array.isArray(category)
      ? inArray(categories.name, category)
      : eq(categories.name, category)

    const categoryResults = await db
      .select({ id: categories.id })
      .from(categories)
      .where(categoryQuery)

    categoryIds = categoryResults.map((cat) => cat.id)
  }

  const combinedConditions = combineConditions(filters, categoryIds)

  try {
    const data = await db
      .select({
        ...rest,
        categoryName: categories.name,
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
  const { updated_at, created_at, featured, latest_acquisition, ...rest } =
    getTableColumns(products)
  try {
    return await db
      .select({
        categoryName: categories.name,
        ...rest,
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
  const { updated_at, created_at, featured, latest_acquisition, ...rest } =
    getTableColumns(products)

  try {
    return await db
      .select({
        categoryName: categories.name,
        ...rest,
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
  const { updated_at, created_at, featured, latest_acquisition, ...rest } =
    getTableColumns(products)

  try {
    const [product] = await db
      .select({
        ...rest,
        categoryName: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id))

    if (!product) {
      return null
    }

    const { productId, ...variantsRest } = getTableColumns(productVariants)

    const options = await db
      .select()
      .from(productOptions)
      .where(eq(productOptions.productId, id))

    const priceBreaksList = await db
      .select()
      .from(priceBreaks)
      .where(eq(priceBreaks.productId, id))
      .orderBy(priceBreaks.minQuantity)

    return {
      ...product,
      options,
      priceBreaks: priceBreaksList,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching product')
  }
}

export async function getRelatedProductsByCategory(
  categoryId: number,
  productId: number
) {
  const { updated_at, created_at, featured, latest_acquisition, ...rest } =
    getTableColumns(products)

  try {
    return await db
      .select({
        ...rest,
        categoryName: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(
        and(eq(categories.id, categoryId), not(eq(products.id, productId)))
      )
      .orderBy(products.name)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching category')
  }
}

//Category queries
export async function getMainCategories() {
  const { updated_at, created_at, parentId, featured, ...rest } =
    getTableColumns(categories)

  try {
    return await db
      .select({
        ...rest,
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
  const { updated_at, created_at, parentId, featured, ...rest } =
    getTableColumns(categories)

  const CATEGORIES_LIMIT = 4
  try {
    return await db
      .select({
        ...rest,
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
  const { updated_at, created_at, parentId, featured, ...rest } =
    getTableColumns(categories)

  try {
    const [category] = await db
      .select({
        ...rest,
      })
      .from(categories)
      .where(eq(categories.slug, slug))

    const subcategories = await db
      .select({
        ...rest,
      })
      .from(categories)
      .where(eq(categories.parentId, category.id))

    return { category, subcategories }
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching category')
  }
}

export async function getAllCategoriesNames() {
  try {
    return await db
      .select({
        name: categories.name,
        id: categories.id,
      })
      .from(categories)
      .orderBy(categories.name)
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching categories')
  }
}
