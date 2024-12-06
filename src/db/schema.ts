import { decimal, integer, pgTable, varchar, } from 'drizzle-orm/pg-core'

// export const usersTable = pgTable('users', {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// })

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
})