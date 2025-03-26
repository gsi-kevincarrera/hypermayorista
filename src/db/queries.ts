'use server'
//TO-DO investigate potential issues with the uer of 'use server', cause importing this queries on a client file means it will become an endpoint the user could hit, so maybe theres the need to re-verify if the user is authenticated on every query to avoid security vulnerabilities. But maybe the clerk middleware take care of it.
import {
  categories,
  contracts,
  priceBreaks,
  productOptions,
  products,
  productVariants,
  cartItems,
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
import { ProductInCart } from '@/types'
import { auth } from '@clerk/nextjs/server'

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
  productId: number,
  limit: number = 6
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
      .limit(limit)
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

export async function getContractByUserId() {
  const CONTRACT_REASON = {
    UNAUTHORIZED: 'No Autorizado',
    NOT_FOUND: 'No Encontrado',
  }

  const { userId } = await auth()
  if (!userId) {
    return { status: 'none', reason: CONTRACT_REASON.UNAUTHORIZED }
  }

  try {
    const [contract] = await db
      .select()
      .from(contracts)
      .where(and(eq(contracts.userId, userId), eq(contracts.isActive, true)))
    if (!contract) {
      return { status: 'none', reason: CONTRACT_REASON.NOT_FOUND }
    }
    return contract
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching contract')
  }
}

//Cart queries
export async function getUserCart(userId: string) {
  try {
    const items = await db
      .select({
        id: cartItems.id,
        productId: cartItems.productId,
        variantId: cartItems.variantId,
        variantInfo: cartItems.variantInfo,
        quantity: cartItems.quantity,
        unitPrice: cartItems.unitPrice,
        isSelected: cartItems.isSelected,
        name: products.name,
        images: products.images,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))
      .orderBy(cartItems.createdAt)

    // Transform to ProductInCart format
    return items.map(
      (item) =>
        ({
          id: item.productId,
          variantId: item.variantId,
          name: item.name,
          mainImageUrl:
            item.images && item.images.length > 0 ? item.images[0] : null,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
          isSelected: item.isSelected,
          variantInfo: item.variantInfo,
        } as ProductInCart)
    )
  } catch (error) {
    console.error('Error fetching user cart:', error)
    throw new Error('Error fetching user cart')
  }
}

export async function addToCartDb(
  userId: string,
  item: {
    productId: number
    variantId?: number | null
    variantInfo?: string | null
    quantity: number
    unitPrice: number
    productToUpdate?: boolean
  }
) {
  try {
    if (item.productToUpdate) {
      // If we already know it exists, we only update the quantity
      await db
        .update(cartItems)
        .set({ quantity: sql`${cartItems.quantity} + ${item.quantity}` })
        .where(
          and(
            eq(cartItems.userId, userId),
            eq(cartItems.productId, item.productId),
            item.variantId
              ? eq(cartItems.variantId, item.variantId)
              : isNull(cartItems.variantId)
          )
        )
    } else {
      // Insert the new product
      await db.insert(cartItems).values({
        userId,
        productId: item.productId,
        variantId: item.variantId || null,
        variantInfo: item.variantInfo || null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        isSelected: true,
      })
    }

    return true
  } catch (error) {
    console.error('Error updating/inserting item in cart:', error)
    throw new Error('Error updating/inserting item in cart')
  }
}

export async function removeFromCartDb(
  userId: string,
  productId: number,
  variantId?: number | null
) {
  try {
    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.userId, userId),
          eq(cartItems.productId, productId),
          variantId
            ? eq(cartItems.variantId, variantId)
            : isNull(cartItems.variantId)
        )
      )

    return true
  } catch (error) {
    console.error('Error removing item from cart:', error)
    throw new Error('Error removing item from cart')
  }
}

export async function updateCartItemSelectionDb(
  userId: string,
  productId: number,
  isSelected: boolean,
  variantId?: number | null
) {
  try {
    await db
      .update(cartItems)
      .set({ isSelected })
      .where(
        and(
          eq(cartItems.userId, userId),
          eq(cartItems.productId, productId),
          variantId
            ? eq(cartItems.variantId, variantId)
            : isNull(cartItems.variantId)
        )
      )

    return true
  } catch (error) {
    console.error('Error updating cart item selection:', error)
    throw new Error('Error updating cart item selection')
  }
}

export async function syncCartWithDb(
  userId: string,
  cartItems: ProductInCart[]
) {
  try {
    // First, get current cart from DB
    const dbCart = await getUserCart(userId)

    // Create a map of DB items for easy lookup
    const dbItemMap = new Map(
      dbCart.map((item) => [`${item.id}-${item.variantId || 'null'}`, item])
    )

    // Create a map of local items for easy lookup
    const localItemMap = new Map(
      cartItems.map((item) => [`${item.id}-${item.variantId || 'null'}`, item])
    )

    // Items to add to DB (in local but not in DB)
    const itemsToAdd = cartItems.filter(
      (item) => !dbItemMap.has(`${item.id}-${item.variantId || 'null'}`)
    )

    // Items to remove from DB (in DB but not in local)
    const itemsToRemove = dbCart.filter(
      (item) => !localItemMap.has(`${item.id}-${item.variantId || 'null'}`)
    )

    // Items that might need selection state update
    const itemsToUpdate = cartItems.filter((localItem) => {
      const key = `${localItem.id}-${localItem.variantId || 'null'}`
      const dbItem = dbItemMap.get(key)
      return dbItem && dbItem.isSelected !== localItem.isSelected
    })

    // Perform batch operations
    const addPromises = itemsToAdd.map((item) =>
      addToCartDb(userId, {
        productId: item.id,
        variantId: item.variantId,
        variantInfo: item.variantInfo,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })
    )

    const removePromises = itemsToRemove.map((item) =>
      removeFromCartDb(userId, item.id, item.variantId)
    )

    const updatePromises = itemsToUpdate.map((item) =>
      updateCartItemSelectionDb(
        userId,
        item.id,
        item.isSelected,
        item.variantId
      )
    )

    await Promise.all([...addPromises, ...removePromises, ...updatePromises])

    return true
  } catch (error) {
    console.error('Error syncing cart with database:', error)
    throw new Error('Error syncing cart with database')
  }
}

export async function clearCartDb(userId: string) {
  try {
    await db.delete(cartItems).where(eq(cartItems.userId, userId))

    return true
  } catch (error) {
    console.error('Error clearing cart:', error)
    throw new Error('Error clearing cart')
  }
}
