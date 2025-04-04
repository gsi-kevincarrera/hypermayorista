'use server'

import { eq, and, sql, getTableColumns } from 'drizzle-orm'
import { db } from '.'
import {
  products,
  categories,
  productVariants,
  priceBreaks,
  contracts,
} from './schema'
import { PriceBreak } from '@/types'
import { auth } from '@clerk/nextjs/server'

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
    console.error(error)
    throw error
  }
}

export async function getVariantByOptions(
  productId: number,
  options: Record<string, string>
) {
  try {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(
        and(
          eq(productVariants.productId, productId),
          eq(productVariants.options, options)
        )
      )
      .limit(1)

    return variant
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching variant')
  }
}

//This could change in the future to support price breaks based on variants, but for now, there are just general price breaks
export async function getProductPriceBreaks(productId: number) {
  try {
    const data = await db
      .select()
      .from(priceBreaks)
      .where(eq(priceBreaks.productId, productId))

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching price breaks')
  }
}

export async function calculatePrice(
  productId: number,
  quantity: number,
  priceBreaks?: PriceBreak[],
  variantId?: number | null
) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized: User not authenticated')
  }

  try {
    let basePrice = 0
    let priceAdjustment = 0

    //Get the product base price
    const [product] = await db
      .select({ basePrice: products.basePrice })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1)

    basePrice = product.basePrice

    //Get the price adjustment if there is a variant
    if (variantId) {
      const [variant] = await db
        .select({ priceAdjustment: productVariants.priceAdjustment })
        .from(productVariants)
        .where(eq(productVariants.id, variantId))
        .limit(1)

      priceAdjustment = variant.priceAdjustment
    }

    let unitPrice = basePrice + priceAdjustment
    let currentPriceBreakLimits
    let priceBreaksList =
      priceBreaks ?? (await getProductPriceBreaks(productId))

    for (const priceBreak of priceBreaksList) {
      if (
        quantity >= priceBreak.minQuantity &&
        (priceBreak.maxQuantity === null ||
          quantity <= (priceBreak.maxQuantity ?? Infinity))
      ) {
        unitPrice = priceBreak.unitPrice + priceAdjustment
        currentPriceBreakLimits = {
          minQuantity: priceBreak.minQuantity,
          maxQuantity: priceBreak.maxQuantity ?? Infinity,
        }
        break
      }
    }

    return {
      unitPrice,
      totalPrice: unitPrice * quantity,
      currentPriceBreakLimits,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error calculating price')
  }
}

export async function saveContract(filePath: string, userId: string | null) {
  if (!userId) {
    throw new Error('Unauthorized: User not authenticated')
  }

  try {
    // Insert the contract into the database
    const [result] = await db
      .insert(contracts)
      .values({
        userId,
        filePath,
        status: 'pending',
      })
      .returning({ id: contracts.id })

    return { success: true, contractId: result.id }
  } catch (error) {
    return {
      success: false,
      error: 'Error al guardar el contrato',
    }
  }
}

export async function deactivatePreviousContracts(
  userId: string | null | undefined
) {
  if (!userId) {
    throw new Error('Unauthorized: User not authenticated')
  }

  try {
    // Update all previous contracts to inactive
    await db
      .update(contracts)
      .set({ isActive: false })
      .where(and(eq(contracts.userId, userId), eq(contracts.isActive, true)))

    return { success: true }
  } catch (error) {
    console.error('Error deactivating previous contracts:', error)
    return {
      success: false,
      error: 'Error al actualizar contratos anteriores',
    }
  }
}
