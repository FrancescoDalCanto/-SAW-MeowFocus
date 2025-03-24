import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente che mostra la lista delle sessioni di studio attive
 * @param {Object} props - Le proprietà del componente
 * @param {Array} props.sessions - Array delle sessioni attive
 * @returns {JSX.Element} Componente della lista delle sessioni
 */
function ActiveSessions({ sessions }) {
    const navigate = useNavigate();

    const handleJoinSession = (sessionId) => {
        // Qui andrebbe la logica per unirsi alla sessione
        // Per ora simuliamo il reindirizzamento
        console.log(`Joining session ${sessionId}`);
        navigate(`/session/${sessionId}`);
    };

    return (
        <div className="space-y-3">
            {sessions.map((session) => (
                <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                            {session.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {session.participants} {session.participants === 1 ? "partecipante" : "partecipanti"}
                        </p>
                    </div>
                    <button
                        onClick={() => handleJoinSession(session.id)}
                        className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                    >
                        Unisciti
                    </button>
                </div>
            ))}

            {sessions.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                    Nessuna sessione attiva al momento
                </p>
            )}
        </div>
    );
}

export default ActiveSessions;