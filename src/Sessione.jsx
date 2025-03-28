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
    const [sessionLink] = useState("https://meowfocus.com/session/abc123");
    const [participants, setParticipants] = useState(1);

    const loFiMusic = new Howl({
        src: ["path_to_lofi_music.mp3"],
        loop: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setParticipants(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, 20));
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const toggleLoFiMusic = () => {
        isLoFiMusicOn ? loFiMusic.stop() : loFiMusic.play();
        setIsLoFiMusicOn(!isLoFiMusicOn);
    };

    const handleStudyDurationChange = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setStudyDuration(value);
    };

    const handleBreakDurationChange = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setBreakDuration(value);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(sessionLink);
        alert("Link copiato!");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            {/* Header con menu hamburger */}
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-3 rounded-lg bg-purple-800 hover:bg-purple-700 mr-4"
                    >
                        <div className="space-y-1.5 w-6">
                            <span className={`block h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block h-0.5 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>

                <button
                    onClick={() => navigate("/user")}
                    className="bg-purple-800 hover:bg-purple-700 px-4 py-2 rounded-lg"
                >
                    ← Esci
                </button>
            </header>

            {/* Menu a tendina */}
            {isMenuOpen && (
                <div className="absolute left-4 mt-2 w-48 bg-purple-800 rounded-lg shadow-xl z-50">
                    <ul className="py-2">
                        <li>
                            <button
                                onClick={() => {
                                    setIsLinkPopupOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 hover:bg-purple-700 flex items-center"
                            >
                                <span className="mr-2">🔗</span>
                                Condividi
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={toggleLoFiMusic}
                                className="w-full px-4 py-3 hover:bg-purple-700 flex items-center"
                            >
                                {isLoFiMusicOn ? "🔇 Disattiva musica" : "🔊 Attiva musica"}
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Contenuto principale centrato */}
            <main className="flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-full max-w-2xl text-center">
                    <h1 className="text-4xl font-bold text-purple-400 mb-8">E' ora di studiare in gruppo!</h1>

                    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl mb-8">
                        <StudyBreakTimer
                            studyDuration={studyDuration * 60}
                            breakDuration={breakDuration * 60}
                            isActive={true}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                        <div>
                            <label className="block text-purple-300 mb-2">Studio (min)</label>
                            <input
                                type="number"
                                value={studyDuration}
                                onChange={handleStudyDurationChange}
                                className="no-spinner w-full bg-gray-700 text-white p-3 rounded-lg text-center"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-purple-300 mb-2">Pausa (min)</label>
                            <input
                                type="number"
                                value={breakDuration}
                                onChange={handleBreakDurationChange}
                                className="no-spinner w-full bg-gray-700 text-white p-3 rounded-lg text-center"
                                min="1"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Popup condivisione */}
            {isLinkPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 w-96 border border-purple-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-purple-300">Condividi stanza</h3>
                            <button
                                onClick={() => setIsLinkPopupOpen(false)}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center mb-4 text-sm text-gray-300">
                                <span className="mr-2">👥</span>
                                {participants} persone già connesse
                            </div>

                            <div className="flex">
                                <input
                                    type="text"
                                    value={sessionLink}
                                    className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg truncate"
                                    readOnly
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="bg-purple-600 hover:bg-purple-500 px-4 rounded-r-lg"
                                >
                                    📋
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span> Durata studio: {studyDuration}m</span>
                                <span> Durata pausa: {breakDuration}m</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stanza;