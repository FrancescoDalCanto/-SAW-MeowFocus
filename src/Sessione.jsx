import React, { useState } from "react";
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

    const loFiMusic = new Howl({
        src: ["path_to_lofi_music.mp3"],
        loop: true,
    });

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 md:mb-12">
                <div className="relative">
                    {/* Hamburger Menu Button */}
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

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-purple-800 rounded-lg shadow-xl z-50 overflow-hidden">
                            <ul>
                                <li>
                                    <button
                                        onClick={() => {
                                            setIsLinkPopupOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors"
                                    >
                                        Condividi sessione
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleLoFiMusic}
                                        className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors"
                                    >
                                        {isLoFiMusicOn ? "🔇 Disattiva musica" : "🔊 Attiva musica"}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <h1 className="text-2xl md:text-4xl font-bold text-purple-400 text-center">
                    MeowFocus
                </h1>

                <button
                    onClick={() => navigate("/user")}
                    className="bg-purple-700 hover:bg-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors"
                >
                    Esci
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto">
                <section className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-purple-300 mb-6">
                        È ora di studiare in gruppo!
                    </h2>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex justify-center items-center min-h-[200px]">
                        <StudyBreakTimer
                            studyDuration={(studyDuration || 0) * 60}
                            breakDuration={(breakDuration || 0) * 60}
                        />
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
                        />
                    </div>
                </section>
            </main>

            {/* Link Share Popup */}
            {isLinkPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-purple-500">
                        <h3 className="text-2xl font-bold text-purple-300 mb-4">Condividi sessione</h3>
                        <p className="text-gray-300 mb-4">
                            Condividi questo link con i tuoi compagni per studiare insieme:
                        </p>

                        <div className="flex mb-6">
                            <input
                                type="text"
                                value={sessionLink}
                                onChange={(e) => setSessionLink(e.target.value)}
                                className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="bg-purple-600 hover:bg-purple-500 px-4 rounded-r-lg transition-colors"
                            >
                                Copia
                            </button>
                        </div>

                        <button
                            onClick={() => setIsLinkPopupOpen(false)}
                            className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-lg transition-colors"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stanza;