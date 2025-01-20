export type Category = {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
  parentId?: number | null
  slug: string | null
}

//TODO Theres still a need to figure out how to manage product variants
type BaseProduct = {
  id: number
  name: string
  description?: string | null
  price: number //TODO This could change in a future to be prices, cause the price could change depending on the selected quantity
  stock?: number | null
  imageUrl?: string | null //TODO This should be an array of images
  color?: string | null //TODO This could be an array of colors
  categoryName: string
}

export type ProductInDB = BaseProduct & {
  minQuantity: number
}

export type ProductInCart = BaseProduct & {
  selectedQuantity: number | null
  total: number | null
}
