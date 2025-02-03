'use client'
import { createContext, useReducer } from 'react'
import { CategoriesAction, categoriesReducer, CategoriesState } from './reducer'

type Category = {
  name: string
  id: number
}

// Initial state
const initialState: CategoriesState = {
  categories: [],
  loading: false,
}

// Context type
interface CategoriesContextType {
  state: CategoriesState
  dispatch: React.Dispatch<CategoriesAction>
}

// Creating the context
export const CategoriesContext = createContext<CategoriesContextType>({
  state: initialState,
  dispatch: () => {},
})

//Context Provider
const CategoriesProvider = ({
  children,
  initialCategories,
}: {
  children: React.ReactNode
  initialCategories: Category[]
}) => {
  const [state, dispatch] = useReducer(categoriesReducer, {
    ...initialState,
    categories: initialCategories, // Set initial categories
  })
  return (
    <CategoriesContext value={{ state, dispatch }}>
      {children}
    </CategoriesContext>
  )
}

export default CategoriesProvider
