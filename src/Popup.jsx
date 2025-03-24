import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword, updateProfile } from "./firebase";

const Popup = ({ type, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Aggiunto stato per il nome
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuthAction = async (authFunction, isGoogle = false) => {
    setLoading(true);
    setError("");
    try {
      await authFunction();
      navigate("/user");
      onClose();
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseError = (error) => {
    const errorMessages = {
      'auth/invalid-email': "Email non valida. Controlla il formato.",
      'auth/user-disabled': "Account disabilitato. Contatta il supporto.",
      'auth/user-not-found': "Nessun account con questa email.",
      'auth/wrong-password': "Password errata.",
      'auth/email-already-in-use': "Email già in uso.",
      'auth/weak-password': "Password troppo debole (min. 6 caratteri).",
      'auth/network-request-failed': "Errore di connessione. Verifica la tua rete.",
      'auth/too-many-requests': "Troppi tentativi. Riprova più tardi."
    };

    setError(errorMessages[error.code] || error.message);
  };

  // Nuova funzione per registrazione con nome
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      navigate("/user");
      onClose();
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full border border-purple-500 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-400">
              {type === "Login" ? "Accedi" : "Registrati"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Chiudi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Aggiunto campo nome solo per registrazione */}
            {type === "Register" && (
              <div>
                <label htmlFor="name" className="block text-purple-300 mb-2">Nome completo</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Il tuo nome"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-purple-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="tua@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-purple-300 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder={type === "Login" ? "La tua password" : "Min. 6 caratteri"}
                disabled={loading}
              />
            </div>

            <button
              onClick={() => type === "Login"
                ? handleAuthAction(() => signInWithEmailAndPassword(auth, email, password))
                : handleRegister() // Usa la nuova funzione per la registrazione
              }
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading
                ? 'bg-purple-800 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {type === "Login" ? "Accesso in corso..." : "Registrazione in corso..."}
                </span>
              ) : (
                type === "Login" ? "Accedi con Email" : "Registrati"
              )}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400">oppure</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <button
            onClick={() => handleAuthAction(() => signInWithPopup(auth, googleProvider), true)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <img
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_48dp.png"
              alt="Google"
              className="h-5 w-5"
            />
            Continua con Google
          </button>
        </div>

        <div className="bg-gray-900/50 px-6 py-4 text-center">
          <p className="text-gray-400">
            {type === "Login"
              ? "Non hai un account? "
              : "Hai già un account? "
            }
            <button
              onClick={() => {
                setError(""); // Resetta gli errori quando cambi tipo
                setType(type === "Login" ? "Register" : "Login");
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {type === "Login" ? "Registrati" : "Accedi"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;