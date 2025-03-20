import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * Componente per proteggere le router che richiedono autenticazione
 * Reindirizza alla home se l'utente non è autenticato
 * @param {Object} props - Proprietà del componente
 * @param {React.ReactNode} props.children - Componenti da renderizzare se l'utente è autenticato
 * @returns {JSX.Element} Componenti figli o reindirizzamento
 */
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Mostra un indicatore di caricamento mentre verifichiamo lo stato di autenticazione
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Caricamento...</div>;
  }

  // Reindirizza alla home se l'utente non è autenticato
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // Renderizza i componenti figli se l'utente è autenticato
  return children;
};

export default PrivateRoute;