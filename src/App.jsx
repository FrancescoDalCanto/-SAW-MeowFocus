/**
 * 
 * TODO: Devo Aggiungere la lista delle sessioni attive
 * 
 * TODO: Devo aggiungere un piccolo Easter egg che compare e scompare se viene passato il mouse sopra, questo sul lato di destra
 */

import React, { useState, useEffect } from "react";
import "./App.css";
import Popup from "./Popup";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Componente principale dell'applicazione
 * Gestisce la pagina di login/registrazione
 * @returns {JSX.Element} Rendering della pagina principale
 */
function App() {
  // Stato per controllare la visibilità del popup
  const [showPopup, setShowPopup] = useState(false);
  // Stato per definire il tipo di popup (Login o Register)
  const [popupType, setPopupType] = useState("");
  // Ottieni l'utente corrente dal contesto di autenticazione
  const { currentUser } = useAuth();
  // Hook per la navigazione programmatica
  const navigate = useNavigate();

  // Effetto per reindirizzare l'utente già autenticato alla sua pagina personale
  useEffect(() => {
    if (currentUser) {
      navigate("/user");
    }
  }, [currentUser, navigate]);

  /**
   * Funzione per aprire il popup di autenticazione
   * @param {string} type - Tipo di popup ("Login" o "Register")
   */
  const openPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  /**
   * Funzione per chiudere il popup di autenticazione
   */
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="grid grid-cols-1 place-items-center h-screen w-full bg-black p-4">
      {/* Titolo dell'applicazione */}
      <h1 className="text-6xl font-bold text-purple-400 mt-8 mb-16">MeowFocus</h1>

      {/* Logo dell'applicazione */}
      <img src="../public/PomoStudy.png" alt="MeowFocus" className="max-w-[500px] w-full h-auto mb-8" />

      {/* Pulsanti per l'autenticazione */}
      <div className="flex gap-4">
        <button
          className="bg-purple-500 text-white text-base px-8 py-[15px] border-none rounded-lg"
          onClick={() => openPopup("Login")}
        >
          Login
        </button>
        <button
          className="bg-purple-500 text-white text-base px-8 py-[15px] border-none rounded-lg"
          onClick={() => openPopup("Register")}
        >
          Register
        </button>
      </div>

      {/* Popup di autenticazione (condizionale) */}
      {showPopup && <Popup type={popupType} onClose={closePopup} />}
    </div>
  );
}

export default App;