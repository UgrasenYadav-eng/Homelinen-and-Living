import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: null, // ✅ MUST exist
}

const authSlice = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload
    },
    logout: (state) => {
      state.auth = null
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
