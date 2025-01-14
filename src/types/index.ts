export type Category = {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
  parentId?: number | null
  slug: string | null
}

export type Product = {
  id: number
  name: string
  description?: string | null
  price: number
  availableQuantity?: number | null
  minQuantity: number
  imageUrl?: string | null
  categoryName: string
  color?: string | null
  slug: string
}
