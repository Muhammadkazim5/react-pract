import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Token management
let accessToken: string | null = localStorage.getItem('accessToken')

export const updateToken = (token: string | null) => {
  accessToken = token
  if (token) {
    localStorage.setItem('accessToken', token)
  } else {
    localStorage.removeItem('accessToken')
  }
}

export const getToken = () => accessToken

// Request interceptor - Add auth token to requests
http.interceptors.request.use(
  (config) => {
    const token = accessToken || localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle auth errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      updateToken(null)
      localStorage.removeItem('user')
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default http
