import { createContext, useReducer } from 'react'
import { CategoriesAction, categoriesReducer, CategoriesState } from './reducer'

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
export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(categoriesReducer, initialState)
  return (
    <CategoriesContext value={{ state, dispatch }}>
      {children}
    </CategoriesContext>
  )
}
