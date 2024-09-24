import { configureStore } from '@reduxjs/toolkit'
import filters from './filter/slice'
import cart from './cart/slice'
import pizzas from './pizzas/slice'
import lounges from './lounges/slice'
import users from './users/slice'

import { useDispatch } from 'react-redux'
export const store = configureStore({
  reducer: {
    filters,
    cart,
    pizzas,
    lounges,
    users,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 