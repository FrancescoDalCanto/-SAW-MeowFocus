import React, { useState, useEffect } from "react";

function StudyBreakTimer({ studyDuration, breakDuration }) {
  const [timeRemaining, setTimeRemaining] = useState(studyDuration); // Tempo rimanente
  const [isStudyTime, setIsStudyTime] = useState(true); // Se è il tempo di studio
  const [timerActive, setTimerActive] = useState(false); // Se il timer è attivo

  // Resetta il timer quando cambiano le durate
  useEffect(() => {
    if (isStudyTime) {
      setTimeRemaining(studyDuration);
    } else {
      setTimeRemaining(breakDuration);
    }
  }, [studyDuration, breakDuration, isStudyTime]);

  useEffect(() => {
    if (!timerActive) return;

    // Gestione del caso in cui la durata è 0
    if (timeRemaining <= 0) {
      if (isStudyTime) {
        setIsStudyTime(false); // Passa alla pausa
        setTimeRemaining(breakDuration);
      } else {
        setIsStudyTime(true); // Passa allo studio
        setTimeRemaining(studyDuration);
      }

      // Se entrambe le durate sono 0, ferma il timer
      if (studyDuration === 0 && breakDuration === 0) {
        setTimerActive(false);
      }

      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) { // Controllo se il prossimo valore sarà 0
          clearInterval(interval);

          setTimeout(() => {
            if (isStudyTime) {
              setIsStudyTime(false); // Passa alla pausa
              setTimeRemaining(breakDuration);
            } else {
              setIsStudyTime(true); // Passa allo studio
              setTimeRemaining(studyDuration);
            }
          }, 1000); // Attendi un secondo prima di cambiare fase

          return 0;
        }
        return prevTime - 1; // Decrementa il tempo
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isStudyTime, studyDuration, breakDuration, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    // Controlla se entrambe le durate sono 0
    if (studyDuration === 0 && breakDuration === 0) {
      alert("Imposta almeno una durata diversa da zero");
      return;
    }

    // Se la durata attuale è 0, passa all'altra fase
    if ((isStudyTime && studyDuration === 0) || (!isStudyTime && breakDuration === 0)) {
      setIsStudyTime(!isStudyTime);
      setTimeRemaining(isStudyTime ? breakDuration : studyDuration);
    }

    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimeRemaining(studyDuration);
    setIsStudyTime(true);
    setTimerActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-between text-white w-full h-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl mb-2">{isStudyTime ? "Tempo di Studio Rimanente" : "Tempo di Pausa Rimanente"}</h1>
        <div className="text-9xl font-bold">{formatTime(timeRemaining)}</div>
        <div className="flex flex-row gap-4 mt-4">
          <button
            onClick={toggleTimer}
            className="bg-blue-500 text-white text-lg px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
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
      </div>
    </div>
  );
}

export default StudyBreakTimer;