import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginAndSignUpPage from './modules/auth/loginAndsignupTab'
import DashboardPage from './modules/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useIsAuthenticated } from './hooks/useAuth'
import './App.css'

// Component to redirect authenticated users away from auth pages
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useIsAuthenticated()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - redirect to dashboard if already logged in */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginAndSignUpPage />
            </PublicRoute>
          }
        />
        
        {/* Protected routes - require authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
