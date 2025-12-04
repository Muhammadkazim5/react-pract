import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { login, register, logout as logoutApi } from '../api/auth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCredentials, logout as logoutAction, setLoading } from '../store/slices/authSlice'
import { updateToken } from '../utils/https'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  statusCode?: number
  message: string
  data?: {
    id: number | string
    name: string
    email: string
    accessToken?: string
    token?: string
  }
}

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onMutate: () => {
      dispatch(setLoading(true))
    },
    onSuccess: (response: AuthResponse) => {
      const data = response.data
      
      if (data) {
        const user = {
          id: data.id,
          name: data.name,
          email: data.email,
        }
        const accessToken = data.accessToken || data.token || ''
        
        if (accessToken) {
          updateToken(accessToken)
        }
        dispatch(setCredentials({ user, accessToken }))
        queryClient.clear()
        message.success(response.message || 'Login successful!')
        navigate('/dashboard')
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      message.error(errorMessage)
    },
    onSettled: () => {
      dispatch(setLoading(false))
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (response: AuthResponse) => {
      message.success(response.message || 'Account created successfully!')
      navigate('/')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
      message.error(errorMessage)
    },
  })
}

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(logoutAction())
      updateToken(null)
      queryClient.clear()
      message.success('Logged out successfully!')
      navigate('/')
    },
    onError: () => {
      // Even if API fails, clear local state
      dispatch(logoutAction())
      updateToken(null)
      queryClient.clear()
      navigate('/')
    },
  })
}

// Hook to get current auth state
export const useAuthState = () => {
  return useAppSelector((state) => state.auth)
}

// Hook to check if user is authenticated
export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated)
}

// Hook to get current user
export const useCurrentUser = () => {
  return useAppSelector((state) => state.auth.user)
}

