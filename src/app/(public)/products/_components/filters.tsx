import { Filters as FiltersType, getAllCategoriesNames } from '@/db/queries'
import FilterCard from './filter-card'

export default async function Filters({ filters }: { filters: FiltersType }) {
  const [categories] = await Promise.all([getAllCategoriesNames()])
  return (
    <>
      <FilterCard
        label='Buscar'
        currentValue={filters.search?.trim() ?? ''}
        type='search'
        urlParam='search'
      />

      <FilterCard
        label='Categoría'
        currentValue={filters.category}
        type='toggle'
        values={categories.map((c) => c.name)}
        urlParam='category'
        toggleSelectionType='multiple'
      />
    </>
  )
}
