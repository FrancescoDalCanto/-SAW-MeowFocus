import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione
import StudyBreakTimer from "./Timer";
import { Howl } from "howler"; // Usa Howler.js per la gestione della musica LO-FI

/**
 * Componente della pagina utente personale
 * Accessibile solo dopo l'autenticazione
 * @returns {JSX.Element} Rendering della pagina utente
 */
function Stanza() {
    const navigate = useNavigate(); // Hook per navigare tra le pagine
    const [studyDuration, setStudyDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false); // Stato per il pop-up
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per gestire l'apertura/chiusura del menu
    const [isLoFiMusicOn, setIsLoFiMusicOn] = useState(false); // Stato per la musica LO-FI

    // Gestione della musica LO-FI
    const loFiMusic = new Howl({
        src: ["path_to_lofi_music.mp3"], // Sostituisci con il percorso del tuo file audio LO-FI
        loop: true,
    });

    // Funzione per attivare/disattivare la musica LO-FI
    const toggleLoFiMusic = () => {
        if (isLoFiMusicOn) {
            loFiMusic.stop(); // Ferma la musica se è già attiva
        } else {
            loFiMusic.play(); // Avvia la musica se non è attiva
        }
        setIsLoFiMusicOn(!isLoFiMusicOn); // Cambia lo stato della musica
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

    // Funzione per reindirizzare alla pagina Stanza
    const openStanza = () => {
        navigate("/user"); // Reindirizza alla pagina della sessione
    };

    // Funzione per aprire il popup per il link
    const openLink = () => {
        setIsLinkPopupOpen(true); // Apre il pop-up
    };

    // Funzione per chiudere il pop-up del link
    const closeLinkPopup = () => {
        setIsLinkPopupOpen(false); // Chiude il pop-up
    };

    // Funzione per il pulsante "ShowGraf"
    const showGraf = () => {
        console.log("Mostra grafico non definito"); // Placeholder per la logica del grafico
    };

    // Funzione per gestire l'apertura/chiusura del menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-full bg-black px-12 py-8">
            {/* Pulsante di logout */}
            <button
                onClick={openStanza}
                className="absolute top-15 right-20 bg-purple-700 text-white text-base px-8 py-[15px] border-none rounded-lg"
            >
                EXIT
            </button>

            <div className="flex flex-col items-center justify-center gap-32 h-full pt-12 pb-24">
                {/* Titolo di benvenuto */}
                <h3 className="text-6xl font-bold text-purple-400">È ora di studiare in gruppo!</h3>

                {/* Timer con durate uguali a tutti i membri della sessione */}
                <div className="">
                    <StudyBreakTimer
                        studyDuration={(parseInt(studyDuration) || 0) * 60}
                        breakDuration={(parseInt(breakDuration) || 0) * 60}
                    />
                </div>
            </div>

            {/* Pulsanti di input per impostare il tempo di studio e di pausa */}
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

            {/* Menu a tendina con l'icona delle 3 linee (hamburger menu) */}
            <div className="absolute top-15 left-20">
                <button
                    onClick={toggleMenu}
                    className="bg-purple-700 text-white text-base px-8 py-[15px] border-none rounded-lg"
                >
                    {/* Icona hamburger (3 lineette) */}
                    <span className="block w-6 h-1 bg-white mb-1"></span>
                    <span className="block w-6 h-1 bg-white mb-1"></span>
                    <span className="block w-6 h-1 bg-white"></span>
                </button>
                {/* Menu a tendina che appare quando si clicca sull'icona */}
                {isMenuOpen && (
                    <div className="absolute bg-purple-700 text-white p-4 rounded-lg mt-2">
                        <ul>
                            <li onClick={openLink} className="cursor-pointer mb-2">Link</li>
                            <li onClick={() => showGraf()} className="cursor-pointer">ShowGraf</li>
                            <li onClick={toggleLoFiMusic} className="cursor-pointer">
                                {isLoFiMusicOn ? "Stop LO-FI" : "Play LO-FI"}
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Pop-up Link */}
            {isLinkPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold text-center mb-4">Link per la sessione</h2>
                        <p className="text-center mb-4">Condividi il link della tua sessione con gli altri membri per unirsi.</p>
                        <div className="flex justify-center items-center mb-4">
                            <input
                                type="text"
                                value="https://esempio.com/sessione"
                                readOnly
                                className="bg-gray-200 text-black p-3 rounded-lg w-full text-center"
                            />
                        </div>
                        <button
                            onClick={closeLinkPopup}
                            className="bg-purple-700 text-white text-base px-8 py-[15px] border-none rounded-lg w-full"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Stanza;
