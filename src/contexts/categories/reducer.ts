// Action types
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_LOADING = 'SET_LOADING'

type Category = {
  name: string
  id: number
}

interface SetCategoriesAction {
  type: typeof SET_CATEGORIES
  payload: Category[]
}

interface SetLoadingAction {
  type: typeof SET_LOADING
}

export type CategoriesAction = SetCategoriesAction | SetLoadingAction

// State Type
export interface CategoriesState {
  categories: Category[]
  loading: boolean
}

// Reducer
export const categoriesReducer = (
  state: CategoriesState,
  action: CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload, loading: false }
    case SET_LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}

// Actions
export const setCategoriesAction = (
  dispatch: React.Dispatch<CategoriesAction>,
  categories: Category[]
) => {
  dispatch({ type: SET_CATEGORIES, payload: categories })
}

export const setCategoriesLoadingAction = (
  dispatch: React.Dispatch<CategoriesAction>
) => {
  dispatch({ type: SET_LOADING })
}
