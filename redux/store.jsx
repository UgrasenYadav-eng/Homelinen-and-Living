// 🔹 REDUX STORE CONFIGURATION (ROOT LEVEL: /redux/store.js)
import { configureStore } from '@reduxjs/toolkit'

// 🔹 AUTH SLICE REDUCER
import authReducer from './slices/authSlice'

// 🔹 EXPORT STORE (USED BY <Providers />)
export const store = configureStore({
  reducer: {
    authStore: authReducer, // 🔑 MUST match: store.authStore.auth
  },
})
