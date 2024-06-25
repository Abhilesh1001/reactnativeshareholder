import { configureStore } from '@reduxjs/toolkit'


import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { counterSlice } from '../redux/slice'

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    counter: counterSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})


setupListeners(store.dispatch)