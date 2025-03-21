import React, { useState } from "react";

const Join_session = ({ closePopup }) => {
    const [linkInput, setLinkInput] = useState(""); // Stato per il link inserito
    const [type, setType] = useState("Session"); // Tipo di sessione, da personalizzare

    // Funzione per gestire l'input del link
    const handleInputChange = (e) => {
        setLinkInput(e.target.value);
    };

    // Funzione per inviare il link e reindirizzare
    const handleSubmit = () => {
        // Verifica che il link sia valido
        if (linkInput && linkInput.startsWith("http")) {
            window.location.href = linkInput; // Reindirizza alla pagina inserita
        } else {
            alert("Per favore, inserisci un link valido.");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            {/* Contenitore del pop-up */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                {/* Pulsante di chiusura */}
                <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times; {/* X per chiudere */}
                </button>

                {/* Titolo del popup */}
                <h2 className="text-2xl mb-4 text-center">{type} Join in a session</h2>

                {/* Box per inserire il link */}
                <div className="grid gap-4 mb-4">
                    <input
                        type="url"
                        placeholder="Inserisci il link della sessione"
                        value={linkInput}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Pulsante di invio */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white text-lg px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Invia
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Join_session;
