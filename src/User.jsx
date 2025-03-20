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
    const newDuration = parseInt(e.target.value);
    if (!isNaN(newDuration) && newDuration > 0) {
      setStudyDuration(newDuration);
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
    <div className="grid grid-cols-1 place-items-center h-screen w-full bg-black p-4">
      {/* Titolo di benvenuto */}
      <h3 className="text-6xl font-bold text-[#FFA500] mt-8 mb-16">E' ora di studiare!</h3>

      {/* Input per la durata dello studio */}
      <div className="mb-4 text-white">
        <label className="mr-2">Durata Studio (minuti):</label>
        <input
          type="number"
          value={studyDuration}
          onChange={handleStudyDurationChange}
          className="bg-gray-700 text-white p-2 rounded"
          min="1"
        />
      </div>

      {/* Input per la durata della pausa */}
      <div className="mb-8 text-white">
        <label className="mr-2">Durata Pausa (minuti):</label>
        <input
          type="number"
          value={breakDuration}
          onChange={handleBreakDurationChange}
          className="bg-gray-700 text-white p-2 rounded"
          min="1"
        />
      </div>

      {/* Pulsante di logout */}
      <button
        onClick={handleLogout}
        className="bg-[#FFA500] text-white text-base px-8 py-[15px] border-none rounded-lg mb-4"
      >
        Logout
      </button>

      {/* Timer con durate personalizzabili */}
      <StudyBreakTimer studyDuration={studyDuration * 60} breakDuration={breakDuration * 60} />
    </div>
  );
}

export default User;
