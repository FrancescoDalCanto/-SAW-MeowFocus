import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * Contesto per la gestione dell'autenticazione
 * Permette di condividere informazioni sull'utente in tutta l'applicazione
 */
const AuthContext = createContext();

/**
 * Provider per il contesto di autenticazione
 * @param {Object} props - Proprietà del componente, inclusi i figli
 * @param {React.ReactNode} props.children - Componenti figli che avranno accesso al contesto
 * @returns {JSX.Element} Provider del contesto con i valori di autenticazione
 */
export const AuthProvider = ({ children }) => {
  // Stato per memorizzare l'utente corrente
  const [currentUser, setCurrentUser] = useState(null);
  // Stato per tracciare se il caricamento dell'autenticazione è in corso
  const [loading, setLoading] = useState(true);

  // Effetto per monitorare lo stato di autenticazione dell'utente
  useEffect(() => {
    // Sottoscrizione agli eventi di autenticazione di Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Aggiorna lo stato con l'utente corrente (null se non autenticato)
      setLoading(false); // Indica che il caricamento è completato
    });

    // Pulizia della sottoscrizione quando il componente viene smontato
    return unsubscribe;
  }, []);

  // Valori da fornire attraverso il contesto
  const value = {
    currentUser,
    loading
  };

  // Rendering del provider solo quando il caricamento è completato
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizzato per utilizzare il contesto di autenticazione
 * @returns {Object} Valori del contesto di autenticazione
 */
export const useAuth = () => {
  return useContext(AuthContext);
};