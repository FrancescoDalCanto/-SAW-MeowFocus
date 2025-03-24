import React, { useState } from "react";
import { FiUsers, FiClock, FiArrowRight } from "react-icons/fi";

function ActiveSessions({ sessions }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleJoinSession = (sessionId) => {
        alert("Queste sono sessioni di prova. La funzionalità completa verrà implementata in seguito!");
        // navigate(`/session/${sessionId}`); // Disabilitato per ora
    };

    const filteredSessions = sessions.filter(session =>
        session.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Search Bar */}
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cerca sessioni..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Session List with Custom Scroll */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {filteredSessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                        <FiClock className="h-12 w-12 mb-4" />
                        <p>Nessuna sessione trovata</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-2 text-purple-400 hover:text-purple-300"
                            >
                                Cancella ricerca
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredSessions.map((session) => (
                            <div
                                key={session.id}
                                className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 group"
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white truncate">
                                        {session.name}
                                    </h3>
                                    <div className="flex items-center mt-1 text-sm text-gray-400">
                                        <FiUsers className="mr-1" />
                                        <span>{session.participants} {session.participants === 1 ? "partecipante" : "partecipanti"}</span>
                                        {session.duration && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <FiClock className="mr-1" />
                                                <span>{session.duration} min</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleJoinSession(session.id)}
                                    className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-all duration-200 flex items-center group-hover:bg-purple-700"
                                >
                                    Unisciti
                                    <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stile per la scrollbar personalizzata */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #6b46c1;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #805ad5;
                }
            `}</style>
        </div>
    );
}

export default ActiveSessions;