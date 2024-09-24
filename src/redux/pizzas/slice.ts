import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAllPizzasApi } from '../../api/getPizzas';
import { SortTypeParams } from '../../components/Sort';
import { Pizza, PizzasSliceState, Status } from './types';


const initialState: PizzasSliceState = {
  status: Status.LOADING,
  items: []
}

export type FetchPizzasType = {
  sortType: SortTypeParams,
  categoryId: number,
  currentPage: number,
  searchValue: string,
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasType>(
  'users/fetchPizzasStatus',
  async ({sortType, categoryId, currentPage, searchValue }) => {
    return await getAllPizzasApi( {sortType, categoryId, currentPage, searchValue} )
  }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})


export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer