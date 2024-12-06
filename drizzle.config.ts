import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

export const db = drizzle(pool)