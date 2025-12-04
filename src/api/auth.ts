import https from '../utils/https'

export const login = async (payload: any) => {
  const response = await https.post('/auth/signin', payload)
  return response.data
}

export const register = async (payload: any) => {
  const response = await https.post('/auth/signup', payload)
  return response.data
}

export const logout = async () => {
  const response = await https.post('/auth/logout')
  return response.data
}