import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudyBreakTimer from "./Timer";
import { Howl } from "howler";

function Stanza() {
    const navigate = useNavigate();
    const [studyDuration, setStudyDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoFiMusicOn, setIsLoFiMusicOn] = useState(false);
    const [sessionLink, setSessionLink] = useState("https://meowfocus.com/session/abc123");
    const [participants, setParticipants] = useState(1);
    const [isSessionActive, setIsSessionActive] = useState(false);

    const loFiMusic = new Howl({
        src: ["path_to_lofi_music.mp3"],
        loop: true,
    });

    // Simula partecipanti che si uniscono alla sessione
    useEffect(() => {
        if (!isSessionActive) return;

        const interval = setInterval(() => {
            setParticipants(prev => {
                // Incrementa casualmente i partecipanti (1-3 alla volta) fino a max 20
                const increment = Math.floor(Math.random() * 3) + 1;
                return Math.min(prev + increment, 20);
            });
        }, 15000); // Ogni 15 secondi

        return () => clearInterval(interval);
    }, [isSessionActive]);

    const toggleLoFiMusic = () => {
        if (isLoFiMusicOn) {
            loFiMusic.stop();
        } else {
            loFiMusic.play();
        }
        setIsLoFiMusicOn(!isLoFiMusicOn);
    };

    const handleStudyDurationChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setStudyDuration("");
            return;
        }
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            setStudyDuration(Math.max(0, parsedValue));
        }
    };

    const handleBreakDurationChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setBreakDuration("");
            return;
        }
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            setBreakDuration(Math.max(0, parsedValue));
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(sessionLink);
        alert("Link copiato negli appunti!");
    };

    const toggleSession = () => {
        setIsSessionActive(!isSessionActive);
        if (!isSessionActive) {
            setParticipants(1); // Resetta i partecipanti quando si avvia una nuova sessione
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            {/* Header con contatore partecipanti */}
            <header className="flex justify-between items-center mb-8 md:mb-12">
                <div className="relative">
                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-3 rounded-lg transition-colors ${isMenuOpen ? 'bg-purple-700' : 'bg-purple-800 hover:bg-purple-700'}`}
                        aria-label="Menu"
                    >
                        <div className="space-y-1.5 w-6">
                            <span className={`block h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block h-0.5 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-purple-800 rounded-lg shadow-xl z-50 overflow-hidden">
                            <ul>
                                <li>
                                    <button
                                        onClick={() => {
                                            setIsLinkPopupOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        Condividi
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleLoFiMusic}
                                        className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors flex items-center"
                                    >
                                        {isLoFiMusicOn ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                                </svg>
                                                Disattiva musica
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                                Attiva musica
                                            </>
                                        )}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-purple-400">
                        MeowFocus
                    </h1>
                    <div className="flex items-center mt-1 text-sm text-purple-300">
                        <div className="relative">
                            <span className="flex items-center justify-center w-6 h-6 bg-purple-700 rounded-full mr-2">
                                {participants}
                            </span>
                            {participants > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            )}
                        </div>
                        {participants === 1 ? "partecipante" : "partecipanti"} attivo{participants !== 1 && "i"}
                    </div>
                </div>

                <button
                    onClick={() => navigate("/user")}
                    className="bg-purple-700 hover:bg-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Esci
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto">
                <section className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-purple-300 mb-6">
                        {isSessionActive ? "Sessione in corso!" : "Pronto per iniziare?"}
                    </h2>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center relative min-h-[200px]">
                        <StudyBreakTimer
                            studyDuration={(studyDuration || 0) * 60}
                            breakDuration={(breakDuration || 0) * 60}
                            isActive={isSessionActive}
                        />

                        {/* Contatore partecipanti mobile */}
                        <div className="md:hidden absolute top-4 right-4 flex items-center bg-purple-700 px-3 py-1 rounded-full text-sm">
                            <span className="mr-1">{participants}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-800 p-6 rounded-xl">
                        <label className="block text-purple-300 text-lg mb-2">Durata studio (minuti)</label>
                        <input
                            type="number"
                            value={studyDuration}
                            onChange={handleStudyDurationChange}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 no-spinner"
                            min="1"
                            disabled={isSessionActive}
                        />
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl">
                        <label className="block text-purple-300 text-lg mb-2">Durata pausa (minuti)</label>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={handleBreakDurationChange}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 no-spinner"
                            min="1"
                            disabled={isSessionActive}
                        />
                    </div>
                </section>

                <div className="flex justify-center">
                    <button
                        onClick={toggleSession}
                        className={`px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${isSessionActive
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                            } text-white shadow-lg`}
                    >
                        {isSessionActive ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                </svg>
                                Termina sessione
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Avvia sessione
                            </>
                        )}
                    </button>
                </div>
            </main>

            {/* Popup condividi sessione */}
            {isLinkPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-purple-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-purple-300">Condividi sessione</h3>
                            <button
                                onClick={() => setIsLinkPopupOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center mb-2 text-sm text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                {participants} {participants === 1 ? "persona si è" : "persone si sono"} già unite
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={sessionLink}
                                    onChange={(e) => setSessionLink(e.target.value)}
                                    className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    readOnly
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="bg-purple-600 hover:bg-purple-500 px-4 rounded-r-lg transition-colors flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {studyDuration} min studio • {breakDuration} min pausa
                            </div>
                            <button
                                onClick={() => {
                                    setIsLinkPopupOpen(false);
                                    toggleSession();
                                }}
                                className="text-purple-400 hover:text-purple-300"
                            >
                                Avvia sessione
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stanza;