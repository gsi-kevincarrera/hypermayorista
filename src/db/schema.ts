import {
  AnyPgColumn,
  boolean,
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
  imageUrl: varchar('image_url'),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  color: varchar('color'),
  featured: boolean('featured').default(false),
  latest_acquisition: boolean('latest_acquisition').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const categories = pgTable('Categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: varchar('imageUrl'),
  parentId: integer('parentId').references((): AnyPgColumn => categories.id),
  featured: boolean('featured').default(false),
  slug: varchar('slug'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})
