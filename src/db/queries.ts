import { db } from '@/../drizzle.config'
import { productsTable } from '@/db/schema'

export async function getAllProducts() {
  const products = await db.select().from(productsTable)
  return products
}

export async function insertProducts(products: typeof productsTable.$inferInsert[]) {
  await db.insert(productsTable).values(products)
}