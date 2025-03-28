import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import StudyBreakTimer from "./Timer";
import JoinSession from "./JoinSession";
import useLoFiMusic from "./useLoFiMusic";
import StudyProgress from "./StudyProgress";

function User() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [studyDuration, setStudyDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isJoinSessionOpen, setIsJoinSessionOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const { isLoFiMusicOn, toggleLoFiMusic } = useLoFiMusic();

  const getUserDisplayName = () => {
    if (!currentUser) return '';
    return currentUser.displayName ||
      (currentUser.email ? currentUser.email.split('@')[0] : 'Utente');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDurationChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === "") {
      setter("");
      return;
    }
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setter(Math.max(0, parsedValue));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 relative">
      {/* Header */}
      <header className="grid grid-cols-3 items-center mb-8 md:mb-12">
        <div className="flex items-center gap-4 justify-start">
          <div className="relative">
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
                        navigate("/stanza");
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors"
                    >
                      🐱 Nuova sessione
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsJoinSessionOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors"
                    >
                      🚪 Unisciti a sessione
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsProgressOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-purple-700 transition-colors"
                    >
                      📊 Andamento studio
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

          {currentUser && (
            <div className="hidden md:block bg-gray-800 px-4 py-2 rounded-lg">
              <p className="text-purple-300">
                Ciao, {getUserDisplayName()}!
              </p>
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-purple-400 text-center">
          MeowFocus
        </h1>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-purple-700 hover:bg-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-purple-300 mb-6">
            È ora di studiare!
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
            <label className="block text-purple-300 text-lg mb-2">
              Durata studio (minuti)
            </label>
            <input
              type="number"
              value={studyDuration}
              onChange={handleDurationChange(setStudyDuration)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 no-spinner"
              min="1"
              max="120"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <label className="block text-purple-300 text-lg mb-2">
              Durata pausa (minuti)
            </label>
            <input
              type="number"
              value={breakDuration}
              onChange={handleDurationChange(setBreakDuration)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 no-spinner"
              min="1"
              max="30"
            />
          </div>
        </section>
      </main>

      {/* Modals */}
      {isJoinSessionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-purple-500">
            <JoinSession closePopup={() => setIsJoinSessionOpen(false)} />
          </div>
        </div>
      )}

      {isProgressOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full mx-4 border border-purple-500 flex flex-col h-[90vh]">
            <div className="flex justify-between items-center p-6 pb-0">
              <h3 className="text-xl font-bold text-purple-300">📈 Il mio progresso</h3>
              <button
                onClick={() => setIsProgressOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 pt-0 flex-1 min-h-0">
              <StudyProgress />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;