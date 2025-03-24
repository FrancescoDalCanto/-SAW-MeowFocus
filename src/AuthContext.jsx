import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * Contexto di autenticazione
 * Fornisce lo stato dell'utente e il loading state a tutta l'applicazione
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleAuthStateChange = (user) => {
    setCurrentUser(user);
    setLoading(false);
  };

  // Context value
  const contextValue = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Hook per accedere al contesto di autenticazione
 * @returns {{
 *  currentUser: firebase.User|null,
 *  loading: boolean
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};