import Image from 'next/image'

export default function CategoryHero({categoryName}: {categoryName: string}) {
  return (
    <div className='relative h-[400px] flex items-center justify-center'>
      <Image
        src='/banner.webp'
        alt='Categories banner'
        fill
        className='object-cover brightness-50'
        priority
      />
      <div className='relative z-10 text-center text-white'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-4'>{categoryName}</h1>
        <p className='text-xl'>Descubre productos nuevos y en tendencia</p>
      </div>
    </div>
  )
}
