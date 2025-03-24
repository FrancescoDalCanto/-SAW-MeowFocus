// TOOD: Sistemare react-icons/fi


import React, { useState } from 'react';
import { FiX, FiLink, FiArrowRight } from 'react-icons/fi';

const JoinSession = ({ closePopup, onJoin }) => {
    const [sessionUrl, setSessionUrl] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');

    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsValidating(true);
        setError('');

        if (!sessionUrl) {
            setError('Inserisci un link della sessione');
            setIsValidating(false);
            return;
        }

        if (!validateUrl(sessionUrl)) {
            setError('Inserisci un URL valido (inizia con http:// o https://)');
            setIsValidating(false);
            return;
        }

        // Simula validazione asincrona
        setTimeout(() => {
            setIsValidating(false);
            if (onJoin) {
                onJoin(sessionUrl);
            } else {
                window.location.href = sessionUrl;
            }
            closePopup();
        }, 800);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-md w-full border border-purple-500/30 shadow-2xl overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                            <FiLink className="text-purple-400" />
                            Unisciti a una sessione
                        </h2>
                        <button
                            onClick={closePopup}
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                            aria-label="Chiudi"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="sessionUrl" className="block text-purple-300 mb-2">
                                Link della sessione
                            </label>
                            <div className="relative">
                                <input
                                    id="sessionUrl"
                                    type="url"
                                    value={sessionUrl}
                                    onChange={(e) => setSessionUrl(e.target.value)}
                                    className="w-full bg-gray-700 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    placeholder="https://meowfocus.com/session/abc123"
                                    autoFocus
                                />
                                <FiLink className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                Inserisci il link condiviso dall'organizzatore
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={closePopup}
                                className="px-4 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                disabled={isValidating}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${isValidating
                                    ? 'bg-purple-800 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg'
                                    }`}
                            >
                                {isValidating ? (
                                    <>
                                        <span className="animate-spin">↻</span>
                                        Convalida...
                                    </>
                                ) : (
                                    <>
                                        Unisciti ora
                                        <FiArrowRight />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-gray-900/50 px-6 py-4 text-center border-t border-gray-700">
                    <p className="text-gray-400 text-sm">
                        Non hai un link? Chiedilo all'organizzatore della sessione.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinSession;