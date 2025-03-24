import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import App from './App'
import User from './User'
import Stanza from './Sessione'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import LoadingScreen from './LoadingScreen'

// Layout principale con struttura comune
const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-900 text-white">
    {/* Header/Navbar potrebbe essere aggiunto qui */}
    <main className="flex-1">
      <Outlet /> {/* Questo renderizza le route figlie */}
    </main>
    {/* Footer potrebbe essere aggiunto qui */}
  </div>
)

// Componente per gestire il layout protetto
const ProtectedLayout = () => (
  <PrivateRoute>
    <MainLayout />
  </PrivateRoute>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route con layout pubblico */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<App initialTab="login" />} />
            <Route path="/register" element={<App initialTab="register" />} />
          </Route>

          {/* Route con layout protetto */}
          <Route element={<ProtectedLayout />}>
            <Route path="/user" element={<User />} />
            <Route path="/stanza" element={<Stanza />} />
          </Route>

          {/* Route per errori 404 */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)