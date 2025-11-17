import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

function AppRoutes() {
  const { user, loading } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    }
  }, [theme])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-dark glass-card p-8">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

