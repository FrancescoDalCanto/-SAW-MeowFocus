/**
 * TODO: Devo sistemare il template del sito perchè per il momento è disiorganizzato.
 */


import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import StudyBreakTimer from "./Timer";

/**
 * Componente della pagina utente personale
 * Accessibile solo dopo l'autenticazione
 * @returns {JSX.Element} Rendering della pagina utente
 */
function User() {
  // Ottieni l'utente corrente dal contesto di autenticazione
  const { currentUser } = useAuth();
  // Hook per la navigazione programmatica
  const navigate = useNavigate();

  // Stati per le durate di studio e pausa
  const [studyDuration, setStudyDuration] = useState(25); // durata di studio in minuti
  const [breakDuration, setBreakDuration] = useState(5); // durata pausa in minuti

  /**
   * Gestisce il logout dell'utente
   * @async
   */
  const handleLogout = async () => {
    try {
      // Esegue il logout da Firebase
      await signOut(auth);
      // Reindirizza alla pagina principale
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Funzione per aggiornare la durata dello studio (verifica che sia numerica)
  const handleStudyDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setStudyDuration(value);
    }
  };


  // Funzione per aggiornare la durata della pausa (verifica che sia numerica)
  const handleBreakDurationChange = (e) => {
    const newBreak = parseInt(e.target.value);
    if (!isNaN(newBreak) && newBreak > 0) {
      setBreakDuration(newBreak);
    }
  };

  useEffect(() => {
    // Forza un reset del timer ogni volta che studyDuration o breakDuration cambiano
    setStudyDuration(studyDuration); // Rimuove il problema del valore predefinito
  }, [studyDuration, breakDuration]);

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full bg-black px-12 py-4">

      {/* Pulsante di logout */}
      <button
        onClick={handleLogout}
        className="absolute top-15 right-20 bg-[#FFA500] text-white text-base px-8 py-[15px] border-none rounded-lg"
      >
        Logout
      </button>

      {/* Container principale con spacing uniforme */}
      <div className="flex flex-col items-center justify-center gap-16 h-full pt-12 pb-24">
        {/* Titolo di benvenuto */}
        <h3 className="text-6xl font-bold text-[#FFA500]">
          È ora di studiare!
        </h3>

        {/* Timer con durate personalizzabili */}
        <div className="w-full">
          <StudyBreakTimer studyDuration={studyDuration * 60} breakDuration={breakDuration * 60} />
        </div>
      </div>

      {/* Input per la durata dello studio - riprogettato */}
      <div className="flex justify-center items-center w-full mb-10 gap-8">
        <div className="flex flex-col items-center">
          <label className="text-white mb-2 text-lg">Durata Studio (minuti)</label>
          <input
            type="number"
            value={studyDuration}
            onChange={handleStudyDurationChange}
            className="bg-gray-700 text-white p-3 rounded-lg text-center w-24 text-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] no-spinner"
            min="0"
          />

        </div>
        <div className="flex flex-col items-center">
          <label className="text-white mb-2 text-lg">Durata Pausa (minuti)</label>
          <input
            type="number"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            className="bg-gray-700 text-white p-3 rounded-lg text-center w-24 text-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] no-spinner"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}

export default User;
