import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string | number
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('accessToken')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  return {
    user,
    accessToken: token,
    isAuthenticated: !!token,
    isLoading: false,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
      
      // Persist to localStorage
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
  },
})

export const { setCredentials, setLoading, logout, updateUser } = authSlice.actions
export default authSlice.reducer

