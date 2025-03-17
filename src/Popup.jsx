import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword } from "./firebase";  // Importa i metodi aggiornati di Firebase

const Popup = ({ type, onClose }) => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");  // Stato per gestire gli errori

  // Funzione di login con Email/Password
  const handleEmailPasswordLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);  // Login
      console.log("Email/Password Login successful");
      onClose();  
    } catch (error) {
      console.error("Error logging in with email/password: ", error.message);
      setError(error.message);  // Gestisci l'errore
    } finally {
      setLoading(false);
    }
  };

  // Funzione di registrazione con Email/Password
  const handleEmailPasswordRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);  // Registrazione
      console.log("Email/Password Registration successful");
      onClose();  
    } catch (error) {
      console.error("Error registering with email/password: ", error.message);
      setError(error.message);  // Gestisci l'errore
    } finally {
      setLoading(false);
    }
  };

  // Funzione di login con Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);  // Login con Google
      console.log("Google login successful");
      onClose();  
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
      setError(error.message);  
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h2 className="text-2xl mb-4">{type} Form</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}  {/* Mostra errori */}

        {/* Form per login con Email/Password */}
        {type === "Login" && (
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded" 
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

        {/* Form per registrazione con Email/Password */}
        {type === "Register" && (
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded" 
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

        {/* Google Login */}
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
