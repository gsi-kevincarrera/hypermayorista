import {
  AnyPgColumn,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const products = pgTable('Products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: real('price').notNull(),
  availableQuantity: integer('available_quantity').notNull(),
  minQuantity: integer('min_quantity').notNull(),
  imageUrl: varchar('image_url', { length: 255 }),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(()=> new Date()),
})

export const categories = pgTable('Categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: varchar('imageUrl', { length: 255 }),
  parentId: integer('parentId').references((): AnyPgColumn => categories.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})
