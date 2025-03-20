import React, { useState, useEffect } from "react";

function StudyBreakTimer({ studyDuration, breakDuration }) {
  const [timeRemaining, setTimeRemaining] = useState(studyDuration); // Tempo rimanente
  const [isStudyTime, setIsStudyTime] = useState(true); // Se è il tempo di studio
  const [timerActive, setTimerActive] = useState(false); // Se il timer è attivo

  useEffect(() => {
    setTimeRemaining(studyDuration); // Resetta il tempo quando le props cambiano
  }, [studyDuration, breakDuration]);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          if (isStudyTime) {
            setIsStudyTime(false); // Passa alla pausa
            return breakDuration;
          } else {
            setIsStudyTime(true); // Passa allo studio
            return studyDuration;
          }
        }
        return prevTime - 1; // Decrementa il tempo
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isStudyTime, studyDuration, breakDuration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimeRemaining(studyDuration);
    setIsStudyTime(true);
    setTimerActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">{isStudyTime ? "Tempo di Studio" : "Tempo di Pausa"}</h1>
      <div className="text-6xl font-bold mb-8">{formatTime(timeRemaining)}</div>

      <button
        onClick={toggleTimer}
        className="bg-orange-500 text-white text-lg px-8 py-3 rounded-lg mb-4 hover:bg-orange-600 transition duration-300"
      >
        {timerActive ? "Pausa" : "Avvia"}
      </button>

      <button
        onClick={resetTimer}
        className="bg-gray-600 text-white text-lg px-8 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        Reset
      </button>
    </div>
  );
}

export default StudyBreakTimer;
