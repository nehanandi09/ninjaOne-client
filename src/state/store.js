import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { deviceApi } from './services/device'

/**
 * Configure the Redux store with the deviceApi reducer and middleware.
 */
export const store = configureStore({
  reducer: {
    [deviceApi.reducerPath]: deviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deviceApi.middleware),
})

setupListeners(store.dispatch)