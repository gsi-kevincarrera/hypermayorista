// import 'dotenv/config'
// import { drizzle } from 'drizzle-orm/node-postgres'

// const db = drizzle(process.env.DATABASE_URL!)

// import 'dotenv/config'
// import { eq } from 'drizzle-orm'
// import { productsTable } from '@/db/schema'

//   const products: (typeof productsTable.$inferInsert)[] = [
//     {
//       name: 'Gallo Espaguettini al huevo 250g',
//       price: '190.00',
//       description:
//         'Pasta italiana con una textura suave y sedosa. Se cocina en pocos minutos y es ideal para acompañar con salsas ligeras y frescas.',
//       imageUrl: '/natilla.webp',
//     },
//     {
//       name: 'Vodka Borjska Bianca 70cl',
//       price: '1,600.00',
//       description:
//         'Vodka puro y frío para saborear en plenitud o en cócteles armoniosos. Botella 70 cl.',
//       imageUrl: '/natilla.webp',
//     },
//     {
//       name: 'Natilla Chocolate Promolac 1kg',
//       price: '2,114.14',
//       description:
//         'Disfruta del sabor rico y cremoso de la Natilla de Chocolate Promolac. Hecha con el mejor chocolate de calidad.',
//       imageUrl: '/natilla.webp',
//     },
//     {
//       name: 'Vinagre de Miel y Frutas Tropicales 1L',
//       price: '430.00',
//       description: 'Sabor tropical con beneficios para tu bienestar.',
//       imageUrl: '/natilla.webp',
//     },
//     {
//       name: 'Vino de Miel y Jengibre 750ml',
//       price: '614.00',
//       description: 'La energía y vitalidad del jengibre en cada copa.',
//       imageUrl: '/natilla.webp',
//     },
//     {
//       name: 'Vino de Miel y Jengibre 750ml',
//       price: '614.00',
//       description: 'La energía y vitalidad del jengibre en cada copa.',
//       imageUrl: '/natilla.webp',
//     },
//     {
//       name: 'Vino de Miel y Jengibre 750ml',
//       price: '614.00',
//       description: 'La energía y vitalidad del jengibre en cada copa.',
//       imageUrl: '/natilla.webp',
//     },
//   ]

// export async function insertAndGetAll() {

//   // await db.insert(productsTable).values(products)
//   // console.log('Products Added')

//   const productsList = await db.select().from(productsTable)
//   console.log('Getting all users from the database: ', productsList)

//   return productsList

//   // await db
//   //   .update(productsTable)
//   //   .set({description: 'Nueva descripción'})
//   //   .where(eq(productsTable.name, 'Vino de Miel y Jengibre 750ml'))

//   // await db
//   //   .delete(productsTable)
//   //   .where(eq(productsTable.name, 'Vino de Miel y Jengibre 750ml'))
//   // console.log('User deleted!')
// }

// // main()
