import { db } from '@/../drizzle.config'
import { productsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getAllProducts() {
  return await db.select().from(productsTable)
}

export async function getProductById(id: number) {
  const product = await db.select().from(productsTable).where(eq(productsTable.id, id))

  if (product.length === 0) {
    return null
  }

  return product[0]
}

export async function insertProducts(products: typeof productsTable.$inferInsert[]) {
  await db.insert(productsTable).values(products)
}