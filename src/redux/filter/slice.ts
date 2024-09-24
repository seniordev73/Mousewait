import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, SortType } from './types'


const initialState:FilterSliceState= {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "popular", sortProperty: "rating"
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action:PayloadAction<SortType>) => {
      state.sortType = action.payload
    },
    setCurrentPage: (state, action:PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action:PayloadAction<FilterSliceState>) => {
      state.sortType = action.payload.sortType
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    }
  },
})


export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer