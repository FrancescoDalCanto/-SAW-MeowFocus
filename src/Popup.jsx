import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword } from "./firebase";

/**
 * Componente Popup per gestire l'autenticazione
 * Supporta login e registrazione con email/password e autenticazione Google
 * @param {Object} props - Proprietà del componente
 * @param {string} props.type - Tipo di popup ("Login" o "Register")
 * @param {Function} props.onClose - Funzione per chiudere il popup
 * @returns {JSX.Element} Rendering del popup di autenticazione
 */
const Popup = ({ type, onClose }) => {
  // Stati per gestire i dati del form
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");
  // Hook per la navigazione programmatica
  const navigate = useNavigate();

  /**
   * Gestisce il login con email e password
   * @async
   */
  const handleEmailPasswordLogin = async () => {
    setLoading(true);
    try {
      // Tenta il login con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Email/Password Login successful");    
      // Reindirizza alla pagina utente
      navigate("/user");
      // Chiude il popup
      onClose();  
    } catch (error) {
      console.error("Error logging in with email/password: ", error.message);
      // Gestisce l'errore di autenticazione
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gestisce la registrazione con email e password
   * @async
   */
  const handleEmailPasswordRegister = async () => {
    setLoading(true);
    try {
      // Tenta la registrazione con Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Email/Password Registration successful");
      // Reindirizza alla pagina utente
      navigate("/user");
      // Chiude il popup
      onClose();  
    } catch (error) {
      console.error("Error registering with email/password: ", error.message);
      // Gestisce l'errore di registrazione
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gestisce il login con Google
   * @async
   */
  const handleGoogleLogin = async () => {
    try {
      // Tenta il login con Google tramite Firebase
      await signInWithPopup(auth, googleProvider);
      console.log("Google login successful");
      // Reindirizza alla pagina utente
      navigate("/user");
      // Chiude il popup
      onClose();  
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
      // Gestisce l'errore di autenticazione
      handleFirebaseError(error);
    }
  };

  /**
   * Gestisce gli errori di Firebase e li traduce in messaggi comprensibili
   * @param {Object} error - Oggetto errore di Firebase
   */
  const handleFirebaseError = (error) => {
    let errorMessage = "An error occurred, please try again.";

    // Personalizza i messaggi di errore in base al codice
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = "L'indirizzo email non è valido. Per favore, controlla il formato.";
        break;
      case 'auth/user-disabled':
        errorMessage = "Il tuo account è stato disabilitato. Per favore, contatta il supporto.";
        break;
      case 'auth/user-not-found':
        errorMessage = "Nessun utente trovato con questo indirizzo email.";
        break;
      case 'auth/wrong-password':
        errorMessage = "La password che hai inserito è errata.";
        break;
      case 'auth/email-already-in-use':
        errorMessage = "L'indirizzo email è già in uso da un altro account.";
        break;
      case 'auth/weak-password':
        errorMessage = "La tua password è troppo debole. Per favore, scegli una password più forte.";
        break;
      default:
        errorMessage = error.message;
    }

    // Imposta il messaggio di errore
    setError(errorMessage);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        {/* Titolo del popup */}
        <h2 className="text-2xl mb-4">{type} Form</h2>
        
        {/* Visualizzazione degli errori */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Form di login */}
        {type === "Login" && (
          <div className="grid gap-4 mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded" 
            />
            <button 
              className="w-full bg-[#FFA500] text-white p-2 rounded"
              onClick={handleEmailPasswordLogin}
              disabled={loading} 
            >
              {loading ? "Logging in..." : "Login with Email/Password"}
            </button>
          </div>
        )}

        {/* Form di registrazione */}
        {type === "Register" && (
          <div className="grid gap-4 mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded" 
            />
            <button 
              className="w-full bg-[#FFA500] text-white p-2 rounded"
              onClick={handleEmailPasswordRegister}
              disabled={loading} 
            >
              {loading ? "Registering..." : "Register with Email/Password"}
            </button>
          </div>
        )}

        {/* Login con Google */}
        <div className="flex justify-center items-center mt-4">
          <button 
            className="bg-white text-[#4285F4] p-2 border border-[#4285F4] rounded-lg"
            onClick={handleGoogleLogin}
            disabled={loading} 
          >
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
              alt="Google Logo" 
              className="w-6 inline-block mr-2"
            />
            Login with Google
          </button>
        </div>

        {/* Pulsante per chiudere il popup */}
        <button 
          onClick={onClose} 
          className="mt-4 w-full bg-gray-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;