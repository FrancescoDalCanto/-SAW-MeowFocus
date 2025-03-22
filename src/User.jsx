import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import StudyBreakTimer from "./Timer";
import Join_session from "./JoinSession"; // Importa correttamente il componente Join_session

/**
 * Componente della pagina utente personale
 * Accessibile solo dopo l'autenticazione
 * @returns {JSX.Element} Rendering della pagina utente
 */
function User() {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Hook per navigare tra le pagine
  const [studyDuration, setStudyDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isJoinSessionOpen, setIsJoinSessionOpen] = useState(false); // Stato per gestire la visibilità del pop-up

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleStudyDurationChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setStudyDuration(""); // Permette di lasciare vuoto l'input temporaneamente
      return;
    }

    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setStudyDuration(parsedValue);
    }
  };

  const handleBreakDurationChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setBreakDuration(""); // Permette di lasciare vuoto l'input temporaneamente
      return;
    }

    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setBreakDuration(parsedValue);
    }
  };


  // Funzione per aprire il pop-up "Join Session"
  const openJoinSessionPopup = () => {
    setIsJoinSessionOpen(true);
  };

  // Funzione per chiudere il pop-up "Join Session"
  const closeJoinSessionPopup = () => {
    setIsJoinSessionOpen(false);
  };

  // Funzione per reindirizzare alla pagina Stanza
  const openStanza = () => {
    navigate("/stanza"); // Reindirizza alla pagina della sessione
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-black px-12 py-8">

      {/* Pulsante di logout */}
      <button
        onClick={handleLogout}
        className="absolute top-15 right-20 bg-purple-700 text-white text-base px-8 py-[15px] border-none rounded-lg"
      >
        Logout
      </button>

      {/* Titolo + Timer */}
      <div className="flex flex-col items-center justify-center gap-16 pt-12">

        <h3 className="text-6xl font-bold text-purple-400">
          È ora di studiare!
        </h3>

        <div className="w-full">
          <StudyBreakTimer
            studyDuration={(parseInt(studyDuration) || 0) * 60}
            breakDuration={(parseInt(breakDuration) || 0) * 60}
          />
        </div>
      </div>

      {/* Pulsanti per le sessioni */}
      <div className="flex justify-center items-center mt-16 gap-8">
        <button
          className="bg-purple-500 text-white text-base px-8 py-[15px] border-none rounded-lg"
          onClick={openStanza}
        >
          New Session
        </button>

        <button
          className="bg-purple-500 text-white text-base px-8 py-[15px] border-none rounded-lg"
          onClick={openJoinSessionPopup}
        >
          Join Session
        </button>
      </div>

      {/* Popup Join Session */}
      {isJoinSessionOpen && <Join_session closePopup={closeJoinSessionPopup} />}

      {/* Input durate */}
      <div className="flex justify-center items-center mt-12 gap-8">
        <div className="flex flex-col items-center">
          <label className="text-white mb-2 text-lg">Durata Studio (minuti)</label>
          <input
            type="number"
            value={studyDuration}
            onChange={handleStudyDurationChange}
            className="bg-gray-700 text-white p-3 rounded-lg text-center w-24 text-xl focus:outline-none focus:ring-2 focus:ring-purple-400 no-spinner"
            min="0"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-white mb-2 text-lg">Durata Pausa (minuti)</label>
          <input
            type="number"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            className="bg-gray-700 text-white p-3 rounded-lg text-center w-24 text-xl focus:outline-none focus:ring-2 focus:ring-purple-400 no-spinner"
            min="0"
          />
        </div>
      </div>

    </div>
  );

}

export default User;
