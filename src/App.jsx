import React, { useState } from "react";
import "./App.css";
import Popup from "./Popup";  // Importa il componente Popup

function App() {
  const [showPopup, setShowPopup] = useState(false);  // Stato per la visibilità del popup
  const [popupType, setPopupType] = useState("");  // Stato per il tipo di popup ("Login" o "Register")

  // Funzione per aprire il popup
  const openPopup = (type) => {
    setPopupType(type);  // Imposta il tipo di popup (Login o Register)
    setShowPopup(true);  // Mostra il popup
  };

  // Funzione per chiudere il popup
  const closePopup = () => {
    setShowPopup(false);  // Nascondi il popup
  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-black p-4">
      {/* Titolo */}
      <h1 className="text-6xl font-bold text-[#FFA500] mt-8 mb-16">MeowHub</h1>

      {/* Logo */}
      <img src="../public/PomoStudy.png" alt="MeowFocus" className="max-w-[500px] w-full h-auto mb-8" />

      {/* Pulsanti per la Registrazione e il Login */}
      <div className="flex gap-4">
        <button
          className="bg-[#FFA500] text-white text-base px-8 py-[15px] border-none rounded-lg"
          onClick={() => openPopup("Login")}  // Quando il pulsante "Login" viene cliccato, apre il popup
        >
          Login
        </button>
        <button
          className="bg-[#FFA500] text-white text-base px-8 py-[15px] border-none rounded-lg"
          onClick={() => openPopup("Register")}  // Quando il pulsante "Register" viene cliccato, apre il popup
        >
          Register
        </button>
      </div>

      {/* Se il popup deve essere visibile, viene renderizzato sopra il contenuto */}
      {showPopup && <Popup type={popupType} onClose={closePopup} />}
    </div>
  );
}

export default App;
