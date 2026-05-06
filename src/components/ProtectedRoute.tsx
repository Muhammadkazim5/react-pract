import type { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { useAuthState } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  let test=0;
  const { isAuthenticated, isLoading } = useAuthState()
  const location = useLocation()

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    localStorage.setItem('pathName', location.pathname)
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

