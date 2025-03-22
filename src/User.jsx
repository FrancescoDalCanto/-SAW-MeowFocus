import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import StudyBreakTimer from "./Timer";
import Join_session from "./JoinSession"; // Importa correttamente il componente Join_session
import useLoFiMusic from "./useLoFiMusic"; // Importa il custom hook per la musica LO-FI

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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per gestire l'apertura del menu a tendina

  // Importazione del hook per la musica LO-FI
  const { isLoFiMusicOn, toggleLoFiMusic } = useLoFiMusic();

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

  // Funzione per gestire l'apertura/chiusura del menu hamburger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

      {/* Hamburger Menu */}
      <div className="absolute top-15 left-20">
        <button
          onClick={toggleMenu}
          className="bg-purple-700 text-white text-base px-8 py-4 border-none rounded-lg"
        >
          {/* Icona hamburger (3 lineette) */}
          <span className="block w-6 h-1 bg-white mb-1"></span>
          <span className="block w-6 h-1 bg-white mb-1"></span>
          <span className="block w-6 h-1 bg-white"></span>
        </button>
        {/* Menu a tendina che appare quando si clicca sull'icona */}
        {isMenuOpen && (
          <div className="absolute bg-purple-700 text-white p-4 rounded-lg mt-2 w-32">
            <ul className="space-y-2">
              <li
                onClick={openStanza}
                className="cursor-pointer text-center text-lg py-2"
              >
                New Session
              </li>
              <li
                onClick={openJoinSessionPopup}
                className="cursor-pointer text-center text-lg py-2"
              >
                Join Session
              </li>
              <li
                onClick={toggleLoFiMusic}
                className="cursor-pointer text-center text-lg py-2"
              >
                {isLoFiMusicOn ? "Stop LO-FI" : "Play LO-FI"}
              </li>
            </ul>
          </div>
        )}
      </div>

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

      {/* Input per la durata di studio e pausa */}
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

      {/* Popup Join Session */}
      {isJoinSessionOpen && <Join_session closePopup={closeJoinSessionPopup} />}
    </div>
  );
}

export default User;
