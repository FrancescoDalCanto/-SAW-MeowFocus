import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import ActiveSessions from "./ActiveSessions";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/user");
    }

    const fetchActiveSessions = async () => {
      try {
        const mockData = [
          { id: 1, name: "Sessione Matematica", participants: 3 },
          { id: 2, name: "Sessione Programmazione", participants: 5 },
          { id: 3, name: "Sessione Design", participants: 2 },
          { id: 4, name: "Sessione Storia", participants: 4 },
          { id: 5, name: "Sessione Inglese", participants: 3 },
          { id: 6, name: "Sessione Fisica", participants: 2 },
          { id: 7, name: "Sessione Chimica", participants: 1 }
        ];
        setActiveSessions(mockData);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchActiveSessions();
  }, [currentUser, navigate]);

  const openPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleEasterEgg = () => {
    setShowEasterEgg(!showEasterEgg);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative overflow-hidden">
      {/* Easter Egg */}
      <div
        className={`fixed right-8 bottom-8 transition-all duration-500 transform ${showEasterEgg ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        onMouseLeave={toggleEasterEgg}
      >
        <div className="bg-purple-700 p-4 rounded-lg shadow-xl">
          <img
            src="/gattino_segretino.png"
            alt="Easter Egg Cat"
            className="w-16 h-16 animate-bounce"
          />
          <p className="text-xs mt-2">Psst! Hai trovato il gattino segreto!</p>
        </div>
      </div>

      {/* Area trigger easter egg */}
      <div
        className="fixed right-0 top-1/2 h-32 w-8 -translate-y-1/2 cursor-pointer"
        onMouseEnter={toggleEasterEgg}
      ></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
        {/* Sezione sinistra */}
        <div className="flex flex-col items-center lg:items-end justify-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-center lg:text-right">
            MeowFocus
          </h1>
          <img
            src="/Pomostudy.png"
            alt="MeowFocus"
            className="w-full max-w-md lg:max-w-lg h-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Sezione destra con scroll */}
        <div className="flex flex-col items-center lg:items-start justify-center space-y-8 h-full">
          {/* Container per sessioni attive con altezza fissa e scroll */}
          <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg flex flex-col" style={{ height: '400px' }}>
            <div className="p-6 pb-0">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Sessioni Attive</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <ActiveSessions sessions={activeSessions} />
            </div>
          </div>

          {/* Pulsanti autenticazione */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-lg px-6 py-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              onClick={() => openPopup("Login")}
            >
              Login
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white text-lg px-6 py-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              onClick={() => openPopup("Register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Popup di autenticazione */}
      {showPopup && <Popup type={popupType} onClose={closePopup} />}
    </div>
  );
}

export default App;