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
  addresses,
} from '@/db/schema'
import {
  eq,
  isNull,
  sql,
  getTableColumns,
  and,
  not,
  inArray,
  desc,
} from 'drizzle-orm'
import { combineConditions } from './utils'
import { db } from '@/db'
import { Address, ProductInCart } from '@/types'
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

//Addresses

export type AddAddressInput = Omit<
  typeof addresses.$inferInsert,
  'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isDefault'
>

export async function addAddressDb(addressData: AddAddressInput): Promise<{
  success: boolean
  data: Address | null
  code: number
  message: string | null
}> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, message: 'Unauthorized', code: 401, data: null }
    }

    const [newAddress] = await db
      .insert(addresses)
      .values({
        ...addressData,
        userId: userId, // Set userId from auth
        isDefault: false, // New addresses are not default
      })
      .returning()

    if (!newAddress) {
      return {
        success: false,
        message: 'Failed to create address',
        code: 500,
        data: null,
      }
    }

    return {
      success: true,
      data: newAddress,
      code: 201,
      message: 'Address added successfully',
    }
  } catch (error) {
    console.error('Database error adding address:', error)
    return {
      success: false,
      message: 'Database error',
      code: 500,
      data: null,
    }
  }
}

export type UpdateAddressInput = Omit<
  typeof addresses.$inferInsert,
  'createdAt' | 'updatedAt' | 'isDefault' // isDefault handled by setDefaultAddressDb
> & { id: number; userId: string } // Explicitly require id and userId

export async function updateAddressDb(
  addressData: UpdateAddressInput
): Promise<{
  success: boolean
  data: Address | null
  code: number
  message: string | null
}> {
  try {
    const { userId: authUserId } = await auth()
    if (!authUserId) {
      return { success: false, message: 'Unauthorized', code: 401, data: null }
    }

    // Ensure the user is updating their own address
    if (addressData.userId !== authUserId) {
      return {
        success: false,
        message: 'Forbidden: Cannot update the address',
        code: 403,
        data: null,
      }
    }

    const [updatedAddress] = await db
      .update(addresses)
      .set({
        fullName: addressData.fullName,
        address: addressData.address,
        province: addressData.province,
        municipality: addressData.municipality,
        phone: addressData.phone,
        additionalInfo: addressData.additionalInfo,
        updatedAt: new Date(), // Update the timestamp
      })
      .where(
        and(eq(addresses.id, addressData.id), eq(addresses.userId, authUserId)) // Use addressData.id here
      )
      .returning()

    if (!updatedAddress) {
      return {
        success: false,
        message: 'Address not found or update failed',
        code: 404,
        data: null,
      }
    }
    return {
      success: true,
      data: updatedAddress,
      message: 'Address updated successfully',
      code: 200,
    }
  } catch (error) {
    console.error('Database error updating address:', error)
    return {
      success: false,
      message: 'Database error',
      code: 500,
      data: null,
    }
  }
}

export async function deleteAddressDb(id: number) {
  const { userId } = await auth() //This adds an additional security layer
  if (!userId) {
    return { success: false, data: null, code: 401, message: 'Unauthorized' }
  }

  try {
    const [result] = await db.delete(addresses).where(eq(addresses.id, id))

    return { success: true, data: result, code: 200, message: null }
  } catch (error) {
    console.error('Error deleting address:', error)
    return {
      success: false,
      message: 'Error deleting address',
      code: 500,
      data: null,
    }
  }
}

export async function setDefaultAddressDb(id: number) {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, data: null, code: 401, message: 'Unauthorized' }
  }

  try {
    // Use a transaction to ensure atomicity
    const result = await db.transaction(async (tx) => {
      // Unset current default address for the user
      await tx
        .update(addresses)
        .set({ isDefault: false, updatedAt: new Date() })
        .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)))

      // Set the new default address
      const [updated] = await tx
        .update(addresses)
        .set({ isDefault: true, updatedAt: new Date() })
        .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
        .returning()

      if (!updated) {
        throw new Error('Address not found or update failed')
      }
      return updated // Return the updated address
    })

    return {
      success: true,
      data: result,
      code: 200,
      message: 'Default address updated',
    }
  } catch (error) {
    console.error('Error setting default address:', error)
    return {
      success: false,
      message: 'Error setting default address',
      code: 500,
      data: null,
    }
  }
}

export async function getUserAddresses(userId: string) {
  const { userId: id } = await auth() //This adds an additional security layer
  if (!id || !userId)
    return { success: false, message: 'Unauthorized', code: 401, data: null }

  try {
    const addressesList = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, id))
      .orderBy(desc(addresses.isDefault))
    return { success: true, data: addressesList, code: 200, message: null }
  } catch (error) {
    console.error('Error getting user addresses:', error)
    return {
      success: false,
      message: 'Error getting user addresses',
      code: 500,
      data: null,
    }
  }
}
