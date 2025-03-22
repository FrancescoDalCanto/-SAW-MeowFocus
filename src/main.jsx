import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import User from './User.jsx'
import Stanza from './Sessione.jsx' // Importa il componente Stanza
import { AuthProvider } from './AuthContext'
import PrivateRoute from './PrivateRoute'

/**
 * Punto di ingresso dell'applicazione
 * Configura il router e il provider di autenticazione
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route principale/pubblica */}
          <Route path="/" element={<App />} />

          {/* Route protetta per la pagina utente */}
          <Route path="/user" element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } />

          {/* Route per la pagina della sessione */}
          <Route path="/stanza" element={<Stanza />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
