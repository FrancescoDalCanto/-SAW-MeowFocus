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
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setStudyDuration(value);
    }
  };

  const handleBreakDurationChange = (e) => {
    const newBreak = parseInt(e.target.value);
    if (!isNaN(newBreak) && newBreak > 0) {
      setBreakDuration(newBreak);
    }
  };

  useEffect(() => {
    setStudyDuration(studyDuration);
  }, [studyDuration, breakDuration]);

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
    <div className="flex flex-col items-center justify-between h-screen w-full bg-black px-12 py-4">
      {/* Pulsante di logout */}
      <button
        onClick={handleLogout}
        className="absolute top-15 right-20 bg-purple-700 text-white text-base px-8 py-[15px] border-none rounded-lg"
      >
        Logout
      </button>

      {/* Container principale con spacing uniforme */}
      <div className="flex flex-col items-center justify-center gap-16 h-full pt-12 pb-24">
        {/* Titolo di benvenuto */}
        <h3 className="text-6xl font-bold text-purple-400">
          È ora di studiare!
        </h3>

        {/* Timer con durate personalizzabili */}
        <div className="w-full">
          <StudyBreakTimer studyDuration={studyDuration * 60} breakDuration={breakDuration * 60} />
        </div>
      </div>

      {/* Pulsante per la creazione della sessione */}
      <div className="flex justify-center items-center w-full mb-10 gap-8">
        <div className="flex flex-row items-center justify-center gap-10 h-full pt-12 pb-2">
          <button
            className="bg-purple-500 text-white text-base px-8 py-[15px] border-none rounded-lg"
            onClick={openStanza} // Utilizza la funzione openStanza
          >
            New Session
          </button>
        </div>

        {/* Pulsante Join Session */}
        <div className="flex flex-row items-center justify-center gap-10 h-full pt-12 pb-2">
          <button
            className="bg-purple-500 text-white text-base px-8 py-[15px] border-none rounded-lg"
            onClick={openJoinSessionPopup}
          >
            Join Session
          </button>
        </div>
      </div>

      {/* Popup per Join Session */}
      {isJoinSessionOpen && <Join_session closePopup={closeJoinSessionPopup} />}

      {/* Input per la durata dello studio */}
      <div className="flex justify-center items-center w-full mb-10 gap-8">
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
