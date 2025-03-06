import {
  AnyPgColumn,
  boolean,
  integer,
  jsonb,
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
  basePrice: real('base_price').notNull(),
  stock: integer('stock').notNull(),
  minQuantity: integer('min_quantity').notNull(),
  images: text('images').array(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  featured: boolean('featured').default(false),
  latest_acquisition: boolean('latest_acquisition').default(false),
  specifications: jsonb('specifications'),
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

export const productOptions = pgTable('ProductOptions', {
  id: serial('id').primaryKey(),
  productId: integer('productId')
    .references(() => products.id)
    .notNull(),
  name: text('name').notNull(),
  values: text('values').array().notNull(),
  isRequired: boolean('is_required').notNull().default(false),
})

export const productVariants = pgTable('ProductVariants', {
  id: serial('id').primaryKey(),
  productId: integer('productId')
    .references(() => products.id)
    .notNull(),
  options: jsonb('options').notNull(),
  priceAdjustment: real('price_adjustment').notNull().default(0),
  stock: integer('stock').notNull(),
  sku: text('sku'),
})

export const priceBreaks = pgTable('PriceBreaks', {
  id: serial('id').primaryKey(),
  productId: integer('productId')
    .notNull()
    .references(() => products.id),
  variantId: integer('variantId').references(() => productVariants.id),
  minQuantity: integer('min_quantity').notNull(),
  maxQuantity: integer('max_quantity'),
  unitPrice: real('unit_price').notNull(),
})
