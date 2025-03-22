import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione
import StudyBreakTimer from "./Timer";

/**
 * Componente della pagina utente personale
 * Accessibile solo dopo l'autenticazione
 * @returns {JSX.Element} Rendering della pagina utente
 */
function Stanza() {
    const navigate = useNavigate(); // Hook per navigare tra le pagine
    const [studyDuration, setStudyDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

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

    // Funzione per reindirizzare alla pagina Stanza
    const openStanza = () => {
        navigate("/user"); // Reindirizza alla pagina della sessione
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

                {/* Titolo di ben venuto */}
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
        </div>
    );
}

export default Stanza;
