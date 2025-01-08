import { decimal, integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
  category: varchar({ length: 255 }).default('no_category'),
})
